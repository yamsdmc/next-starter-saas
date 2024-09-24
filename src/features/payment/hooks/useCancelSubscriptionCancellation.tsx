import {mutate} from "swr";
import {useState} from "react";
import {showToast} from "@/components/global/ToasterManager";

export const useCancelSubscriptionCancellation = () => {
    const [cancelSubscriptionCancellationLoading, setCancelSubscriptionCancellationLoading] = useState(false);

    const cancelSubscriptionCancellation = async (): Promise<void> => {
        setCancelSubscriptionCancellationLoading(true);
        try {
            const response = await fetch('/api/payment/reactivate-subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            await mutate('/api/payment/subscription');
            showToast.success('Your subscription has been successfully reactivated.');
        } catch (error) {
            showToast.error('Failed to unsubscribe from the beta plan. Please try again.');
        } finally {
            setCancelSubscriptionCancellationLoading(false);
        }
    };

    return { cancelSubscriptionCancellation, cancelSubscriptionCancellationLoading };
};