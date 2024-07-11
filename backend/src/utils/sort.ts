/**
 * Sorts an array of objects based on a specified property in ascending or descending order.
 * @param arr The array to be sorted.
 * @param order The order in which to sort the array ('asc' for ascending, 'desc' for descending).
 * @param prop The property of the objects to base the sorting on.
 * @returns The sorted array.
 */
export function sortArray<T>(arr: T[], order: string, prop: keyof T): T[] {
    return arr.sort((a, b) => {
        const comparison = a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
        return order === 'asc' ? comparison : -comparison;
    });
}