import {NextApiRequest, NextApiResponse} from 'next';
import {withApiAuth} from "@/shared/hocs/withApiAuth";
import {StripeCustomerService} from "@/features/payment/services/stripe/CustomerService";
import {StripeCheckoutService} from "@/features/payment/services/stripe/CheckoutService";
import {stripeConfig} from "@/infrastructure/stripe/stripeConfig";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        res.status(405).json('Method Not Allowed');
    }
    try {

        const session = req.session
        const metadata = {
            userId: session?.user.sub,
            email: session?.user.email
        }
        const origin = req.headers.origin ?? ''
        const checkoutService = new StripeCheckoutService(new StripeCustomerService());
        const stripeSession = await checkoutService.createSubscriptionCheckoutSession(
            session?.user.email,
            metadata,
            stripeConfig.productId,
            origin
        );

        res.status(200).json({url: stripeSession.url});
    } catch (err: any) {
        res.status(err.statusCode || 500).json(err.message);
    }
}

export default withApiAuth(handler);