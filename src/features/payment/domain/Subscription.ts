import Stripe from "stripe";
import {formatPriceByCurrency} from "@/shared/utils/formatPrice";
import {DateManager} from "@/shared/utils/DateManager";

export class Subscription {
    id: string;
    status: string;
    plan: {
        id: string;
        cancelAtPeriodEnd: boolean;
        currentPeriodEnd: string;
        amount: string;
        interval: string;
    };

    constructor(subscription: Stripe.Subscription) {
        this.id = subscription.id;
        this.status = subscription.status;
        this.plan = {
            id: (subscription as any).plan.id,
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            currentPeriodEnd: new DateManager(subscription.current_period_end).format('DD/MM/YYYY'),
            amount: formatPriceByCurrency((subscription as any).plan.amount),
            interval: (subscription as any).plan.interval,
        };
    }
    static create(subscription: Stripe.Subscription | null): Subscription {
        if (subscription && Subscription.#isActive(subscription)) {
            return new Subscription(subscription);
        }
        return Subscription.#empty();
    }
    static #isActive(subscription: Stripe.Subscription): boolean {
        return subscription.status === 'active';
    }

    static #empty(): Subscription {
        return {} as Subscription;
    }
}