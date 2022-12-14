import { Reload } from '@web3uikit/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css';
import { Table } from "@web3uikit/core";
import Moralis from "moralis";
import { v4 as uuidv4 } from 'uuid';

const Tokens = ({ wallet, chain, tokens, setTokens }) => {
    const [usd, setusd] = useState(0);
    async function getTokenBalances() {
        const response = await axios.get("/api/tokenbalance", {
            params: {
                address: wallet,
                chain: chain,
            },
        });

        if (response.data) {
            tokenProcessing(response.data);
        }
    }

    async function getusd(address) {
        const nativePrice = await axios.get("/api/getbalance", {
            params: {
                address: address,
                chain: chain
            }
        });
        console.log(nativePrice.data.usd);
        setusd(nativePrice.data.usd)
    }

    function tokenProcessing(t) {


        for (let i = 0; i < t.length; i++) {
            getusd(t[i].token.contractAddress);
            t[i].bal = (Number(t[i].value) / Number(`1E${t[i].token.decimals}`)).toFixed(3); //1E18
            t[i].val = ((Number(t[i].value) / Number(`1E${t[i].token.decimals}`)) * parseInt(usd)).toFixed(2);
        }

        setTokens(t);

    }
    return (
        <>
            <div className={styles.tabHeading}>ERC20 Tokens <Reload style={{ cursor: "pointer", color: "white" }} onClick={getTokenBalances} /></div>

            {tokens.length > 0 && (
                <Table
                    pageSize={6}
                    noPagination={true}
                    style={{ width: "900px" }}
                    columnsConfig="300px 300px 250px"
                    data={tokens.map((e) => [e.token.symbol, e.bal, `$${e.val}`])}
                    header={[
                        <span onClick={()=>console.log(usd)} key={uuidv4()}>Currency</span>,
                        <span key={uuidv4()}>Balance</span>,
                        <span key={uuidv4()}>Value</span>,
                    ]}
                />
            )}

        </>
    )
}

export default Tokens
