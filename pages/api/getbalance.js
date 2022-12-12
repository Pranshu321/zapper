import Moralis from "moralis";
import { useRouter } from "next/router";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


export default async function handler(req, res) {
    
    const { address , chain} = req.query;

    const response = await Moralis.EvmApi.balance.getNativeBalance({
        address,
        chain,
    });
    console.log(response?.toJSON());
    res.status(200).json(response?.toJSON());
}
