import { useEffect, useMemo, useState } from 'react';
import { customAlphabet } from 'nanoid';

import './App.css';

import { Footer } from '../Footer/Footer';
import { NewTaskForm } from '../NewTaskForm/NewTaskForm';
import { TaskList } from '../TaskList/TaskList';
import { getLocalStorage, setLocalStorage } from '../../services/localStorage';

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  let nanoid = customAlphabet('1234567890', 3);
  let maxId = nanoid();

  useEffect(() => {
    const tasksList = getLocalStorage('taskList');
    setTaskList(tasksList);
    setTimeout(() => setLoading(false), 100);
  }, []);

  useEffect(() => {
    if (!loading) setLocalStorage('taskList', taskList);
  }, [taskList, loading]);

  const updateTimer = (timer, id, timerID, isPlay) => {
    setTaskList((tasks) => {
      const index = tasks.findIndex((task) => task.id === id);
      let copyArrData = [...tasks];
      copyArrData[index].timer = timer;
      copyArrData[index].timerID = timerID;
      copyArrData[index].isPlay = isPlay;
      return copyArrData;
    });
  };

  const changeType = (id) => {
    setTaskList((tasks) => {
      return tasks.map((task) => {
        if (task.id === id) {
          if (task.type === 'active') return { ...task, type: 'completed' };
          else return { ...task, type: 'active' };
        } else return task;
      });
    });
  };

  const deleteTask = (e, id) => {
    e.stopPropagation();
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  const createNewTask = (label, timer = 0) => {
    return {
      type: 'active',
      description: label,
      timer,
      created: new Date().toString(),
      id: maxId++,
      isPlay: false,
      timerID: null,
    };
  };

  const addNewTask = (label, timer) => {
    const newItem = createNewTask(label, timer);
    setTaskList((taskList) => {
      return [...taskList, newItem];
    });
  };

  const addChangedTask = (id, label) => {
    setTaskList((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) return { ...task, description: label };
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
          updateTimer={updateTimer}
          loading={loading}
        />
        <Footer taskCount={taskCount} filterTasks={filterTasks} deleteCompletedTasks={deleteCompletedTasks} />
      </section>
    </section>
  );
};

export default App;
