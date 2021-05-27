import React from 'react';
import { Checkbox } from './Checkbox';
import { useTasks } from '../hooks/index';

export const Tasks = () => {
  const projectId = '1';
  const { tasks } = useTasks(projectId);
  const projectName = 'Project #';
  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project-name">{projectName}</h2>

      <ul className="tasks__list">
        {tasks.map((task) => (
          <li key={task.id}>
            <Checkbox id={task.id} />
            <span>{task.task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
