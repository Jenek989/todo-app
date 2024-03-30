import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';

import './App.css';

import { Footer } from '../Footer/Footer';
import { NewTaskForm } from '../NewTaskForm/NewTaskForm';
import { TaskList } from '../TaskList/TaskList';

export class App extends Component {
  maxId = 1;

  state = {
    taskList: [],
    filter: 'all',
  };

  changeType = (id) => {
    this.setState((state) => {
      return {
        taskList: state.taskList.map((task) => {
          if (task.id === id) {
            if (task.type === 'active') return { ...task, type: 'completed' };
            else return { ...task, type: 'active' };
          } else return task;
        }),
      };
    });
  };

  deleteTask = (id) => {
    this.setState((state) => {
      const newTaskList = state.taskList.filter((task) => task.id !== id);
      return {
        taskList: newTaskList,
      };
    });
  };

  getTimeCreatedMessage = () => {
    const createdAt = new Date();
    return `${formatDistanceToNow(createdAt, {
      addSuffix: true,
      includeSeconds: true,
    })}`;
  };

  createNewTask = (label) => {
    return {
      type: 'active',
      description: label,
      created: this.getTimeCreatedMessage(),
      id: this.maxId++,
    };
  };

  addNewTask = (label) => {
    const newItem = this.createNewTask(label);
    this.setState(({ taskList }) => {
      const newArray = [...taskList, newItem];
      return {
        taskList: newArray,
      };
    });
  };

  addChangedTask = (id, label) => {
    this.setState((state) => {
      const newArr = state.taskList.map((task) => {
        if (task.id === id) return { ...task, description: label };
        return task;
      });
      return {
        taskList: newArr,
      };
    });
  };

  filterTasks = (btnName) => {
    this.setState({ filter: btnName });
  };

  getFilteredTasks = () => {
    const { taskList, filter } = this.state;
    if (filter === 'all') return taskList;
    return taskList.filter((task) => task.type === filter);
  };

  deleteCompletedTasks = () => {
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
