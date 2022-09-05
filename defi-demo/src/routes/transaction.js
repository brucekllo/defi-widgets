import { ContractInteract } from '@widgets/contract-interact';
import { addNewTransactionToList, openTransModal, startPendingTransactionCheck } from '@widgets/transaction-confirm';
import { TronWebConnector } from '@widgets/tronweb-connector';
import BigNumber from 'bignumber.js';
import React, { useEffect, useState } from 'react';
import '../App.scss';
import Menu from '../components/menu';
const { sendTrx } = ContractInteract;

function App() {
  const [defaultAccount, setDefaultAccount] = useState('');
  const [defaultAccountBalance, setDefaultAccountBalance] = useState('--');

  const trxPrecision = 1e6;

  useEffect(() => {
    if (window.tronWeb?.defaultAddress) {
      initUserInfo(window.tronWeb.defaultAddress.base58);
    }
  }, [])

  const initUserInfo = async (userAddress) => {
    setDefaultAccount(userAddress);
    const accountInfo = await window.tronWeb.trx.getAccount(userAddress);
    const accountBalance = new BigNumber(accountInfo.balance).div(trxPrecision);
    setDefaultAccountBalance(accountBalance);
  };

  const activate = async () => {
    const res = await TronWebConnector.activate();
    if (res?.defaultAddress?.base58) {
      initUserInfo(res.defaultAddress.base58);
    }
  }

  const sendTrxFunc = async () => {
    openTransModal({ step: 1 });

    const res = await sendTrx(
      'TBHHa5Z6WQ1cRcgUhdvqdW4f728f2fiJmF',
      1000000
    );

    if (res?.result) {
      const tx = res
      openTransModal({ step: 2, txId: tx.txid, customObj: {title: 'Send TRX success'}});
      addNewTransactionToList(tx, { title: 'Send 1 TRX to somewhere' });
      startPendingTransactionCheck(3000);
    } else {
      openTransModal({ step: 3, txId: '', customObj: {title: 'Send TRX failed'}});
    }
  }

  return (
    <div className="App">
      <Menu />
      <section className="content">
        {defaultAccount ?
          <>
            <div className='info'>
              <div><span>Current account: </span>{defaultAccount}</div>
              <div><span>Current account balance: </span>{defaultAccountBalance.toString()} TRX</div>
            </div>
            <div className='items'>
              <div className='item' onClick={() => sendTrxFunc()} >Send TRX</div>
            </div>
          </>
          :
          <div className='items'>
            <div className='item' onClick={() => activate()}>Connect Wallet</div>
          </div>
        }
      </section>
    </div>
  );
}

export default App;
