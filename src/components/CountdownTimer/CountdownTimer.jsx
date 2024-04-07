import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getLocalStorage, setLocalStorage } from '../../services/localStorage';
import './CountdownTimer.css';

export const CountdownTimer = ({ taskID }) => {
  const [time, setTime] = useState(0);
  const [type, setType] = useState('active');
  const [isPlay, setIsPlay] = useState(false);
  const [timerID, setTimerID] = useState(null);

  useEffect(() => {
    const storedTask = getLocalStorage(`ID${taskID}`);
    setTime(storedTask.timer);
    setType(storedTask.type);
    setIsPlay(storedTask.isPlay);
    setTimerID(storedTask.timerID);

    return () => {
      if (!isPlay && timerID) {
        console.log('Timer stopped');
        clearInterval(timerID);
        setTimerID(null);
      }
    };
  }, [taskID]);

  useEffect(() => {
    if (time > 0 && isPlay && !timerID) {
      console.log('New timer created');
      const newTimerID = setInterval(() => tick(), 1000);
      setTimerID(newTimerID);
      setLocalStorage(`ID${taskID}`, {
        ...getLocalStorage(`ID${taskID}`),
        isPlay: true,
        timerID: newTimerID,
      });
    } else if ((!isPlay || time <= 0) && timerID) {
      console.log('Timer stopped');
      clearInterval(timerID);
      setTimerID(null);
    }
  }, [time, isPlay, timerID, taskID]);

  const tick = () => {
    const storedTask = getLocalStorage(`ID${taskID}`);
    if (storedTask.timer > 0 && type === 'active') {
      const newTime = storedTask.timer - 1;
      setLocalStorage(`ID${taskID}`, {
        ...storedTask,
        timer: newTime,
      });
      setTime(newTime);
    } else {
      clearInterval(timerID);
      setTimerID(null);
      setLocalStorage(`ID${taskID}`, {
        ...storedTask,
        isPlay: false,
      });
      setIsPlay(false);
      setType('completed');
    }
  };

  const changePlayButton = (e) => {
    e.stopPropagation();
    if (time > 0 && type === 'active') {
      setIsPlay((prevIsPlay) => {
        const updatedIsPlay = !prevIsPlay;
        setLocalStorage(`ID${taskID}`, {
          ...getLocalStorage(`ID${taskID}`),
          isPlay: updatedIsPlay,
          timerID: updatedIsPlay ? timerID : null,
        });
        return updatedIsPlay;
      });
    }
  };

  const convertTimeFormat = () => {
    const min = Math.floor(time / 60);
    let sec = time % 60;
    if (sec < 10) sec = '0' + sec;
    return `${min}:${sec}`;
  };

  const playButtonClass = isPlay && type === 'active' ? 'icon icon-pause' : 'icon icon-play';
  const timerFormatted = convertTimeFormat();

  return (
    <span className="description">
      <button className={playButtonClass} onClick={changePlayButton}></button>
      {timerFormatted}
    </span>
  );
};

CountdownTimer.propTypes = {
  taskID: PropTypes.number.isRequired,
};
