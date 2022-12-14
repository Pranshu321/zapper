import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import NativeTokens from '../components/NativeTokens';
import WalletInput from '../components/WalletInput';
import styles from '../styles/Home.module.css'
import { Avatar, TabList, Tab } from "@web3uikit/core";
import PortfolioValue from '../components/PortfolioValue';
import Tokens from '../components/Tokens';
import TransferHistory from '../components/TransfersHistory';
import Nfts from '../components/NFTs';
// 0xDAFEA492D9c6733ae3d56b7Ed1ADB60692c98Bc5
export default function Home() {
  const [wallet, setwallet] = useState("");
  const [chain, setchain] = useState("0x1");
  const [nativeBalance, setnativeBalance] = useState(0);
  const [nativeValue, setnativeValue] = useState(0);
  const [tokens, settokens] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [filteredNfts, setFilteredNfts] = useState([]);
  const [transfers, setTransfers] = useState([]);


  return (
    <div className={styles.App}>
      <Head>
        <title>Zapper - Zip ETH</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="https://user-images.githubusercontent.com/86917304/207628137-160de653-38ea-4774-9e2a-e563fe40ee04.png" />
      </Head>

      <WalletInput
        chain={chain}
        setchain={setchain}
        wallet={wallet}
        setwallet={setwallet}
      />
      <div className={styles.content}>
        <div className={styles.walletInfo}>
          {wallet.length === 42 && (
            <>
              <div>
                <Avatar isRounded size={130} theme="image" image='https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg?w=2000' />
                <h2>{`${wallet.slice(0, 6)}...${wallet.slice(36)}`}</h2>
              </div>
              <PortfolioValue
                nativeValue={nativeValue}
                tokens={tokens}
              />
            </>
          )}
        </div>
        <TabList>
          <Tab tabKey={1} tabName={"Tokens"}>
            <NativeTokens
              wallet={wallet}
              chain={chain}
              nativeBalance={nativeBalance}
              setNativeBalance={setnativeBalance}
              nativeValue={nativeValue}
              setNativeValue={setnativeValue}
            />
            <Tokens
              wallet={wallet}
              chain={chain}
              tokens={tokens}
              setTokens={settokens}
            />
          </Tab>
          <Tab tabKey={2} tabName={"Transfers"}>
            <TransferHistory
              chain={chain}
              wallet={wallet}
              transfers={transfers}
              setTransfers={setTransfers}
            />
          </Tab>
          <Tab tabKey={3} tabName={"NFT's"}>
            <Nfts
              wallet={wallet}
              chain={chain}
              nfts={nfts}
              setNfts={setNfts}
              filteredNfts={filteredNfts}
              setFilteredNfts={setFilteredNfts}
            />
          </Tab>
        </TabList>
      </div>
    </div>
  )
}
