import PropTypes from 'prop-types';

import { Task } from '../Task/Task';
import './TaskList.css';

export const TaskList = ({ taskList, changeType, deleteTask, addChangedTask }) => (
  <ul className="todo-list">
    {taskList.map((task) => (
      <Task key={task.id} task={task} changeType={changeType} deleteTask={deleteTask} addChangedTask={addChangedTask} />
    ))}
  </ul>
);

TaskList.propTypes = {
  taskList: PropTypes.array,
  changeType: PropTypes.func,
  deleteTask: PropTypes.func,
  addChangedTask: PropTypes.func,
};
