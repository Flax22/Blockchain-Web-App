import React, { useState } from 'react';
import logo from './logo.svg';
import QRCode from 'qrcode.react';
import { readCount, getBalance, setCount } from './api/UseCaver';
import * as KlipAPI from './api/UseKlip';
import './App.css';

// 1 Smart Contract: Address of COUNT_CONTRACT (SMCT)
// 2 caver.js connect with Smart Contract
// 3 Output the result (data) run by Smart Contract on Website.

// Cách tạo hàm 
// Cách 01
function onPressButton(balance) {
  console.log('hi');
}
// Cách 02
const onPressButton2 = (_balance, _setBalance) => {
  _setBalance(_balance);
  // useState()
};
const DEFAULT_QR_CODE = "DEFAULT";
function App() {
  const [balance, setBalance] = useState("0");
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  // readCount();
  // getBalance('0x38a5ad41fd7232bBC8c369285059330050C0dabf');

  const onClickGetAddress = () => {
    KlipAPI.getAddress(setQrvalue);
  };
  const onClickSetCount = () => {
    KlipAPI.setCount(2000,setQrvalue);
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <button title='Change Count' onClick={()=>{setCount(100)}} /> */}
        <button onClick={()=>{
          onClickGetAddress();
          }}
        >
          <strong>GET ADDRESS - 주소 가져오기</strong>
        </button>
        <button onClick={()=>{
          onClickSetCount();
          }}
        >
          <strong>Count 값 변경</strong>
        </button>
        <br/> <br/> <br/>
        <QRCode value={qrvalue} />
        <p>
          {balance}
          {/* Good <code>src/App.js</code> and save to reload. */}
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
