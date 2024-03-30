import PropTypes from 'prop-types';

import { TasksFilter } from '../TasksFilter/TasksFilter';
import './Footer.css';

export const Footer = ({ taskCount, filterTasks, deleteCompletedTasks }) => (
  <footer className="footer">
    <span className="todo-count">{taskCount} items left</span>
    <TasksFilter filterTasks={filterTasks} />
    <button className="clear-completed" onClick={deleteCompletedTasks}>
      Clear completed
    </button>
  </footer>
);

Footer.propTypes = {
  taskCount: PropTypes.number,
  filterTasks: PropTypes.func,
  deleteCompletedTasks: PropTypes.func,
};

Footer.defaultProps = {
  taskCount: 0,
};
