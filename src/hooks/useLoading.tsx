import { useState } from "react";
import {showToast} from "@/components/global/ToasterManager";


interface UseLoadingResult {
    /** Indicates whether the async operation is currently loading */
    loading: boolean;
    /** Function to execute the async operation */
    execute: () => Promise<void>;
}

/**
 * Custom hook to manage loading state for asynchronous operations
 *
 * @param {() => Promise<void>} asyncFunction - The asynchronous function to be executed
 * @returns {UseLoadingResult} An object containing the loading state and execute function
 *
 * @example
 * const fetchData = async () => {
 *   const response = await fetch('https://api.example.com/data');
 *   const data = await response.json();
 *   // Process data...
 * };
 *
 * function MyComponent() {
 *   const { loading, execute } = useLoading(fetchData);
 *
 *   return (
 *     <div>
 *       <button onClick={execute} disabled={loading}>
 *         {loading ? 'Loading...' : 'Fetch Data'}
 *       </button>
 *     </div>
 *   );
 * }
 */
export const useLoading = (asyncFunction: () => Promise<void>) => {
    const [loading, setLoading] = useState(false);

    const execute = async () => {
        setLoading(true);
        try {
            await asyncFunction();
        } catch (error) {
            showToast.error('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { loading, execute };
};