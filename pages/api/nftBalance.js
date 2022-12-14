import axios from "axios";
import Moralis from "moralis";
// Moralis.start({ apiKey: process.env.Moralis_key })

export default async function handler(req, res) {
    const { address, chain } = req.query;

    const options = {
        method: 'GET',
        url: `https://deep-index.moralis.io/api/v2/${address}/nft`,
        params: { chain: chain , format: 'decimal', normalizeMetadata: 'false' },
        headers: { accept: 'application/json', "x-api-key": process.env.Moralis_key }
    };

    axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
            res.status(200).json(response.data)
        })
        .catch(function (error) {
            console.error(error);
        });

}
