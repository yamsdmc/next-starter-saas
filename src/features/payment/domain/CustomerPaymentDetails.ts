import {Invoice} from "@/features/payment/domain/Invoice";
import {Subscription} from "@/features/payment/domain/Subscription";


export class CustomerPaymentDetails {
    invoices: Invoice[];
    subscriptions: Subscription[];

    constructor(invoices: any, subscriptions: any) {
        this.invoices = invoices.map(invoice => new Invoice(invoice));
        this.subscriptions = subscriptions.map(subscription => Subscription.create(subscription));
    }

    execute() {
        return {
            invoices: this.invoices,
            subscriptions: this.subscriptions.find((subscription: Subscription) => subscription?.status === 'active'),
        };
    }
}