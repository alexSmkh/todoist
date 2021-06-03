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
        <li className={active === 'inbox' ? 'active' : ''} data-testid="inbox">
          <div
            onClick={() => {
              setActive('inbox');
              setSelectedProject('INBOX');
            }}
            onKeyDown={() => {
              setActive('inbox');
              setSelectedProject('INBOX');
            }}
            tabIndex={0}
            role="button"
          >
            <span>
              <FaInbox />
            </span>
            <span>Inbox</span>
          </div>
        </li>
        <li className={active === 'today' ? 'active' : ''} data-testid="today">
          <div
            onClick={() => {
              setActive('today');
              setSelectedProject('TODAY');
            }}
            onKeyDown={() => {
              setActive('today');
              setSelectedProject('TODAY');
            }}
            tabIndex={0}
            role="button"
          >
            <span>
              <FaCalendarDay />
            </span>
            <span>Today</span>
          </div>
        </li>
        <li
          className={active === 'next_7' ? 'active' : ''}
          data-testid="next_7"
        >
          <div
            onClick={() => {
              setActive('next_7');
              setSelectedProject('NEXT_7');
            }}
            onKeyDown={() => {
              setActive('next_7');
              setSelectedProject('NEXT_7');
            }}
            tabIndex={0}
            role="button"
          >
            <span>
              <FaCalendarWeek />
            </span>
            <span>Next 7 days</span>
          </div>
        </li>
      </ul>

      <div
        className="sidebar__middle"
        onClick={() => setShowProjects(!showProjects)}
        onKeyDown={() => setShowProjects(!showProjects)}
        tabIndex={0}
        role="button"
      >
        <span>
          <FaChevronDown className={!showProjects ? 'hidden-projects' : ''} />
        </span>
        <h2>Projects</h2>
      </div>

      <ul className="sidebar__projects">{showProjects && <Projects />}</ul>

      {showProjects && <AddProject />}
    </div>
  );
};
