export const getLocalStorage = (key) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    if (value) return value;
    else return [];
  } catch (error) {
    return [];
  }
};

export const setLocalStorage = (key, arr) => {
  try {
    localStorage.setItem(key, JSON.stringify(arr));
  } catch (error) {
    return error;
  }
};
