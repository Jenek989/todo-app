import { useEffect, useMemo, useState } from 'react';

import './App.css';

import { Footer } from '../Footer/Footer';
import { NewTaskForm } from '../NewTaskForm/NewTaskForm';
import { TaskList } from '../TaskList/TaskList';
import { getLocalStorage, setLocalStorage, getLocalStorageTasks } from '../../services/localStorage';

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const tasksList = getLocalStorageTasks();
    setTaskList(tasksList);
  }, []);

  const changeType = (id) => {
    setTaskList((taskList) => {
      return taskList.map((task) => {
        if (task.id === id) {
          if (task.type === 'active') {
            return { ...task, type: 'completed' };
          } else return { ...task, type: 'active' };
        } else return task;
      });
    });
    const task = getLocalStorage(`ID${id}`);
    if (task.type == 'active') setLocalStorage(`ID${id}`, { ...task, type: 'completed' });
    else setLocalStorage(`ID${id}`, { ...task, type: 'active' });
  };

  const deleteTask = (e, id) => {
    e.stopPropagation();
    localStorage.removeItem(`ID${id}`);
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  let maxId = Math.floor(Math.random() * 500);

  const createNewTask = (label, timer = 0) => {
    return {
      type: 'active',
      description: label,
      timer,
      created: new Date().toString(),
      id: maxId++,
      isPlay: false,
    };
  };

  const addNewTask = (label, timer) => {
    const newItem = createNewTask(label, timer);
    setLocalStorage(`ID${newItem.id}`, newItem);
    setTaskList((taskList) => {
      return [...taskList, newItem];
    });
  };

  const addChangedTask = (id, label) => {
    setTaskList((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          const changedTask = { ...task, description: label };
          setLocalStorage(`ID${id}`, changedTask);
          return changedTask;
        }
        return task;
      });
    });
  };

  const filterTasks = (btnName) => {
    setFilter(btnName);
  };

  const filteredTasks = useMemo(() => {
    if (filter === 'all') return taskList;
    return taskList.filter((task) => task.type === filter);
  }, [filter, taskList]);

  const deleteCompletedTasks = () => {
    taskList.map(({ type, id }) => {
      if (type == 'completed') {
        localStorage.removeItem(`ID${id}`);
      }
    });
    setTaskList(taskList.filter(({ type }) => type !== 'completed'));
  };

  const taskCount = useMemo(() => {
    return taskList.filter((task) => task.type === 'active' || task.type === 'editing').length;
  }, [taskList]);

  return (
    <section className="todoapp">
      <NewTaskForm addNewTask={addNewTask} />
      <section className="main">
        <TaskList
          taskList={filteredTasks}
          changeType={changeType}
          deleteTask={deleteTask}
          addChangedTask={addChangedTask}
        />
        <Footer taskCount={taskCount} filterTasks={filterTasks} deleteCompletedTasks={deleteCompletedTasks} />
      </section>
    </section>
  );
};

export default App;
