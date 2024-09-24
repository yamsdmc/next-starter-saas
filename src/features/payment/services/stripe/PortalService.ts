import {createStripeClient} from "@/infrastructure/stripe/stripeClient";

export class StripePortalService {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    /**
     * Create a customer portal session
     * @param customerId - The Stripe customer ID
     * @returns The URL for the customer portal session
     */
    async createCustomerPortalSession(customerId: string, returnUrl?: string) {
        try {
            const session = await createStripeClient().billingPortal.sessions.create({
                customer: customerId,
                return_url: `${this.baseUrl}/${returnUrl ?? ''}`,
            });

            return session;
        } catch (error) {
            throw new Error('Failed to create customer portal session');
        }
    }
}