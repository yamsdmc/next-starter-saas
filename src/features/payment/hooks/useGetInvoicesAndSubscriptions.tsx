import useSWR from 'swr'
import {fetcher} from "@/shared/utils/fetcher";
import {CustomerPaymentDetails} from "@/features/payment/domain/CustomerPaymentDetails";
import {ErrorMonitoring} from "@/infrastructure/ErrorMonitoring";
import {showToast} from "@/components/global/ToasterManager";

export const useGetInvoicesAndSubscriptions = () => {
    const { data, error } = useSWR('/api/payment/subscription', fetcher);

    const isLoading = !data && !error;

    if (error) {
        showToast.error('Failed to fetch invoices and subscription. Please try again.');
        ErrorMonitoring.captureException(error, {
            tags: {
                component: 'useGetInvoicesAndSubscriptions',
            }
        });
    }

    return {
        subscription: data as CustomerPaymentDetails,
        isLoading,
        isSubscriptionError: error,
    };
};