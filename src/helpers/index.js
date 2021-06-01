import { COLLATED_TASKS } from '../constants';

export const collatedTasksExist = (selectedProject) => COLLATED_TASKS
  .find(({ projectId }) => projectId === selectedProject);

export const getTitle = (projectId, projects = []) => {
  const { name } = [...COLLATED_TASKS, ...projects].find(
    (project) => project.projectId === projectId,
  );
  return name;
};
