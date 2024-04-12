import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './CountdownTimer.css';

export const CountdownTimer = ({ task, updateTimer, loading }) => {
  const [time, setTime] = useState(task.timer);
  const [type, setType] = useState(task.type);
  const [isPlay, setIsPlay] = useState(task.isPlay);
  const [timerId, setTimerId] = useState(task.timerID);

  useEffect(() => {
    setTime(task.timer);
    setType(task.type);
    if (loading) {
      setIsPlay(false);
      updateTimer(time, task.id, null, false);
    } else setIsPlay(task.isPlay);
  }, [task.type, task.timer, task.isPlay]);

  useEffect(() => {
    if (!isPlay && type === 'completed') return;
    if (time <= 0 || type === 'completed') {
      setIsPlay((isPlay) => !isPlay);
      clearInterval(timerId);
      updateTimer(task.timer, task.id, null, false);
    }
  }, [time, type]);

  const changePlayButton = (e) => {
    e.stopPropagation();
    if (time <= 0 || type === 'completed') return;
    if (isPlay) {
      clearInterval(timerId);
      setTimerId(null);
      setIsPlay(false);
      updateTimer(time, task.id, null, false);
    } else {
      const id = setInterval(() => {
        const newTime = Math.max(0, task.timer - 1);
        updateTimer(newTime, task.id, id, true);
      }, 1000);
      setTimerId(id);
      setIsPlay(true);
    }
  };

  const convertTimeFormat = () => {
    const min = Math.floor(time / 60);
    let sec = time % 60;
    if (sec < 10) sec = '0' + sec;
    return `${min}:${sec}`;
  };

  const playButtonClass =
    type === 'completed' || !time
      ? 'icon icon-hide'
      : isPlay && type === 'active'
        ? 'icon icon-pause'
        : 'icon icon-play';
  const timerFormatted = convertTimeFormat();

  return (
    <span className="description">
      <button className={playButtonClass} onClick={changePlayButton}></button>
      {timerFormatted}
    </span>
  );
};

CountdownTimer.propTypes = {
  task: PropTypes.object,
  updateTimer: PropTypes.func,
};

CountdownTimer.defaultProps = {
  task: {},
};
