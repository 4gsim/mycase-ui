import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

const EXECUTE_BPMN = gql`
  mutation ExecuteBpmn($definitionSrc: String!) {
    executeBpmn(definitionSrc: $definitionSrc) {
      id
    }
  }
`;

export default function Home() {
  const history = useHistory();

  const [executeBpmn] = useMutation(EXECUTE_BPMN, {
    onCompleted(data) {
      history.push(`/processes/${data.executeBpmn.id}`);
    },
  });

  function executeClicked(e) {
    e.preventDefault();
    executeBpmn({ variables: { definitionSrc: "rainbow" } });
  }
  return (
    <div className="App">
      <button onClick={executeClicked}>Execute</button>
    </div>
  );
}
