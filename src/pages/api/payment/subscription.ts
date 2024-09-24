import {NextApiRequest, NextApiResponse} from 'next';
import {withApiAuth} from "@/shared/hocs/withApiAuth";
import {CustomerPaymentDetails} from "@/features/payment/domain/CustomerPaymentDetails";
import {StripeCustomerService} from "@/features/payment/services/stripe/CustomerService";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({error: 'Method not allowed'});
    }

    try {
        const session = req.session

        const customerService = new StripeCustomerService();
        const invoices = await customerService.getInvoicesFromEmail(session?.email);
        const subscriptions = await customerService.getSubscriptionsFromEmail(session?.email);

        const paymentDetails = new CustomerPaymentDetails(invoices.data, subscriptions.data).execute();

        res.status(200).json(paymentDetails);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
}

export default withApiAuth(handler);

