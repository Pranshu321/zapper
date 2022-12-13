import Moralis from "moralis";

Moralis.start({ apiKey: process.env.Moralis_key })

export default async function handler(req, res) {


    try {
        const { address, chain } = req.query;

        const response = await Moralis.EvmApi.token.getWalletTokenBalances({
            address: address,
            chain: chain
        });

        let tokens = response.result;
        res.status(200).json(tokens);

    } catch (error) {
        res.status(404).json(error);
    }
}
