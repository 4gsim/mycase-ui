import { useSubscription, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormDialog } from "react-material-formio";
import Tasks from "../task/Tasks";

const SUBSCRIBE_START = gql`
  subscription onBpmnEvent($engineExecutionId: ID!) {
    bpmnEvent(engineExecutionId: $engineExecutionId, isStart: true) {
      id
      state
      form
    }
  }
`;

const SIGNAL_START = gql`
  mutation SignalBpmn(
    $engineExecutionId: ID!
    $activityExecutionId: ID!
    $signal: JSONObject!
  ) {
    signalBpmn(
      engineExecutionId: $engineExecutionId
      activityExecutionId: $activityExecutionId
      signal: $signal
    )
  }
`;

const SUBSCRIBE_TASKS = gql`
  subscription onBpmnTask($engineExecutionId: ID!) {
    bpmnTask(engineExecutionId: $engineExecutionId) {
      id
      name
      state
    }
  }
`;

function StartDialog({ processId }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});
  const { data, loading } = useSubscription(SUBSCRIBE_START, {
    variables: { engineExecutionId: processId },
  });
  const [signalBpmn] = useMutation(SIGNAL_START, {
    onCompleted() {
      setOpen(false);
    },
  });

  useEffect(() => {
    if (data && data.bpmnEvent.state === "wait") {
      setOpen(!loading);
      setForm(data.bpmnEvent.form);
    }
  }, [loading, data]);

  function handleClose() {
    setOpen(false);
  }

  function handleSubmit(value) {
    signalBpmn({
      variables: {
        engineExecutionId: processId,
        activityExecutionId: data.bpmnEvent.id,
        signal: value.data,
      },
    });
  }

  return (
    <div>
      <FormDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        form={form}
      ></FormDialog>
    </div>
  );
}

export default function Process() {
  const { processId } = useParams();
  const { data } = useSubscription(SUBSCRIBE_TASKS, {
    variables: { engineExecutionId: processId },
  });
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (data) {
      setTasks((t) => [...t, data.bpmnTask]);
    }
  }, [data]);

  return (
    <div>
      <h3>Requested process ID: {processId}</h3>
      <StartDialog processId={processId}></StartDialog>
      <h4>Tasks: </h4>
      <Tasks tasks={tasks}></Tasks>
    </div>
  );
}
