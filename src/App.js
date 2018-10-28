import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Slideshow} from './Slideshow';
import {LinearScheduler} from './Schedulers';

class App extends Component {
  componentDidMount() {
    const scheduler = new LinearScheduler({items: [1], duration: 3000});
    const tick = scheduler.tick();

    tick.then(() => {
      debugger;
    });
  }

  render() {
    return (
      <div className="App">
        <Slideshow>
          {({current}) => <span style={{height: '400px'}}>{current}</span>}
        </Slideshow>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
