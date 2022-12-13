import Moralis from "moralis";

Moralis.start({ apiKey: process.env.Moralis_key })

export default async function handler(req, res) {

    const { address, chain } = req.query;

    const response = await Moralis.EvmApi.balance.getNativeBalance({
        address,
        chain,
    });

    const NativeBalance = response?.toJSON();
    let nativeCurrency;
    if (chain === "0x1") {
        nativeCurrency = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    } else if (chain === "0x89") {
        nativeCurrency = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
    }
    else if (chain === "0x5") {
        nativeCurrency = "0x627118a4fB747016911e5cDA82e2E77C531e8206";
    }

    const nativePrice = await Moralis.EvmApi.token.getTokenPrice({
        address: nativeCurrency, //WETH Contract
        chain: chain,
    });

    NativeBalance.usd = nativePrice.result.usdPrice;
    console.log(NativeBalance);
    res.status(200).json(NativeBalance);
}
