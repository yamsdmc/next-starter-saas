import { Session } from '@auth0/nextjs-auth0';

declare module 'next' {
    interface NextApiRequest {
        session?: Session;
    }
}