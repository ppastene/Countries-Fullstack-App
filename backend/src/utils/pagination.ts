/**
 * Paginates an array of items based on the specified page number and items per page.
 * @param array The array of items to paginate.
 * @param pageNumber The page number to retrieve.
 * @param itemsPerPage The number of items per page.
 * @returns An object containing paginated data along with page information.
 */

export function paginateArray<T>(array: T[], pageNumber: number, itemsPerPage: number){
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const totalItems = array.length;
    const totalPages = Math.ceil(array.length / itemsPerPage);
    const data = array.slice(startIndex, startIndex + itemsPerPage);
    return {
        data: data,
        page: pageNumber,
        total_items: totalItems,
        total_pages: totalPages,
        items_per_page: itemsPerPage,
    }
}