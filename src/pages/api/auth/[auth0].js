import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';

export default handleAuth({
    async callback(req, res) {
        try {
            await handleCallback(req, res, {
                afterCallback: (req, res, session, state) => {
                    if (session) {
                        res.setHeader('Location', '/');
                    }
                    return session;
                },
            });
        } catch (error) {
            res.status(error.status || 500).end(error.message);
        }
    },
});