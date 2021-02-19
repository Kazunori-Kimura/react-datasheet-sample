import ReactDataSheet from 'react-datasheet';
import { ComparedReference, Selection } from './types';

/**
 * 数値変換
 * @param value
 */
export const parseNumber = (value: string | undefined | null): number => {
    if (value) {
        const ret = parseFloat(value);
        if (isNaN(ret)) {
            return 0;
        }
        return ret;
    }
    return 0;
};

/**
 * セルの位置を比較する
 * c1 のほうが c2 より左上にある: -1 (ComparedReference.Before)
 * c1 と c2 が同じ位置: 0 (ComparedReference.Same)
 * c1 のほうが c2 より右下にある: 1 (ComparedReference.After)
 *
 * c2 が undefined の場合は常に ComparedReference.Before
 */
export const compareReference = (
    c1: ReactDataSheet.CellReference,
    c2?: ReactDataSheet.CellReference
): ComparedReference => {
    if (c2) {
        if (c1.row === c2.row && c1.col === c2.col) {
            return ComparedReference.Same;
        }
        if (c1.row > c2.row) {
            return ComparedReference.After;
        } else if (c1.row === c2.row && c1.col > c2.col) {
            return ComparedReference.After;
        }
    }
    return ComparedReference.Before;
};

/**
 * セルが指定した範囲内かどうかをチェックする
 * @param cell
 * @param range
 */
export const withinRange = (cell: ReactDataSheet.CellReference, range?: Selection): boolean => {
    if (range) {
        return (
            range.start.row <= cell.row &&
            cell.row <= range.end.row &&
            range.start.col <= cell.col &&
            cell.col <= range.end.col
        );
    }
    return false;
};

/**
 * セルの集合から範囲を生成する
 * @param cells
 */
export const makeRange = (...cells: ReactDataSheet.CellReference[]): Selection | undefined => {
    if (cells.length === 0) {
        return undefined;
    }
    const cell = { ...cells[0] };
    const range = {
        start: cell,
        end: cell,
    };

    // もっと効率のいいやり方がありそうだが...
    for (let index = 1; index < cells.length; index++) {
        const cell = { ...cells[index] };
        if (compareReference(cell, range.start) === ComparedReference.Before) {
            range.start = cell;
        } else if (compareReference(cell, range.end) === ComparedReference.After) {
            range.end = cell;
        }
    }

    return range;
};
