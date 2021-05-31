import React from 'react';
import {
  FaChevronDown,
  FaInbox,
  FaCalendarWeek,
  FaCalendarDay,
} from 'react-icons/fa';

export const Sidebar = () => (
  <div className="sidebar" data-testid="sidebar">
    <ul className="sidebar__generic">
      <li className="inbox" data-testid="inbox">
        <div>
          <span>
            <FaInbox />
          </span>
          <span>Inbox</span>
        </div>
      </li>
      <li className="today" data-testid="today">
        <div>
          <span>
            <FaCalendarDay />
          </span>
          <span>Today</span>
        </div>
      </li>
      <li className="next_7" data-testid="next_7">
        <div>
          <span>
            <FaCalendarWeek />
          </span>
          <span>Next 7 days</span>
        </div>
      </li>
    </ul>

    <div className="sidebar__middle">
      <span>
        <FaChevronDown />
      </span>
      <h2>Projects</h2>
    </div>

    <ul className="sidebar__projects">Projects will be here</ul>
  </div>
);
