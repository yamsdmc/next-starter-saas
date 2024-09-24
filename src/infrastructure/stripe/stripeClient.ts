import Stripe from "stripe";

export const createStripeClient = () => {
    return new Stripe(process.env.STRIPE_SECRET_KEY!);
}