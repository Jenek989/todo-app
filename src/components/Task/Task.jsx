import PropTypes from 'prop-types';
import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';

import CountdownTimer from '../CountdownTimer/CountdownTimer';
import './Task.css';

export class Task extends Component {
  state = {
    isEditing: false,
    label: this.props.task.description,
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  submitEditTask = () => {
    const prop = this.props;
    prop.addChangedTask(prop.task.id, this.state.label);
    this.setState({
      isEditing: false,
    });
  };

  changeIsEditing = () => {
    this.setState((state) => {
      return {
        isEditing: !state.isEditing,
      };
    });
  };

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (this.state.label) this.submitEditTask();
    }
  };

  getTimeCreatedMessage = (time) => {
    return `${formatDistanceToNow(new Date(time), {
      addSuffix: true,
      includeSeconds: true,
    })}`;
  };

  render() {
    const { task, changeType, deleteTask } = this.props;
    return (
      <li className={this.state.isEditing ? 'editing' : task.type}>
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
            <span className="created">{this.getTimeCreatedMessage(task.created)}</span>
          </label>
          <button className="icon icon-edit" onClick={this.changeIsEditing}></button>
          <button className="icon icon-destroy" onClick={(e) => deleteTask(e, task.id)}></button>
        </div>
        {this.state.isEditing && (
          <input
            type="text"
            className="edit"
            defaultValue={this.state.label}
            onChange={this.onLabelChange}
            onKeyDown={this.onKeyDown}
          />
        )}
      </li>
    );
  }
}

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
