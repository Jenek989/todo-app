import { Component } from 'react';

import './App.css';

import { Footer } from '../Footer/Footer';
import { NewTaskForm } from '../NewTaskForm/NewTaskForm';
import { TaskList } from '../TaskList/TaskList';
import { getLocalStorage, setLocalStorage, getLocalStorageTasks } from '../../services/localStorage';

export class App extends Component {
  maxId = Math.floor(Math.random() * 500);
  state = {
    taskList: [],
    filter: 'all',
  };

  componentDidMount() {
    const taskList = getLocalStorageTasks();
    this.setState({ taskList });
  }

  changeType = (id) => {
    this.setState(
      (state) => {
        return {
          taskList: state.taskList.map((task) => {
            if (task.id === id) {
              if (task.type === 'active') {
                return { ...task, type: 'completed' };
              } else return { ...task, type: 'active' };
            } else return task;
          }),
        };
      },
      () => {
        const task = getLocalStorage(`ID${id}`);
        if (task.type == 'active') setLocalStorage(`ID${id}`, { ...task, type: 'completed' });
        else setLocalStorage(`ID${id}`, { ...task, type: 'active' });
      }
    );
  };

  deleteTask = (e, id) => {
    e.stopPropagation();
    localStorage.removeItem(`ID${id}`);
    this.setState((state) => {
      const newTaskList = state.taskList.filter((task) => task.id !== id);
      return {
        taskList: newTaskList,
      };
    });
  };

  createNewTask = (label, timer = 0) => {
    return {
      type: 'active',
      description: label,
      timer,
      created: new Date().toString(),
      id: this.maxId++,
      isPlay: false,
    };
  };

  addNewTask = (label, timer) => {
    const newItem = this.createNewTask(label, timer);
    setLocalStorage(`ID${newItem.id}`, newItem);
    this.setState(({ taskList }) => {
      const newArray = [...taskList, newItem];
      return {
        taskList: newArray,
      };
    });
  };

  addChangedTask = (id, label) => {
    this.setState(
      (state) => {
        const newArr = state.taskList.map((task) => {
          if (task.id === id) return { ...task, description: label };
          return task;
        });
        return {
          taskList: newArr,
        };
      },
      () => {
        const task = this.getFindedTask(id);
        setLocalStorage(`ID${id}`, task);
      }
    );
  };

  getFindedTask(id) {
    return this.state.taskList.find(({ id: _id }) => id === _id);
  }

  filterTasks = (btnName) => {
    this.setState({ filter: btnName });
  };

  getFilteredTasks = () => {
    const { taskList, filter } = this.state;

    if (filter === 'all') return taskList;
    return taskList.filter((task) => task.type === filter);
  };

  deleteCompletedTasks = () => {
    const { taskList } = this.state;
    taskList.map(({ type, id }) => {
      if (type == 'completed') {
        localStorage.removeItem(`ID${id}`);
      }
    });
    this.setState((state) => {
      const updateTasks = state.taskList.filter(({ type }) => type !== 'completed');
      return {
        taskList: updateTasks,
      };
    });
  };

  render() {
    const filteredTasks = this.getFilteredTasks();
    const taskCount = this.state.taskList.filter((task) => task.type === 'active' || task.type === 'editing').length;
    return (
      <section className="todoapp">
        <NewTaskForm addNewTask={this.addNewTask} />
        <section className="main">
          <TaskList
            taskList={filteredTasks}
            changeType={this.changeType}
            deleteTask={this.deleteTask}
            addChangedTask={this.addChangedTask}
            tick={this.tick}
          />
          <Footer
            taskCount={taskCount}
            filterTasks={this.filterTasks}
            deleteCompletedTasks={this.deleteCompletedTasks}
          />
        </section>
      </section>
    );
  }
}
