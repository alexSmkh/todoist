/* eslint-disable operator-linebreak */
/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { firebase } from '../firebase';
import { USER_ID } from '../constants/index';
import { collatedTasksExist } from '../helpers/index';

const weeksTask = (taskDate) => (
  moment(taskDate, 'DD-MM-YYYY').diff(moment(), 'days') <= 7
);

export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection('tasks')
      .where('userId', '==', USER_ID);

    if (selectedProject && !collatedTasksExist(selectedProject)) {
      unsubscribe = unsubscribe.where('projectId', '==', selectedProject);
    } else if (selectedProject === 'TODAY') {
      unsubscribe = unsubscribe.where(
        'date',
        '==',
        moment().format('DD/MM/YYYY'),
      );
    } else if (selectedProject === 'INBOX' || selectedProject === 0) {
      unsubscribe = unsubscribe.where('date', '==', '');
    }

    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const snapshotTasks = snapshot.docs.map((task) => ({
        ...task.data(),
        id: task.id,
      }));

      let tasksToComplete;
      if (selectedProject === 'NEXT_7') {
        tasksToComplete = snapshotTasks.filter(
          (task) => weeksTask(task.date) && !task.archived,
        );
      } else {
        tasksToComplete = snapshotTasks.filter(({ archived }) => !archived);
      }

      setTasks(tasksToComplete);

      setArchivedTasks(snapshotTasks.filter(({ archived }) => archived));
    });

    return () => unsubscribe();
  }, [selectedProject]);
  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('projects')
      .where('userId', '==', USER_ID)
      .orderBy('projectId')
      .get()
      .then((snapshot) => {
        const allProjects = snapshot.docs.map((project) => ({
          ...project.data(),
          docId: project.id,
        }));

        if (!_.isEqual(allProjects, projects)) {
          setProjects(allProjects);
        }
      });
  }, [projects]);

  return { projects, setProjects };
};
