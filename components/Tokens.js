import { Reload } from '@web3uikit/icons';
import axios from 'axios';
import React from 'react'
import styles from '../styles/Home.module.css';
import { Table } from "@web3uikit/core";
import Moralis from "moralis";

const Tokens = ({ wallet, chain, tokens, setTokens }) => {
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

    // async function getusd(address) {
    //     const nativePrice = await Moralis.EvmApi.token.getTokenPrice({
    //         address: address, //WETH Contract
    //         chain: chain,
    //     });

    //     pri = nativePrice.result.usdPrice;
    //     return pri;
    // }

    function tokenProcessing(t) {


        for (let i = 0; i < t.length; i++) {
            t[i].bal = (Number(t[i].value) / Number(`1E${t[i].token.decimals}`)).toFixed(3); //1E18
            t[i].val = ((Number(t[i].value) / Number(`1E${t[i].token.decimals}`)) * Number("100")).toFixed(2);
        }

        setTokens(t);

    }
    return (
        <>
            <div className={styles.tabHeading}>ERC20 Tokens <Reload style={{cursor: "pointer" , color: "white"}} onClick={getTokenBalances} /></div>

            {tokens.length > 0 && (
                <Table
                    pageSize={6}
                    noPagination={true}
                    style={{ width: "900px" }}
                    columnsConfig="300px 300px 250px"
                    data={tokens.map((e) => [e.token.symbol, e.bal, `$${e.val}`])}
                    header={[
                        <span>Currency</span>,
                        <span>Balance</span>,
                        <span>Value</span>,
                    ]}
                />
            )}

        </>
    )
}

export default Tokens
