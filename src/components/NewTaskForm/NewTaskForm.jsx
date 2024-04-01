import PropTypes from 'prop-types';
import { Component } from 'react';
import './NewTaskForm.css';

export class NewTaskForm extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };
  onMinSecChange = (e) => {
    const event = e.target;
    if (event.id == 'Min') this.setState({ min: event.value });
    else if (event.value > 59) this.setState({ sec: '' });
    else this.setState({ sec: event.value });
  };

  submitForm = (e) => {
    e.preventDefault();
    const { label, min, sec } = this.state;
    const timer = Number(min) * 60 + Number(sec);
    this.props.addNewTask(label, timer);
    this.setState({
      label: '',
      min: '',
      sec: '',
    });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form id="newTaskForm" onSubmit={this.submitForm}>
          <input
            className="new-todo"
            type="text"
            placeholder="What needs to be done?"
            autoFocus
            form="newTaskForm"
            onChange={this.onLabelChange}
            value={this.state.label}
            required
          />
          <input
            id="Min"
            className="new-todo-form__timer"
            type="number"
            placeholder="Min"
            autoComplete="off"
            autoFocus
            form="newTaskForm"
            onChange={this.onMinSecChange}
            value={this.state.min}
          />
          <input
            id="Sec"
            className="new-todo-form__timer"
            type="number"
            placeholder="Sec"
            autoComplete="off"
            autoFocus
            onChange={this.onMinSecChange}
            value={this.state.sec}
            required
          />
          <button type="submit"></button>
        </form>
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  addNewTask: PropTypes.func,
};
