import { useEffect } from 'react';
import ReactDataSheet from 'react-datasheet';
import { ComparedReference, GridElement } from './types';
import { compareReference } from './util';

interface DataCellProps extends ReactDataSheet.CellRendererProps<GridElement, string> {
    current?: ReactDataSheet.CellReference;
    onSelect?: (current?: ReactDataSheet.CellReference) => void;
}

const DataCell: React.FC<DataCellProps> = ({
    children,
    row,
    col,
    selected,
    attributesRenderer,
    current,
    onSelect,
    ...props
}) => {
    const attributes = attributesRenderer ? attributesRenderer(props.cell, row, col) : {};

    useEffect(() => {
        const location: ReactDataSheet.CellReference = {
            row,
            col,
        };

        if (selected) {
            if (compareReference(location, current) === ComparedReference.Before) {
                onSelect && onSelect(location);
            }
        } else {
            if (compareReference(location, current) === ComparedReference.Same) {
                onSelect && onSelect(undefined);
            }
        }
    }, [col, current, onSelect, row, selected]);

    return (
        <td
            className={props.className}
            onMouseDown={props.onMouseDown}
            onMouseOver={props.onMouseOver}
            onDoubleClick={props.onDoubleClick}
            // onTouchEnd={cellProps.onDoubleClick}
            onContextMenu={props.onContextMenu}
            colSpan={props.cell.colSpan}
            rowSpan={props.cell.rowSpan}
            style={props.style ?? {}}
            {...attributes}
        >
            {children}
        </td>
    );
};

export default DataCell;
