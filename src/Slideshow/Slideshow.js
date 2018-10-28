import React from 'react';

const initialState = {
  current: 0
};

export class Slideshow extends React.Component {
  state = initialState;

  render() {
    const {current} = this.state;
    return this.props.children({current});
  }
}
