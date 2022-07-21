import React, { useState } from 'react';
import logo from './logo.svg';
import QRCode from 'qrcode.react';
import { readCount, getBalance, setCount } from './api/UseCaver';
import * as KlipAPI from './api/UseKlip';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import './market.css';
import { Alert, Container} from 'react-bootstrap';

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
const DEFAULT_ADDRESS = "0x0000000000000000000";
function App() {
  // State Data

  // Global Data
  // address
  // NFT
  const [nfts, setNfts] = useState([]);
  const [myBalance, setMyBalance] = useState("0");
  const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS);

  // UI
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  // tab
  // mintInput

  // Modal


  // fetchMarketNFTs
  // fetchMyNFTs
  // onClickMint
  // onClickMyCard
  // onClickMarketCard
  // getUserData
  const getUserData = () => {
    KlipAPI.getAddress(setQrvalue, async (address) => {
      setMyAddress(address);
      const _balance = await getBalance(address);
      setMyBalance(_balance);
    });
  }
  // getBalance('0x38a5ad41fd7232bBC8c369285059330050C0dabf');
  return (
    <div className="App">
      <div style={{backgroundColor: 'black', padding:10}}>
        <div 
          style={{
            fontSize:30, 
            fontWeight: "bold", 
            paddingLeft: 5, 
            marginTop: 10,
            }}
        >
          내 지갑 - Ví của tôi
        </div>
        {myAddress}
        <br />
        <Alert
          onClick={getUserData}
          variant={"balance"} 
          style={{
            backgroundColor: "#7d9fd9", 
            fontSize: 25
            }}
        >
          {myBalance}
        </Alert>
      </div>
      <Container 
        style={{ 
          backgroundColor: 'white', 
          width:300, 
          height:300, 
          padding:20
          }}
      >
        <QRCode value={qrvalue} size={256} style={{margin: "auto"}}/>
      </Container>
      {/* 주소(Địa chỉ) - 자금(Số dư) */}
      {/* 갤러리(Gallery)-마켓 Market, 내 지갑 Ví của tôi*/}
      {/* 릴리스 페이지(Page Phát hành) */}
      {/* 탭(Tab) */}
      {/* 모달(Modal) */}
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      {/* <button title='Change Count' onClick={()=>{setCount(100)}} /> */}
    </div>
  );
}

export default App;
