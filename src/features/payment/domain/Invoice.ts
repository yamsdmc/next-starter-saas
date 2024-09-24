import Stripe from "stripe";
import {formatPriceByCurrency} from "@/shared/utils/formatPrice";
import {DateManager} from "@/shared/utils/DateManager";

export class Invoice {
    id: string;
    number: string | null;
    amountPaid: number | string;
    status: Stripe.Invoice.Status | null;
    created: string;
    link: string;

    constructor(invoice: Stripe.Invoice) {
        this.id = invoice.id;
        this.number = invoice.number;
        this.amountPaid = formatPriceByCurrency(invoice.amount_paid);
        this.status = invoice.status;
        this.created = new DateManager(invoice.created).format('DD/MM/YYYY');
        this.link = invoice.hosted_invoice_url ?? '';
    }
}