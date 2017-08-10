import React, { Component, } from 'react';

const eff = require('./eff.json');

export default class App extends Component {
  state = {
    passphrase: '',
    keys: '',
  }

  componentWillMount = () => {
    const [passphrase, keys] = this.generatePassphrase();
    this.setState({passphrase, keys,});
  }

  getRandomIntInclusive = (min, max) => {
    const cryptoObj = window.crypto || window.msCrypto; // for IE 11

    const randomBuffer = new Uint32Array(1);
    cryptoObj.getRandomValues(randomBuffer);
    const randomNumber = randomBuffer[0] / (0xffffffff + 1);

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(randomNumber * (max - min + 1)) + min;
  }

  dice = () => {
    return this.getRandomIntInclusive(1, 6);
  }

  generatePassphrase = (length = 6) => {
    const pw = {};
    for (let i = 0; i < length; ++i) {
      let key = '';
      for (let j = 0; j < 5; ++j) {
        key += this.dice().toString();
      }
      pw[key] = eff[key];
    }

    return [Object.values(pw).join(' '), Object.keys(pw).join(' ')];
  }

  render = () => {
    return (
      <div style={{display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-between',}}>
        <div />
        <a href='https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases' style={{textDecoration: 'none',}}>
          <h1>{this.state.passphrase}</h1>
          <h4>{this.state.keys}</h4>
        </a>
        <div />
        <div>
          <hr />
          <p>Made with ❤ by <a href='https://github.com/Johj'>Peter</a></p>
        </div>
      </div>
    );
  }
}