import React, { useState } from 'react';
import { useProjectsValue, useSelectedProjectValue } from '../context';
import { IndividualProject } from './IndividualProject';

export const Projects = ({ activeValue = null }) => {
  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

  const clickHandler = (projectId) => {
    setActive(projectId);
    setSelectedProject(projectId);
  };

  return (
    projects
    && projects.map((project) => (
      <li
        key={project.projectId}
        data-doc-id={project.docId}
        data-testid="project-action"
        className={
          active === project.projectId
            ? 'active sidebar__project'
            : 'sidebar__project'
        }
      >
        <div
          role="button"
          tabIndex={0}
          onClick={() => clickHandler(project.projectId)}
          onKeyDown={() => clickHandler(project.projectId)}
          aria-label={`Select ${project.name} as the task project`}
        >
          <IndividualProject project={project} />
        </div>
      </li>
    ))
  );
};
