import React from 'react'
import axios from 'axios'
import { Table } from "@web3uikit/core";
import styles from '../styles/Home.module.css';
import { Reload } from '@web3uikit/icons'
import { v4 as uuidv4, v4 } from 'uuid';
import { toast, Toaster } from 'react-hot-toast';

const NativeTokens = ({
    wallet,
    chain,
    nativeBalance,
    setNativeBalance,
    nativeValue,
    setNativeValue,
}) => {

    async function getNativeBalance() {
        const response = await axios.get("/api/getbalance", {
            params: {
                address: wallet,
                chain: chain,
            },
        });
        if (response.data.balance && response.data.usd) {
            setNativeBalance((Number(response.data.balance) / 1e18).toFixed(3));
            setNativeValue(
                (
                    (Number(response.data.balance) / 1e18) *
                    Number(response.data.usd)
                ).toFixed(2)
            );
        }
    }


    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 2000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },

                    // Default options for specific types
                    success: {
                        duration: 2000,
                        theme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                }}
            />
            <div className={styles.tabHeading}>Native Balance <Reload style={{ cursor: "pointer", color: "white" }} onClick={getNativeBalance} /></div>
            {(nativeBalance > 0 && nativeValue > 0) &&
                <Table
                    pageSize={1}
                    noPagination={true}
                    style={{ width: "900px" }}
                    columnsConfig="300px 300px 250px"
                    data={[["Native", nativeBalance, `$${nativeValue}`]]}
                    header={[
                        <span key={uuidv4()}>Currency</span>,
                        <span key={uuidv4()}>Balance</span>,
                        <span key={uuidv4()}>Value</span>,
                    ]}
                />
            }
        </>
    )
}

export default NativeTokens
