import { useRouter } from 'next/router';

/**
 * Represents a single item in the breadcrumb
 */
export interface BreadcrumbItem {
    /** The title to display for this breadcrumb item */
    title: string;
    /** The path this breadcrumb item links to */
    path: string;
    /** Optional icon for the breadcrumb item */
    icon?: string;
}

/**
 * A map of route paths to their corresponding breadcrumb data
 */
export type BreadcrumbMap = Record<string, Omit<BreadcrumbItem, 'path'>>;

/**
 * Predefined breadcrumb data for known routes
 */
export const breadcrumbMap: BreadcrumbMap = {
    '/': {
        title: "Home",
        icon: "/images/beta/icons/home.svg"
    },
    '/dashboard': {
        title: "Dashboard",
        icon: "/images/beta/icons/dashboard.svg"
    },
    '/profile': {
        title: "Profile",
        icon: "/images/beta/icons/profile.svg"
    },
    // Add more routes as needed
};

/**
 * Custom hook to generate breadcrumb for the current route
 *
 * @returns {BreadcrumbItem[]} An array of breadcrumb items for the current route
 *
 * @example
 * function Breadcrumb() {
 *   const breadcrumbs = useBreadcrumb();
 *
 *   return (
 *     <nav>
 *       {breadcrumbs.map((item, index) => (
 *         <span key={item.path}>
 *           {index > 0 && " > "}
 *           <Link href={item.path}>
 *             {item.icon && <img src={item.icon} alt="" />}
 *             {item.title}
 *           </Link>
 *         </span>
 *       ))}
 *     </nav>
 *   );
 * }
 */
export function useBreadcrumb(): BreadcrumbItem[] {
    const router = useRouter();
    const pathSegments = router.asPath.split('/').filter(Boolean);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Home", path: "/", icon: breadcrumbMap['/']?.icon }
    ];

    let currentPath = "";

    for (const segment of pathSegments) {
        currentPath += `/${segment}`;
        const breadcrumbData = breadcrumbMap[currentPath] || { title: segment };

        breadcrumbs.push({
            title: breadcrumbData.title,
            path: currentPath,
            icon: breadcrumbData.icon
        });
    }

    return breadcrumbs;
}

export default useBreadcrumb;