import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";


/**
 * Map to store rate limiting data for each IP address
 * @type {Map<string, {count: number, lastReset: number}>}
 */
const rateLimitMap = new Map();


/**
 * Rate limiting middleware for Next.js API routes
 *
 * @param {NextApiHandler} handler - The Next.js API route handler to be wrapped
 * @returns {NextApiHandler} A new handler function with rate limiting applied
 */
export default function rateLimitMiddleware(handler: NextApiHandler) {
    return (req: NextApiRequest, res: NextApiResponse) => {
        const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        /**
         * Number of requests allowed per time window
         */
        const limit = 15;
        /**
         * Duration of the rate limiting window in milliseconds (1 minute)
         */
        const windowMs = 60 * 1000;

        if (!rateLimitMap.has(ip)) {
            rateLimitMap.set(ip, {
                count: 0,
                lastReset: Date.now(),
            });
        }

        const ipData = rateLimitMap.get(ip);

        if (Date.now() - ipData.lastReset > windowMs) {
            ipData.count = 0;
            ipData.lastReset = Date.now();
        }

        if (ipData.count >= limit) {
            return res.status(429).send("Too Many Requests");
        }

        ipData.count += 1;

        return handler(req, res);
    };
}