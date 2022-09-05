import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Connector from './routes/connector';
import Contract from './routes/contract';
import Transaction from './routes/transaction';
import TokenList from './routes/tokenList';
import SignSteps from './routes/signSteps';
import './index.css';

const rootElement = document.getElementById('root');
render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Connector />} />
            <Route path="connector" element={<Connector />} />
            <Route path="contract" element={<Contract />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="tokenlist" element={<TokenList />} />
            <Route path="signsteps" element={<SignSteps />} />
        </Routes>
    </BrowserRouter>,
    rootElement
);
