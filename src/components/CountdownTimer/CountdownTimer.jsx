import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './CountdownTimer.css';

export const CountdownTimer = ({ task, updateTimer }) => {
  const [time, setTime] = useState(task.timer);
  const [type, setType] = useState(task.type);
  const [isPlay, setIsPlay] = useState(task.isPlay);

  useEffect(() => {
    setType(task.type);
  }, [task]);

  useEffect(() => {
    if (!isPlay || type === 'completed') return;
    const id = setInterval(() => {
      setTime((t) => {
        const newTime = Math.max(0, t - 1);
        updateTimer(newTime, task.id, id, isPlay);
        return newTime;
      });
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [isPlay, type]);

  useEffect(() => {
    if (time <= 0 || type === 'completed') {
      setIsPlay((isPlay) => !isPlay);
    }
  }, [time, type]);

  useEffect(() => {
    if (isPlay) return;
    updateTimer(time, task.id, null, false);
  }, [isPlay]);

  const changePlayButton = (e) => {
    e.stopPropagation();
    if (time <= 0) return;
    setIsPlay((isPlay) => !isPlay);
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
