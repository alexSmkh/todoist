/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  FaChevronDown,
  FaInbox,
  FaCalendarWeek,
  FaCalendarDay,
} from 'react-icons/fa';
import { AddProject } from '../AddProject';
import { Projects } from '../Projects';
import { DEFAULT_SELECTED_PROJECT } from '../../constants';
import { useSelectedProjectValue } from '../../context';

export const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [active, setActive] = useState(DEFAULT_SELECTED_PROJECT);
  const { setSelectedProject } = useSelectedProjectValue();

  return (
    <div className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li
          className={active === 'inbox' ? 'active' : ''}
          data-testid="inbox"
          onClick={() => {
            setActive('inbox');
            setSelectedProject('INBOX');
          }}
        >
          <div>
            <span>
              <FaInbox />
            </span>
            <span>Inbox</span>
          </div>
        </li>
        <li
          className={active === 'today' ? 'active' : ''}
          data-testid="today"
          onClick={() => {
            setActive('today');
            setSelectedProject('TODAY');
          }}
        >
          <div>
            <span>
              <FaCalendarDay />
            </span>
            <span>Today</span>
          </div>
        </li>
        <li
          className={active === 'next_7' ? 'active' : ''}
          data-testid="next_7"
          onClick={() => {
            setActive('next_7');
            setSelectedProject('NEXT_7');
          }}
        >
          <div>
            <span>
              <FaCalendarWeek />
            </span>
            <span>Next 7 days</span>
          </div>
        </li>
      </ul>

      <div
        className="sidebar__middle"
        onClink={() => setShowProjects(!showProjects)}
      >
        <span>
          <FaChevronDown className={!showProjects ? 'hidden-project' : ''} />
        </span>
        <h2>Projects</h2>
      </div>

      <ul className="sidebar__projects">{showProjects && <Projects />}</ul>

      {showProjects && <AddProject />}
    </div>
  );
};
