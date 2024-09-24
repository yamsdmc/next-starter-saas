import {handleLogin, LoginOptions} from '@auth0/nextjs-auth0';
import {NextApiRequest, NextApiResponse} from 'next';

/**
 * API handler for user signup using Auth0
 *
 * This function handles the signup process for new users. It uses Auth0's handleLogin
 * function with custom parameters to initiate the signup flow. After successful signup,
 * it performs additional actions such as adding tokens to the user.
 *
 * @param {NextApiRequest} req - The Next.js API request object
 * @param {NextApiResponse} res - The Next.js API response object
 *
 * @returns {Promise<void>}
 */
export default async function signup(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        await handleLogin(req, res, {
            authorizationParams: {
                screen_hint: 'signup',
            },
            getLoginState: (req: any, options: LoginOptions) => {
                return {
                    ...options.getLoginState ? options.getLoginState(req, options) : {},
                    customField: 'new_user',
                    returnTo: '/',
                }
            },
        });
        const userId = req.body.user_id;
        if (!userId) {
            throw new Error('User ID not found after registration');
        }

        // Here you can add additional logic, such as:
        // - Creating a user profile in your database
        // - Assigning initial roles or permissions
        // - Sending a welcome email

        // Send a success response

        res.status(200).json({message: 'User registered successfully'});
    } catch (error) {
        res.status((error as any).status || 500).json({error: (error as any).message});
    }
}