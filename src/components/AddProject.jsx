import React, { useState } from 'react';
import uniqid from 'uniqid';
import { firebase } from '../firebase';
import { useProjectsValue } from '../context';
import { USER_ID } from '../constants';

export const AddProject = ({ shouldShow = false }) => {
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState('');

  const projectId = uniqid();
  const { projects, setProjects } = useProjectsValue();

  const addProject = () => {
    if (projectName) {
      firebase
        .firestore()
        .collection('projects')
        .add({
          projectId,
          name: projectName,
          userId: USER_ID,
        })
        .then(() => {
          setProjects([...projects]);
          setProjectName('');
          setShow(false);
        });
    }
  };
  return (
    <div className="add-project" data-testid="add-project">
      {show && (
        <div className="add-project__input">
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="add-project__name"
            data-testid="project-name"
            type="text"
            placeholder="Name your projet"
          />
          <button
            className="add-project__submit"
            type="button"
            onClick={() => addProject()}
            data-testid="add-project-submit"
          >
            Add project
          </button>
          <span
            data-testid="hide-project-overlay"
            className="add-project__cancel"
            onClick={() => setShow(false)}
            onKeyDown={() => setShow(false)}
            role="button"
            tabIndex={0}
            aria-label="Cancel adding project"
          >
            Cancel
          </span>
        </div>
      )}
      <span className="add-project__plus">+</span>
      <span
        data-testid="add-project-action"
        className="add-project__text"
        onClick={() => {
          setShow(!show);
        }}
        onKeyDown={() => setShow(!show)}
        role="button"
        tabIndex={0}
      >
        Add project
      </span>
    </div>
  );
};
