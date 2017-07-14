import React, { Component } from 'react';
import './App.css';
import Heart from './Heart';
import IlyList from './IlyList';

class App extends Component {
  constructor() {
    super();

    this.state = {
      note: '',
      ilies: [],
    };
  }

  render() {
    return (
      <div className="App">
        <h2>Naomi says, "I love you"</h2>
        <img src="naomi-marah-hair.gif" alt="Naomi Marah gif" />
        <div className="textarea-container">
          <textarea
            placeholder={'(optional) Reason for the "I love you"'}
            value={this.state.note}
            onChange={this.onTextareaChange.bind(this)}
          />
        </div>
        <Heart onClick={this.onIlyClick.bind(this)} />
        <div className="prompt">
          Tap the heart
          {' '}
          <span role="img" aria-label="heart">❤️</span>
          {' '}
          above whenever Naomi says, "I love you"
        </div>
        <h4>Total "I love you"s logged:</h4>
        <div id="ily-count">{`${this.state.ilies.length}`}</div>
        <IlyList ilies={this.state.ilies} />
      </div>
    );
  }

  componentDidMount() {
    this.getAndSetIlies();
  }

  async getAndSetIlies() {
    const ilies = await this.getIlies();
    this.setState({ ilies: ilies });
  }

  onIlyClick(event) {
    this.onIlyClickAsync();
  }

  async onIlyClickAsync() {
    await this.postIly();
    const ilies = await this.getIlies();
    this.setState({ ilies: ilies, note: '' });
  }

  onTextareaChange(event) {
    this.setState({ note: event.target.value });
  }

  async getIlies() {
    const response = await fetch('/api/ily');
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      const ilies = await response.json();
      console.log(ilies);
      return ilies;
    }
  }

  async postIly() {
    const response = await fetch('/api/ily', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ note: this.state.note }),
    });
    const ily = await response.json();
    console.log(ily);
  }
}

export default App;
