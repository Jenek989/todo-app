import { Component } from 'react';
import PropTypes from 'prop-types';

import { getLocalStorage, setLocalStorage } from '../../services/localStorage';
import './CountdownTimer.css';

export default class CountdownTimer extends Component {
  state = {
    time: 0,
    type: 'active',
    isPlay: false,
  };
  componentDidMount() {
    const { taskID } = this.props;
    const task = getLocalStorage(`ID${taskID}`);
    this.setState({
      time: task.timer,
      isPlay: task.isPlay,
      type: task.type,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { time, isPlay } = this.state;
    if (prevState.isPlay !== isPlay) {
      if (time > 0 && isPlay == true) this.timerID = setInterval(() => this.tick(), 1000);
      if (!isPlay) clearInterval(this.timerID);
    }
    if (prevProps.task.type !== this.props.task.type) {
      this.setState({ type: this.props.task.type });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  convertTimeFormat() {
    const { time } = this.state;
    const min = Math.floor(time / 60);
    let sec = time % 60;
    if (sec < 10) sec = '0' + sec;
    return `${min}:${sec}`;
  }

  tick() {
    console.log('tick');
    const { time, isPlay, type } = this.state;
    const { taskID } = this.props;
    if (time > 0 && type == 'active') {
      const newTime = time - 1;
      this.setState({ time: newTime });
      setLocalStorage(`ID${taskID}`, { ...getLocalStorage(`ID${taskID}`), timer: newTime, isPlay });
    } else {
      clearInterval(this.timerID);
      setLocalStorage(`ID${taskID}`, { ...getLocalStorage(`ID${taskID}`), isPlay: false });
      this.setState({ isPlay: false, type: 'completed' });
    }
  }

  changePlayButton = (e) => {
    e.stopPropagation();
    const { taskID } = this.props;
    const { type, time } = this.state;
    this.setState(({ isPlay }) => {
      if (time > 0 && type == 'active') {
        setLocalStorage(`ID${taskID}`, { ...getLocalStorage(`ID${taskID}`), isPlay: !isPlay });
        return {
          isPlay: !isPlay,
        };
      }
    });
  };

  render() {
    const { isPlay, type } = this.state;
    const playB = (
      <button
        className={isPlay && type == 'active' ? 'icon icon-pause' : 'icon icon-play'}
        onClick={this.changePlayButton}
      ></button>
    );
    const timer = this.convertTimeFormat();
    return (
      <span className="description">
        {playB}
        {timer}
      </span>
    );
  }
}

CountdownTimer.propTypes = {
  taskID: PropTypes.number,
};
