import React from "react";
import {useGetInvoicesAndSubscriptions} from "@/features/payment/hooks/useGetInvoicesAndSubscriptions";
import {useCreateCheckoutSession} from "@/features/payment/hooks/useCreateCheckoutSession";
import {useManageSubscription} from "@/features/payment/hooks/useManageSubscription";
import {useCancelSubscriptionCancellation} from "@/features/payment/hooks/useCancelSubscriptionCancellation";
import Spinner from "@/components/atoms/spinner";

const SubscriptionSection = () => {
    const {isLoading, subscription} = useGetInvoicesAndSubscriptions();
    const {sessionLoading, createCheckoutSession} = useCreateCheckoutSession();
    const {handleManageSubscription, managementSubscriptionLoading} = useManageSubscription();
    const {cancelSubscriptionCancellation, cancelSubscriptionCancellationLoading} = useCancelSubscriptionCancellation();

    if (isLoading) return <Spinner/>;

    return (
        <>
            {subscription.subscriptions?.plan?.cancelAtPeriodEnd ? (
                <button
                    onClick={cancelSubscriptionCancellation}
                    disabled={cancelSubscriptionCancellationLoading}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {cancelSubscriptionCancellationLoading ? 'Loading...' : 'Annuler la résiliation'}
                </button>
            ) : subscription.subscriptions?.id ? (
                <button
                    onClick={handleManageSubscription}
                    disabled={managementSubscriptionLoading}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {sessionLoading ? <Spinner/> : 'Gérer mon abonnement'}
                </button>
            ) : (
                <button
                    onClick={createCheckoutSession}
                    disabled={sessionLoading}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {sessionLoading ? <Spinner/> : 'Acheter'}
                </button>
            )}
        </>
    );
};

export default SubscriptionSection;
