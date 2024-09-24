/**
 * Paginates an array of items.
 *
 * @template T - The type of elements in the array
 * @param {T[]} items - The array of items to paginate
 * @param {number} page - The current page number (1-based)
 * @param {number} limit - The number of items per page
 * @returns {Object} An object containing paginated results and metadata
 * @property {T[]} items - The subset of items for the current page
 * @property {number} currentPage - The current page number
 * @property {number} totalPages - The total number of pages
 * @property {number} totalItems - The total number of items in the original array
 */
export const paginate = <T>(items: T[], page: number, limit: number) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedItems = items.slice(startIndex, endIndex);

    return {
        items: paginatedItems,
        currentPage: page,
        totalPages: Math.ceil(items.length / limit),
        totalItems: items.length,
    };
}