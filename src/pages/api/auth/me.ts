import type { NextApiRequest, NextApiResponse } from 'next';
import {withApiAuth} from "@/shared/hocs/withApiAuth";

async function me(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = req.session

        return res.status(200).json(session?.user);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default withApiAuth(me);
