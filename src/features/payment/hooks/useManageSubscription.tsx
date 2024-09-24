import {useState} from "react";
import {showToast} from "@/components/global/ToasterManager";

export const useManageSubscription = () => {
    const [managementSubscriptionLoading, setManagementSubscriptionLoading] = useState(false);
    const handleManageSubscription = async () => {
        setManagementSubscriptionLoading(true);
        try {
            const response = await fetch('/api/payment/create-portal-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to create portal session');
            }

            const { url } = await response.json();
            window.location.href = url;
        } catch (error) {
            showToast.error('Failed to manage subscription. Please try again.');
        }
        finally {
            setManagementSubscriptionLoading(false)
        }
    };

    return {
        handleManageSubscription,
        managementSubscriptionLoading,
    }
}