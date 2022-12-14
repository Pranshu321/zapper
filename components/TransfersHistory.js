import React from "react";
import axios from "axios";
import { Reload } from "@web3uikit/icons";
import { Table } from "@web3uikit/core";
import styles from '../styles/Home.module.css';
import { ethers } from "ethers";
import { v4 as uuidv4 } from 'uuid';
import { toast, Toaster } from "react-hot-toast";
function TransferHistory({ chain, wallet, transfers, setTransfers }) {
    async function getTokenTransfers() {
        const response = await axios.get("/api/tokentransfers", {
            params: {
                address: wallet,
                chain: chain,
            },
        });

        if (response.data) {
            setTransfers(response.data);
            console.log(response.data);
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
            <div className={styles.tabHeading}>
                Tansfer History <Reload color="white" style={{ cursor: "pointer" }} onClick={getTokenTransfers} />
            </div>
            <div>
                {transfers.length > 0 && (
                    <Table
                        pageSize={8}
                        noPagination={false}
                        style={{ width: "90vw" }}
                        columnsConfig="16vw 18vw 18vw 18vw 16vw"
                        data={transfers.map((e) => [
                            e.block_number,
                            ethers.utils.formatEther(e.value),
                            `${e.from_address.slice(0, 4)}...${e.from_address.slice(38)}`,
                            `${e.to_address.slice(0, 4)}...${e.to_address.slice(38)}`,
                            e.block_timestamp.slice(0, 10),
                        ])}
                        header={[
                            <span key={uuidv4()}>Block Number</span>,
                            <span key={uuidv4()}>Amount</span>,
                            <span key={uuidv4()}>From</span>,
                            <span key={uuidv4()}>To</span>,
                            <span key={uuidv4()}>Date</span>,
                        ]}
                    />
                )}
            </div>
        </>
    );
}

export default TransferHistory;