import { COLLATED_TASKS } from '../constants';

export const getTitle = (projects, projectId) => projects
  .find((project) => project.projectId === projectId);

export const getCollatedTitle = (projects, key) => projects
  .find((project) => project.key === key);

export const collatedTasksExist = (selectedProject) => COLLATED_TASKS
  .find(({ key }) => key === selectedProject);
