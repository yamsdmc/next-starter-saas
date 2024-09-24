import {NextApiRequest, NextApiResponse} from "next";
import {withApiAuth} from "@/shared/hocs/withApiAuth";
import {StripeCustomerService} from "@/features/payment/services/stripe/CustomerService";

/**
 * API handler for reactivating a user's cancelled Stripe subscription
 *
 * This function handles the reactivation of a user's Stripe subscription that was previously
 * set to cancel at the end of the billing period. It verifies the user's Stripe customer ID,
 * checks for an active subscription that is set to cancel, and then removes the cancellation.
 */
 async function reactivateSubscription(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const session = req.session

        const customerService = new StripeCustomerService();
        const subscriptions = await customerService.getSubscriptionsFromEmail(session?.user.email, 'active');

        if (subscriptions.data.length === 0) {
            return res.status(404).json({ error: 'No active subscription found for this customer' });
        }

        const subscription = subscriptions.data[0];


        if (!subscription.cancel_at_period_end) {
            return res.status(400).json({ error: "The subscription is not scheduled for cancellation" });
        }
        const updatedSubscription = customerService.updateSubscription(subscription.id, {
            cancel_at_period_end: false,
        })

        return res.status(200).json({ subscription: updatedSubscription });

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while reactivating the subscription' });
    }
}

export default withApiAuth(reactivateSubscription);