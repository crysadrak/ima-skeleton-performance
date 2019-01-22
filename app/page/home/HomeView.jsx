import AbstractComponent from 'ima/page/AbstractComponent';
import PropTypes from 'prop-types';
import React from 'react';
import { Link, Image, Headline1 } from 'ima-ui-atoms';

const Profiler = React.unstable_Profiler;
const classStateA = {
  classNameHeading: 'heading-class-one-a',
  classNameImage: 'image-class-one-a',
  classNameLink: 'link-class-one-a'
};
const classStateB = {
  classNameHeading: 'heading-class-one-b',
  classNameImage: 'image-class-one-b',
  classNameLink: 'link-class-one-b'
};

const updateTimes = [];

/**
 * Home page.
 */
export default class HomeView extends AbstractComponent {
  static get contextTypes() {
    return {
      $Utils: PropTypes.object
    };
  }

  onButtonClick(e) {
    this.setState({
      classState: this.state.classState === 'a' ? 'b' : 'a',
      classes: this.state.classState === 'a' ? classStateB : classStateA
    });
  }

  onButtonStopClick(e) {
    clearInterval(this._interval);
  }

  onProfilerRender(conName, mode, actualTime, baseTime) {
    console.log(conName, mode, actualTime, baseTime);

    if (mode === 'update') {
      updateTimes.push({ actualTime, baseTime });
    }

    const arrLen = updateTimes.length;
    const avgAct = updateTimes.reduce((prevVal, curVal) => prevVal + curVal.actualTime, 0) / arrLen;
    const avgBase = updateTimes.reduce((prevVal, curVal) => prevVal + curVal.baseTime, 0) / arrLen;

    console.log(`avgs of ${arrLen}:`, avgAct, avgBase);
  }

  onInterval() {
    this._buttonRef.current.click();
  }

  constructor(props, context) {
    super(props, context);

    this.onProfilerRender = this.onProfilerRender.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.onButtonStopClick = this.onButtonStopClick.bind(this);
    this._interval = null;

    this.onInterval = this.onInterval.bind(this);

    this._buttonRef = React.createRef();

    this.state = {
      classState: 'a',
      classes: classStateA
    };
  }

  componentDidMount() {
    this._interval = setInterval(this.onInterval, 1000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  render() {
    const { classNameHeading, classNameImage, classNameLink } = this.state.classes;
    const components = [...Array(100)].map((x, i) => (
      <div key={i} className="wrapper">
        <Image
          src={
            this.utils.$Router.getBaseUrl() +
            this.utils.$Settings.$Static.image +
            '/imajs-logo.png'
          }
          alt="IMA.js logo"
          className={classNameImage}
        />
        <Headline1 className={classNameHeading}>
          {`${this.localize('home.hello')}, ${this.props.message} `}
          <Link
            className={classNameLink}
            href="//imajs.io"
            title={this.props.name}
            target="_blank"
            rel="noopener noreferrer">
            {this.props.name}
          </Link>
        </Headline1>
      </div>
    ));

    return (
      <Profiler id="profiler" onRender={this.onProfilerRender}>
        <div className="l-homepage">
          <div className="controls">
            <button
              type="button"
              onClick={this.onButtonClick}
              ref={this._buttonRef}>
              Click me, im on state {this.state.classState}
            </button>
            <button
              type="button"
              onClick={this.onButtonStopClick}>
              Click me to stop
            </button>
          </div>
          <div className="content">{components}</div>
        </div>
      </Profiler>
    );
  }
}
