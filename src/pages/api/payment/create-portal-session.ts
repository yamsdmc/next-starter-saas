import {NextApiRequest, NextApiResponse} from "next";
import {withApiAuth} from "@/shared/hocs/withApiAuth";
import {StripeCustomerService} from "@/features/payment/services/stripe/CustomerService";
import {StripePortalService} from "@/features/payment/services/stripe/PortalService";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        res.status(405).end();
    }

    try {
        const session = req.session

        const customerService = new StripeCustomerService()
        const customer = await customerService.getCustomerByEmail(session?.user.email);
        if(!customer) {
            res.status(404).json({error: 'No customer found'});
        }

        const url = process.env.AUTH0_BASE_URL
        const portalService = new StripePortalService(url);
        const portalSessionCreated = await portalService.createCustomerPortalSession((customer as any).id);

        res.status(200).json({url: portalSessionCreated.url});
    } catch (error) {
        res.status(500).json({error: 'An error occurred while creating the portal session'});
    }

}

export default withApiAuth(handler);