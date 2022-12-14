import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import style from '../styles/Home.module.css';
import { Reload } from "@web3uikit/icons";
import { Input } from "@web3uikit/core"

function Nfts({ chain, wallet, filteredNfts, setFilteredNfts, nfts, setNfts }) {
    const [nameFilter, setNameFilter] = useState("");
    const [idFilter, setIdFilter] = useState("");

    async function getUserNfts() {
        const response = await axios.get("/api/nftBalance", {
            params: {
                address: wallet,
                chain: chain,
            },
        });

        if (response.data.result) {
            nftProcessing(response.data.result);
        }
    }

    function nftProcessing(t) {
        for (let i = 0; i < t.length; i++) {
            let meta = JSON.parse(t[i].metadata);
            if (meta && meta.image) {
                if (meta.image.includes(".")) {
                    t[i].image = meta.image;
                } else {
                    t[i].image = "https://ipfs.moralis.io:2053/ipfs/" + meta.image;
                }
            }
        }
        setNfts(t);
        setFilteredNfts(t);
    }

    useEffect(() => {
        if (idFilter === "" && nameFilter === "") {
            return setFilteredNfts(nfts);
        }

        let filNfts = [];

        for (let i = 0; i < nfts.length; i++) {
            if (
                nfts[i].name.toLowerCase().includes(nameFilter.toLowerCase()) &&
                idFilter.length === 0
            ) {
                filNfts.push(nfts[i]);
            } else if (
                nfts[i].token_id.includes(idFilter) &&
                nameFilter.length === 0
            ) {
                filNfts.push(nfts[i]);
            } else if (
                nfts[i].token_id.includes(idFilter) &&
                nfts[i].name.toLowerCase().includes(nameFilter.toLowerCase())
            ) {
                filNfts.push(nfts[i]);
            }
        }

        setFilteredNfts(filNfts);
    }, [nameFilter, idFilter]);

    return (
        <>
            <div className={style.tabHeading}>
                NFT Portfolio <Reload style={{ color: "white", cursor: "pointer" }} onClick={getUserNfts} />
            </div>
            <div className={style.filters}>
                <Input
                    id="NameF"
                    label="Name Filter"
                    labelBgColor="rgb(33, 33, 38)"
                    value={nameFilter}
                    style={{}}
                    onChange={(e) => setNameFilter(e.target.value)}
                />
                <Input
                    id="IdF"
                    label="Id Filter"
                    labelBgColor="rgb(33, 33, 38)"
                    value={idFilter}
                    style={{}}
                    onChange={(e) => setIdFilter(e.target.value)}
                />
            </div>
            <div className={style.nftList}>
                {filteredNfts.length > 0 &&

                    filteredNfts.map((e, i) => {
                        return (
                            <>
                                <div key={i + 1} className={style.nftInfo}>
                                    {e.image ? <img src={e.image} width={200} /> : <img src="https://cdn.dribbble.com/users/383277/screenshots/18055765/media/e5fc935b60035305099554810357012a.png?compress=1&resize=400x300" alt="logo" width={200} />}
                                    <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                        <div style={{ fontWeight: "700" }}>Name: {e.name}, </div>
                                        <div style={{ fontWeight: "700", color: "darkcyan" }}>(ID: {e.token_id.slice(0, 5)})</div>
                                    </div>
                                </div>
                            </>
                        );
                    })
                }
            </div>

        </>
    );
}

export default Nfts;