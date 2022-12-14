import Moralis from "moralis";
import axios from 'axios';
Moralis.start({ apiKey: process.env.Moralis_key })


export default async function handler(req, res) {
    const { address, chain } = req.query;
    const key = process.env.Moralis_key;

    const options = {
        method: 'GET',
        url: `https://deep-index.moralis.io/api/v2/${address}`,
        params: { chain: chain },
        headers: { accept: 'application/json', "x-api-key": key }
    };

    axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
            res.status(200).json(response.data.result)
        })
        .catch(function (error) {
            console.error(error);
        });
}
