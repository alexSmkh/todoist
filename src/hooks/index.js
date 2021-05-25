import { useState, useEffect } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import { USER_ID } from '../constants/index';
import { collatedTaskExist } from '../helpers/index';

const createdInLast7Days = (creationDate) =>
  moment(creationDate, 'DD-MM-YYYY').diff(moment(), 'days') <= 7;

export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection('tasks')
      .where('userId', '==', USER_ID);

    if (selectedProject && !collatedTaskExist(selectedProject)) {
      unsubscribe = unsubscribe.where('projectId', '==', selectedProject);
    } else if (selectedProject === 'TODAY') {
      unsubscribe = unsubscribe.where(
        'data',
        '==',
        moment().format('DD/MM/YYYY')
      );
    } else if (selectedProject === 'INBOX' || selectedProject === 0) {
      unsubscribe = unsubscribe.where('data', '==', '');
    }

    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const snapshotTasks = snapshot.docs.map((task) => ({
        ...task.data(),
        id: task.id,
      }));

      let tasksToComplete;
      if (selectedProject === 'NEXT_7') {
        tasksToComplete = snapshotTasks.filter(
          (task) => createdInLast7Days(task.date) && !task.archived
        );
      } else {
        tasksToComplete = snapshotTasks.filter(({ archived }) => !archived);
      }

      setTasks(tasksToComplete);

      setArchivedTasks(snapshotTasks.filter(({ archived }) => archived));
    });

    return unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};
