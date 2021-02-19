import { makeStyles, TablePagination } from '@material-ui/core';
import { KeyboardEvent, useEffect, useState } from 'react';
import ReactDataSheet from 'react-datasheet';
import DataCell from './DataCell';
import DataTableToolbar from './DataTableToolbar';
import { usePagination } from './pagination';
import { GridElement } from './types';

interface DataTableProps<T> {
    data: T[];
    title: string;
    columns: string[];
    uninsertable?: boolean;
    undeletable?: boolean;
    onChange?: (data: T[]) => void;
    validator?: (item: unknown) => item is T;
    convertRow: (item: T | undefined | null, index: number) => GridElement[];
    parseEntity?: (row: GridElement[], index: number) => T;
    goBack?: VoidFunction;
}

const useStyles = makeStyles((theme) => ({
    root: {
        //
    },
    toolbar: {
        //
    },
    title: {
        //
    },
}));

function DataTable<T>({
    data,
    title,
    columns,
    //onChange,
    //validator,
    convertRow,
}: //parseEntity,
DataTableProps<T>): React.ReactElement {
    // データ全体
    const [grid, setGrid] = useState<GridElement[][]>([]);
    // 現在のフォーカスセル
    const [current, setCurrent] = useState<ReactDataSheet.CellReference>();
    // TODO 選択セルの管理

    const classes = useStyles();
    const { emptyRows, pageItems, ...paginationProps } = usePagination({
        items: grid,
        rowsPerPage: 10,
    });

    /**
     * 行の挿入
     * @param position 挿入位置, 未指定なら最下部
     */
    const insert = (position?: number) => {
        const rows = JSON.parse(JSON.stringify(grid)) as GridElement[][];
        const pos = position ?? rows.length;
        const emptyRow = convertRow(null, pos);

        if (typeof position === 'number') {
            rows.splice(position, 0, emptyRow);
        } else {
            rows.push(emptyRow);
        }

        setGrid(rows);
    };

    /**
     * 行の挿入
     */
    const handleInsert = () => {
        let pos = current?.row;
        if (typeof pos === 'number') {
            pos += 1;
        }
        insert(pos);
    };

    /**
     * キーボード操作（ページ送り）
     * @param event
     */
    const handleKeyboardEvent = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            // TODO フォーカスが最下行だったら次ページに遷移
            // TODO フォーカスが先頭行だったら前ページに遷移
            // フォーカスのあるセルが Editable の場合は考慮が必要
        }
    };

    // データの整形
    useEffect(() => {
        const rows = data.map(convertRow);
        setGrid(rows);
    }, [convertRow, data]);

    return (
        <div className={classes.root} tabIndex={0} onKeyDown={handleKeyboardEvent}>
            <DataTableToolbar title={title} insert={handleInsert} />
            <ReactDataSheet
                data={pageItems}
                valueRenderer={(cell) => cell.value}
                sheetRenderer={(props) => (
                    <table className={props.className}>
                        <thead>
                            <tr>
                                {columns.map((column, index) => (
                                    <th
                                        className="cell read-only"
                                        key={`datasheet-header-cell-${index}`}
                                    >
                                        {column}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>{props.children}</tbody>
                    </table>
                )}
                cellRenderer={(params) => (
                    <DataCell current={current} onSelect={setCurrent} {...params} />
                )}
            />
            <TablePagination {...paginationProps} />
        </div>
    );
}

export default DataTable;
