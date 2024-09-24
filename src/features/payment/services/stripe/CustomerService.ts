import Stripe from "stripe";
import {createStripeClient} from "@/infrastructure/stripe/stripeClient";

/**
 * Service for handling Stripe customer-related operations
 */
export class StripeCustomerService {
    private customerCache: Map<string, Stripe.Customer | null> = new Map();
    /**
     * Private method to get or retrieve a customer, with caching
     * @param email - The email of the customer
     * @returns The Stripe customer object or null if not found
     */
    private async getOrRetrieveCustomer(email: string): Promise<Stripe.Customer | null> {
        if (this.customerCache.has(email)) {
            return this.customerCache.get(email) || null;
        }

        try {
            const customers = await createStripeClient().customers.list({ email, limit: 1 });
            const customer = customers.data[0] || null;
            this.customerCache.set(email, customer);
            return customer;
        } catch (error) {
            console.error('Error retrieving Stripe customer:', error);
            throw new Error('Failed to retrieve Stripe customer');
        }
    }

    /**
     * Get a customer by email
     * @param email - The email of the customer
     * @returns The Stripe customer object or undefined if not found
     */
    async getCustomerByEmail(email: string): Promise<Stripe.Customer | null> {
        return this.getOrRetrieveCustomer(email);
    }

    /**
     * Create a new customer
     * @param email - The email of the customer
     * @param metadata - Additional metadata for the customer
     * @returns The newly created Stripe customer
     */
    async createCustomer(email: string, metadata: Record<string, any>): Promise<Stripe.Customer> {
        try {
            const newCustomer = await createStripeClient().customers.create({ email, metadata });
            this.customerCache.set(email, newCustomer);
            return newCustomer;
        } catch (error) {
            console.error('Error creating Stripe customer:', error);
            throw new Error('Failed to create Stripe customer');
        }
    }


    async findOrCreateByEmail(email: string, metadata: Record<string, any>): Promise<string> {
        try {
            const existingCustomer = await this.getCustomerByEmail(email);
            if (existingCustomer) {
                return existingCustomer.id;
            }

            const newCustomer = await this.createCustomer(email, metadata);
            return newCustomer.id;
        } catch (error) {
            throw new Error('Failed to find or create Stripe customer');
        }
    }

    async getInvoicesFromEmail(email: string, limit= 10) {
        const customer = await this.getOrRetrieveCustomer(email);
        if (!customer) {
            throw new Error('No customer found for this email');
        }

        return createStripeClient().invoices.list({
            customer: customer.id,
            limit: limit,
        })
    }
    async getSubscriptionsFromEmail(email: string, status?: string): Promise<Stripe.ApiList<Stripe.Subscription>> {
        const customer = await this.getOrRetrieveCustomer(email);
        if (!customer) {
            throw new Error('No customer found for this email');
        }

        return createStripeClient().subscriptions.list({
            customer: customer.id,
            status: status as any ?? 'all',
            expand: ['data.plan'],
        })
    }
    /**
     * Cancel the customer's subscription at the end of the current billing period
     * @param email - The email of the customer
     * @returns The updated subscription object
     * @throws Error if no active subscription is found or if the cancellation fails
     */
    async cancelSubscriptionAtPeriodEnd(email: string): Promise<Stripe.Subscription> {
        try {
            const subscriptions = await this.getSubscriptionsFromEmail(email);
            if (subscriptions.data.length === 0) {
                throw new Error('No active subscription found for this customer');
            }

            const subscriptionUpdated = await createStripeClient().subscriptions.update(
                subscriptions.data[0].id,
                {
                    cancel_at_period_end: true,
                }
            );
            return subscriptionUpdated;
        } catch (error) {
            throw new Error('Failed to cancel subscription');
        }
    }

    async updateSubscription(subscriptionId: string, update: Stripe.SubscriptionUpdateParams): Promise<Stripe.Subscription> {
        try {
            return await createStripeClient().subscriptions.update(subscriptionId, update);
        } catch (error) {
            throw new Error('Failed to update subscription');
        }
    }
}


export async function getUserByStripeCustomerId(stripeCustomerId: string): Promise<Stripe.Customer | null> {
    try {
        const customer: Stripe.Customer = await createStripeClient().customers.retrieve(stripeCustomerId) as Stripe.Customer;

        if (customer && !customer.deleted) {
            return customer
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}