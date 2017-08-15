import React, { Component, } from 'react';

const eff = require('./eff.json');

export default class App extends Component {
  state = {
    dice: '',
    passphrase: '',
    keys: '',
  }

  componentWillMount = () => {
    const dice = this.rollDice();
    const [passphrase, keys] = this.generatePassphrase();

    this.setState({dice, passphrase, keys,});
  }

  randomCrypto = () => {
    const cryptoObj = window.crypto || window.msCrypto; // for IE 11
    const randomBuffer = new Uint32Array(1);
    cryptoObj.getRandomValues(randomBuffer);
    const randomNumber = randomBuffer[0] / (0xffffffff + 1);

    return randomNumber;
  }

  getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(this.randomCrypto() * (max - min + 1)) + min;
  }

  rollDice = () => {
    return String.fromCharCode(parseInt(2680 + this.getRandomIntInclusive(0, 5), 16));
  }

  generatePassphrase = (length = 6) => {
    const pw = {};
    for (let i = 0; i < length; ++i) {
      let key = '';
      for (let j = 0; j < 5; ++j) {
        key += this.getRandomIntInclusive(1, 6).toString();
      }
      pw[key] = eff[key];
    }

    return [Object.values(pw).join(' '), Object.keys(pw).join(' ')];
  }

  render = () => {
    return (
      <div className='centered monospace white' style={{display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-between',}}>
        <div />
        <div>
          <h1>{this.state.passphrase}</h1>
          <a className='white' href='https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases' style={{textDecoration: 'none',}}>
            {this.state.keys}
          </a>
          <br /><br /><br />
          <a className='lg-size unselectable' onClick={this.componentWillMount}>{this.state.dice}</a>
        </div>
        <div />
        <div>
          <hr />
          <p>Made with ❤ by <a className='white' href='https://github.com/Johj'>Peter</a></p>
        </div>
      </div>
    );
  }
}