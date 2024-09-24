import { buffer, RequestHandler } from 'micro';
import Cors from 'micro-cors';
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import {createStripeClient} from "@/infrastructure/stripe/stripeClient";

export const config = {
    api: {
        bodyParser: false,
    },
};

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

type CompatibleRequestHandler = ((req: NextApiRequest, res: NextApiResponse) => void | Promise<void>) & RequestHandler;

const cors = Cors({
    allowMethods: ['POST', 'HEAD'],
});

const handleCheckoutSessionCompleted = async (session: Stripe.Checkout.Session) => {
    const userId = session.metadata?.userId;
    const subscriptionId = session.subscription as string;

    if (userId && subscriptionId) {
        console.log('Received checkout.session.completed event:', session.id);
        console.log('event data:', session);
        // Ajoutez ici la logique pour traiter la session complétée
    } else {
        console.error('Missing userId or subscriptionId', { userId, subscriptionId });
    }
};

const handleInvoicePaid = async (invoice: Stripe.Invoice) => {
    if (!invoice.subscription) {
        throw new Error(`Invoice ${invoice.id} is not for a subscription`);
    }

    console.log('Received invoice.paid event:', invoice.id);
    console.log('event data:', invoice);
    // Ajoutez ici la logique pour traiter la facture payée
};

const webhookHandler: CompatibleRequestHandler = async (req, res) => {
    if (req.method === 'POST') {
        const buf = await buffer(req);
        const sig = req.headers['stripe-signature'] as string | undefined;

        let event: Stripe.Event;

        try {
            if (!sig || !webhookSecret) {
                throw new Error('Missing stripe signature or webhook secret');
            }
            event = createStripeClient().webhooks.constructEvent(buf, sig, webhookSecret);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            console.error(`Webhook Error: ${errorMessage}`);
            return res.status(400).send(`Webhook Error: ${errorMessage}`);
        }

        try {
            switch (event.type) {
                case 'checkout.session.completed':
                    await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
                    break;
                case 'invoice.paid':
                    await handleInvoicePaid(event.data.object as Stripe.Invoice);
                    break;
                default:
                    console.log(`Unhandled event type ${event.type}`);
            }

            res.json({ received: true });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            console.error('Error processing webhook:', errorMessage);
            res.status(500).json({ error: 'Failed to process webhook' });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end();
    }
};

export default cors(webhookHandler);