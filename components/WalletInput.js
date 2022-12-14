import React from 'react'
import styles from '../styles/Home.module.css';
import { Input, Select, CryptoLogos } from '@web3uikit/core'

const WalletInput = ({ chain, setchain, wallet, setwallet }) => {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.title}>
                    <img src='https://user-images.githubusercontent.com/86917304/207628137-160de653-38ea-4774-9e2a-e563fe40ee04.png' alt='Logo' width={70}  />
                    <h1>Zapper</h1>
                </div>
                <div className={styles.walletInputs}>
                    <Input
                        id="Wallet"
                        label="Wallet Address"
                        labelBgColor="rgb(33, 33, 38)"
                        value={wallet}
                        style={{ height: "50px" }}
                        onChange={(e) => setwallet(e.target.value)}
                    />
                    <Select
                        defaultOptionIndex={0}
                        id="Chain"
                        onChange={(e) => setchain(e.value)}
                        options={[
                            {
                                id: 'eth',
                                label: 'Ethereum',
                                value: "0x1",
                                prefix: <CryptoLogos chain="ethereum" />
                            },
                            {
                                id: 'matic',
                                label: 'Polygon',
                                value: "0x89",
                                prefix: <CryptoLogos chain="polygon" />
                            },
                        ]}
                    />
                </div>
            </div>

        </>
    )
}

export default WalletInput
