import React, { Component } from 'react';
import './Heart.css';

class Heart extends Component {
  constructor() {
    super();

    this.state = {
      isAnimating: false,
    };

    this.onAnimationEnd = this.onAnimationEnd.bind(this);
  }

  componentDidMount() {
    const el = this.refs.button;
    el.addEventListener('animationend', this.onAnimationEnd);
  }

  componentWillUnmount() {
    const el = this.refs.button;
    el.removeEventListener('animationend', this.onAnimationEnd);
  }

  render() {
    const isAnimating = this.state.isAnimating;

    return (
      <div
        ref="button"
        onClick={() => {
          this.setState({ isAnimating: true });
        }}
        className={`Heart ${isAnimating ? 'animating' : ''}`}
      />
    );
  }

  onAnimationEnd() {
    if (this.props.onClick) {
      this.props.onClick();
    }
    this.setState({ isAnimating: false });
  }
}

export default Heart;
