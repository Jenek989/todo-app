import PropTypes from 'prop-types';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import { CountdownTimer } from '../CountdownTimer/CountdownTimer';
import './Task.css';

export const Task = ({ task, changeType, deleteTask, addChangedTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(task.description);

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const submitEditTask = () => {
    addChangedTask(task.id, label);
    setIsEditing(false);
  };

  const changeIsEditing = () => {
    setIsEditing((isEditing) => !isEditing);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (label) submitEditTask();
    }
  };

  const getTimeCreatedMessage = (time) => {
    return `${formatDistanceToNow(new Date(time), {
      addSuffix: true,
      includeSeconds: true,
    })}`;
  };

  return (
    <li className={isEditing ? 'editing' : task.type}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={() => changeType(task.id)}
          checked={task.type === 'completed'}
        />
        <label>
          <span className="title">{task.description}</span>
          <CountdownTimer taskID={task.id} task={task} />
          <span className="created">{getTimeCreatedMessage(task.created)}</span>
        </label>
        <button className="icon icon-edit" onClick={changeIsEditing}></button>
        <button className="icon icon-destroy" onClick={(e) => deleteTask(e, task.id)}></button>
      </div>
      {isEditing && (
        <input type="text" className="edit" defaultValue={label} onChange={onLabelChange} onKeyDown={onKeyDown} />
      )}
    </li>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
    created: PropTypes.string.isRequired,
    timer: PropTypes.number.isRequired,
    isPlay: PropTypes.bool.isRequired,
  }),
  deleteCompletedTasks: PropTypes.func,
  changeType: PropTypes.func,
  deleteTask: PropTypes.func,
};

Task.defaultProps = {
  task: {
    description: 'New task',
  },
};
