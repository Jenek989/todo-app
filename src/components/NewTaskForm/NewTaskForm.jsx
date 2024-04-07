import PropTypes from 'prop-types';
import { useState } from 'react';
import './NewTaskForm.css';

export const NewTaskForm = ({ addNewTask }) => {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onMinSecChange = (e) => {
    const event = e.target;
    if (event.id == 'Min') setMin(event.value);
    else if (event.value > 59) setSec('');
    else setSec(event.value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    const timer = Number(min) * 60 + Number(sec);
    addNewTask(label, timer);
    setLabel('');
    setMin('');
    setSec('');
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form id="newTaskForm" onSubmit={submitForm}>
        <input
          className="new-todo"
          type="text"
          placeholder="What needs to be done?"
          autoFocus
          form="newTaskForm"
          onChange={onLabelChange}
          value={label}
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
          onChange={onMinSecChange}
          value={min}
        />
        <input
          id="Sec"
          className="new-todo-form__timer"
          type="number"
          placeholder="Sec"
          autoComplete="off"
          autoFocus
          onChange={onMinSecChange}
          value={sec}
          required
        />
        <button type="submit"></button>
      </form>
    </header>
  );
};

NewTaskForm.propTypes = {
  addNewTask: PropTypes.func,
};
