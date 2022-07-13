import React from 'react';

import logo from './logo.svg';
import { readCount, getBalance, setCount } from './api/UseCaver';
import './App.css';



// 1 Smart Contract: Address of COUNT_CONTRACT (SMCT)
// 2 caver.js connect with Smart Contract
// 3 Output the result (data) run by Smart Contract on Website.

function App() {
  // readCount();
  getBalance('0x38a5ad41fd7232bBC8c369285059330050C0dabf');
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button title='Change Count' onClick={()=>{setCount(100)}} />
        <p>
          Good <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
