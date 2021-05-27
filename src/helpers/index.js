import { COLLATED_TASKS } from '../constants';

export const collatedTasksExist = (selectedProject) => (
  COLLATED_TASKS.find(({ key }) => key === selectedProject)
);
