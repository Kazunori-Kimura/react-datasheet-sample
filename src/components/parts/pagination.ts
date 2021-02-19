import { ChangeEvent, ElementType, useMemo, useState } from 'react';

interface usePaginationParams<T> {
    component?: ElementType;
    items: T[];
    page?: number;
    rowsPerPage: number;
    rowsPerPageOptions?: number[];
}

interface usePaginationValues<T> {
    component?: ElementType;
    count: number;
    emptyRows: number;
    page: number;
    pageItems: T[];
    rowsPerPage: number;
    rowsPerPageOptions: number[];
    onChangePage: (event: unknown, page: number) => void;
    onChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * TablePagination の props を生成するカスタム Hooks
 */
export const usePagination = <T>({
    component = 'div',
    items,
    page = 0,
    rowsPerPage,
    rowsPerPageOptions = [5, 10, 30],
}: usePaginationParams<T>): usePaginationValues<T> => {
    const [currentPage, setPage] = useState(page);
    const [perPage, setRowsPerPage] = useState(rowsPerPage);

    const onChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const onChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const v = parseInt(value, 10);
        if (!Number.isNaN(v)) {
            setPage(0);
            setRowsPerPage(v);
        }
    };

    const emptyRows = useMemo(() => {
        return perPage - Math.min(perPage, items.length - currentPage * perPage);
    }, [items.length, currentPage, perPage]);

    const pageItems = useMemo(
        () => items.slice(currentPage * perPage, currentPage * perPage + perPage),
        [currentPage, items, perPage]
    );

    return {
        component,
        count: items.length,
        emptyRows,
        page: currentPage,
        pageItems,
        rowsPerPage: perPage,
        rowsPerPageOptions,
        onChangePage,
        onChangeRowsPerPage,
    };
};
