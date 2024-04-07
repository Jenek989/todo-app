import PropTypes from 'prop-types';
import { useState } from 'react';
import './TasksFilter.css';

export const TasksFilter = ({ filterTasks }) => {
  const [selButton, setSelButton] = useState('all');

  const onClickButton = (btnName) => {
    filterTasks(btnName);
    setSelButton(btnName);
  };

  return (
    <ul className="filters">
      <li>
        <button className={selButton === 'all' ? 'selected' : ''} onClick={() => onClickButton('all')}>
          All
        </button>
      </li>
      <li>
        <button className={selButton === 'active' ? 'selected' : ''} onClick={() => onClickButton('active')}>
          Active
        </button>
      </li>
      <li>
        <button className={selButton === 'completed' ? 'selected' : ''} onClick={() => onClickButton('completed')}>
          Completed
        </button>
      </li>
    </ul>
  );
};

TasksFilter.propTypes = {
  filterTasks: PropTypes.func,
};
