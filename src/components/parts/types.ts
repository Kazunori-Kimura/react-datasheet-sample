import ReactDataSheet from 'react-datasheet';

/**
 * セル型
 */
export interface GridElement extends ReactDataSheet.Cell<GridElement, string> {
    value: string | null;
    itemId?: string;
}

/**
 * セル位置の比較結果
 */
export enum ComparedReference {
    Before = -1,
    Same = 0,
    After = 1,
}

/**
 * 選択範囲
 */
export interface Selection {
    start: ReactDataSheet.CellReference;
    end: ReactDataSheet.CellReference;
}
