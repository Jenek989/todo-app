import PropTypes from 'prop-types';
import { Component } from 'react';
import './TasksFilter.css';

export class TasksFilter extends Component {
  state = {
    selButton: 'all',
  };

  onClickButton = (btnName) => {
    this.props.filterTasks(btnName);
    this.setState({
      selButton: btnName,
    });
  };

  render() {
    const { selButton } = this.state;
    return (
      <ul className="filters">
        <li>
          <button className={selButton === 'all' ? 'selected' : ''} onClick={() => this.onClickButton('all')}>
            All
          </button>
        </li>
        <li>
          <button className={selButton === 'active' ? 'selected' : ''} onClick={() => this.onClickButton('active')}>
            Active
          </button>
        </li>
        <li>
          <button
            className={selButton === 'completed' ? 'selected' : ''}
            onClick={() => this.onClickButton('completed')}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

TasksFilter.propTypes = {
  filterTasks: PropTypes.func,
};
