import React from "react";
import { useParams } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_TASK = gql`
  query bpmnTask($taskId: ID!) {
    bpmnTask(taskId: $taskId) {
      id
      engineExecutionId
      name
      form
    }
  }
`;

export default function Task() {
  const { taskId } = useParams();
  const { loading, error, data } = useQuery(GET_TASK, {
    variables: { taskId },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;
  console.log(data.bpmnTask.form)
  return (
    <div>
      <h3>Requested task ID: {taskId}</h3>
      <h5>Process ID: {data.bpmnTask.engineExecutionId}</h5>
    </div>
  );
}
