export const getLocalStorage = (key) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    if (value) return value;
    else return {};
  } catch (error) {
    return {};
  }
};

export const setLocalStorage = (key, obj) => {
  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch (error) {
    return error;
  }
};

export const getLocalStorageTasks = () => {
  try {
    const taskList = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = JSON.parse(localStorage.getItem(key));
      if (value) taskList.push(value);
    }
    return taskList;
  } catch (error) {
    return [];
  }
};
