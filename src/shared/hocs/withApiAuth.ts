import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getSession } from "@auth0/nextjs-auth0";

/**
 * Higher-Order Component (HOC) to add authentication to Next.js API routes
 *
 * @param {NextApiHandler} handler - The original API route manager
 * @returns {NextApiHandler} A new API route manager with authentication
 */
export function withApiAuth(handler: NextApiHandler): NextApiHandler {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const session = await getSession(req as any, res as any);
            if (!session || !session.user) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            req.session = session;

            return handler(req, res);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}