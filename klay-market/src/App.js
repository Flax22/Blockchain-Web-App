import React from 'react';
import logo from './logo.svg';
import Caver from 'caver-js';
import './App.css';

const COUNT_CONTRACT_ADDRESS = '0xebEDAae12b20BfC0254cb5e3C4b2D9584d0b84f2';
const ACCESS_KEY_ID = 'KASKX6O3VFRZBWGQYXWXYIIV';
const SECRET_ACCESS_KEY = 'yCKnduiYyFQ1ljw46LI0C09vBP7Gz7TBlQpjAWnH';
const CHAIN_ID = '1001'; //MAINNET 817 - TESTNET 1001
const COUNT_ABI = '[ { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]'
const option = {
  headers: [
    {
      name: "Authorization",
      value: "Basic " + Buffer.from(ACCESS_KEY_ID + ":" + SECRET_ACCESS_KEY).toString("base64")
    },
    {name: "x-chain-id", value: CHAIN_ID}
  ]
}

const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));
const CountContract = new caver.contract(JSON.parse(COUNT_ABI), COUNT_CONTRACT_ADDRESS);
const readCount = async () => {
  const _count = await CountContract.methods.count().call();
  console.log(_count);
}

const getBalance = (address) => {
  return caver.rpc.klay.getBalance(address).then((response)=>{
    const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response));
    console.log(`BALANCE: ${balance}`);
    return balance;
  })
}

const setCount = async (newCount) =>{
  // Note: Install the Account will be used - Cai dat Account se su dung
  try {
    const privatekey = '0xe1f120ed9391bee9a08abf63e95195a6576ca21e00157f89c1be1963f02f5fab';
    const deployer = caver.wallet.keyring.createFromPrivateKey(privatekey);
    caver.wallet.add(deployer);
  // Phat Transaction se thuc thi trong Smart Contract
  // Xac nhan ket qua (result)

    const receipt = await CountContract.methods.setCount(newCount).send({
      from: deployer.address, //address: dia chi chua Klay ta se dung
      gas: "0x4bfd200"//
    })
    console.log(receipt);
  } catch(e) {
    console.log(` [ERROR_SET_COUNT]${e}`);
  }
  
}

// 1 Smart Contract: Address of COUNT_CONTRACT (SMCT)
// 2 caver.js connect with Smart Contract
// 3 Output the result (data) run by Smart Contract on Website.

function App() {
  readCount();
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
