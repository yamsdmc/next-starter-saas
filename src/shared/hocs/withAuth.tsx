import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ComponentType } from 'react';
import useAuthUser from "@/hooks/useAuthUser";

type WrappedComponentProps = {
    [key: string]: any;
};

/**
 * A Higher-Order Component (HOC) that adds authentication checks to a wrapped component.
 * It ensures that only authenticated users can access the wrapped component.
 *
 * @template P - The props type of the wrapped component
 * @param {ComponentType<P>} WrappedComponent - The component to be wrapped with authentication
 * @returns {Function} A new component that includes authentication checks
 */
export function withAuth<P extends WrappedComponentProps>(WrappedComponent: ComponentType<P>) {
    return function WithAuth(props: P) {
        const { user, isLoading } = useAuthUser()
        const router = useRouter();

        useEffect(() => {
            if (!isLoading && !user.email) {
                router.push('/api/auth/login');
            }
        }, [isLoading, user, router]);

        if (!user.email) {
            return <div className="flex content-center m-auto items-center">Loading ...</div>;
        }

        return <WrappedComponent {...props} />;
    };
}