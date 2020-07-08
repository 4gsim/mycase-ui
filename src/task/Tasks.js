import React from "react";

export default function Tasks(props) {
  const tasks = props.tasks;
  const listItems = tasks.map((task) => (
    <li key={task.id}>
      <a href={`/tasks/${task.id}`}>{task.name}</a>
    </li>
  ));

  return <ul>{listItems}</ul>;
}
