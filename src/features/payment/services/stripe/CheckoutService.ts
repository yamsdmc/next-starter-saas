import Stripe from "stripe";
import {StripeCustomerService} from "@/features/payment/services/stripe/CustomerService";
import {createStripeClient} from "@/infrastructure/stripe/stripeClient";

export class StripeCheckoutService {
    private customerService: StripeCustomerService;

    constructor(customerService: StripeCustomerService) {
        this.customerService = customerService;
    }

    /**
     * Create a checkout session for subscription
     * @param email - The email of the customer
     * @param metadata - Additional metadata for the session
     * @param productId - The ID of the product to subscribe to
     * @param origin - The origin URL for success and cancel redirects
     * @returns The created Stripe Checkout Session
     */
    async createSubscriptionCheckoutSession(
        email: string,
        metadata: Record<string, any>,
        productId: string,
        origin: string
    ): Promise<Stripe.Checkout.Session> {
        const customerId = await this.customerService.findOrCreateByEmail(email, metadata);

        const sessionParams: Stripe.Checkout.SessionCreateParams = {
            line_items: [
                {
                    price: productId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${origin}/`,
            cancel_url: `${origin}/`,
            customer: customerId,
            metadata: metadata,
        };

        return await createStripeClient().checkout.sessions.create(sessionParams);
    }
}