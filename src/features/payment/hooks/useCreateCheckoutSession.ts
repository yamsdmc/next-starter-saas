import { useState } from "react";
import {showToast} from "@/components/global/ToasterManager";
import {ErrorMonitoring} from "@/infrastructure/ErrorMonitoring";

export const useCreateCheckoutSession = () => {
    const [sessionLoading, setSessionLoading] = useState(false);

    const createCheckoutSession = async (): Promise<void> => {
        setSessionLoading(true);
        console.log('useCreateCheckoutSession');
        try {
            const response = await fetch('/api/payment/checkout_sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.log('Network response was not ok');
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('data', data);
            if (data.url) {
                window.location.href = data.url;
            } else {
                console.log('No URL returned from the server');
                throw new Error('No URL returned from the server');
            }
        } catch (error) {
            ErrorMonitoring.captureException(error);
            showToast.error('Failed to subscribe to plan. Please try again.');
        } finally {
            setSessionLoading(false);
        }
    };

    return {
        createCheckoutSession,
        sessionLoading,
    };
}