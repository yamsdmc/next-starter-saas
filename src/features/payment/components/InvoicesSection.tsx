import React from "react";
import {useGetInvoicesAndSubscriptions} from "@/features/payment/hooks/useGetInvoicesAndSubscriptions";
import Spinner from "@/components/atoms/spinner";
import Link from "next/link";

const InvoicesSection = () => {
    const {isLoading, subscription } = useGetInvoicesAndSubscriptions();

    return (
        <>
            <div>Factures:</div>
            {isLoading ? <Spinner /> : subscription.invoices.map(invoice => <Invoice invoice={invoice} />)}
        </>
    );
};

export default InvoicesSection;

const Invoice = ({invoice}: { invoice: any }) => {
    return <div key={invoice.id} className="border border-neutral-800 px-4 py-2 w-max">
            <div>{invoice.number} - {invoice.created}</div>
            <div>{invoice.status}</div>
            <div>{invoice.amountPaid}</div>
            <Link href={invoice.link} target="_blank">Voir la facture</Link>
        </div>;
};
