import PropTypes from 'prop-types';
import './Task.css';
import { Component } from 'react';

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
    this.props.addChangedTask(this.props.task.id, this.state.label);
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
      this.submitEditTask();
    }
  };

  render() {
    const { task, changeType, deleteTask } = this.props;
    return (
      <li className={this.state.isEditing ? 'editing' : task.type}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={() => changeType(task.id)} />
          <label>
            <span className="description">{task.description}</span>
            <span className="created">{task.created}</span>
          </label>
          <button className="icon icon-edit" onClick={this.changeIsEditing}></button>
          <button className="icon icon-destroy" onClick={() => deleteTask(task.id)}></button>
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
  }),
  deleteCompletedTasks: PropTypes.func,
};

Task.defaultProps = {
  task: {
    description: 'New task',
  },
};
