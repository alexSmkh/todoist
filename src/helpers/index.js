import { COLLATED_TASKS } from '../constants';

export const collatedTaskExist = (selectedProject) => (
  COLLATED_TASKS.find(({ key }) => key === selectedProject)
);
