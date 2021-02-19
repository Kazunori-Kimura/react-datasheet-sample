import { defaultColor, isPoint, Point } from '../../models/solid';
import DataTable from './DataTable';
import { GridElement } from './types';
import { parseNumber } from './util';

interface PointTableProps {
    data: Point[];
    onChange?: (data: Point[]) => void;
}

const PointTable: React.FC<PointTableProps> = ({ data }) => {
    const convertRow = (item: Point | undefined | null, index: number): GridElement[] => {
        return [
            // id & name
            {
                value: item?.name ?? `point${index + 1}`,
                width: 100,
                itemId: item?.id ?? `point${index + 1}`,
            },
            // x
            {
                value: `${item?.x ?? 0}`,
                width: 100,
            },
            // y
            {
                value: `${item?.y ?? 0}`,
                width: 100,
            },
            // z
            {
                value: `${item?.z ?? 0}`,
                width: 100,
            },
            // TODO: color
            {
                value: `[${item?.color.r ?? 0}, ${item?.color.g ?? 0}, ${item?.color.b ?? 0}]`,
                readOnly: true,
                width: 100,
            },
        ];
    };

    const parseEntity = (row: GridElement[], index: number): Point => {
        const id = row[0].itemId ?? `p${index + 1}`;
        const name = row[0].value ?? `point${index + 1}`;
        const entity = data.find((solid) => solid.id === id);
        if (entity) {
            const newEntity = JSON.parse(JSON.stringify(entity)) as Point;
            newEntity.name = name;
            return newEntity;
        }

        return {
            id,
            name,
            x: parseNumber(row[1].value),
            y: parseNumber(row[2].value),
            z: parseNumber(row[3].value),
            color: defaultColor,
        };
    };

    return (
        <DataTable<Point>
            title="Point"
            data={data}
            columns={['name', 'x', 'y', 'z', 'color']}
            validator={isPoint}
            convertRow={convertRow}
            parseEntity={parseEntity}
        />
    );
};

export default PointTable;
