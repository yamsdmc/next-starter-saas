import { NextApiRequest, NextApiResponse } from 'next';
import {withApiAuth} from "@/shared/hocs/withApiAuth";
import {StripeCustomerService} from "@/features/payment/services/stripe/CustomerService";

/**
 * API handler for cancelling a user's Stripe subscription
 *
 * This function handles the cancellation of a user's Stripe subscription. It first checks
 * if the user has a Stripe customer ID, then retrieves their active subscription and
 * updates it to cancel at the end of the current billing period.
 */
 async function cancelSubscription(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const session = req.session

    try {

        const stripeCustomerService = new StripeCustomerService();
        const subscriptionUpdated = await stripeCustomerService.cancelSubscriptionAtPeriodEnd(session?.user.email);

        res.status(200).json({
            message: 'Subscription successfully cancelled',
            subscription: subscriptionUpdated
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export default withApiAuth(cancelSubscription);