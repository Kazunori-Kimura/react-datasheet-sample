import { GridElement } from './types';
import { Solid, isSolid } from '../../models/solid';
import 'react-datasheet/lib/react-datasheet.css';
import DataTable from './DataTable';

interface SolidTableProps {
    data: Solid[];
    onChange?: (data: Solid[]) => void;
}

export const SolidTable: React.FC<SolidTableProps> = ({ data }) => {
    /**
     * Entityから行データを生成
     * @param item
     */
    const convertRow = (item: Solid | undefined | null, index: number): GridElement[] => {
        return [
            // id & name
            {
                value: item?.name ?? `solid${index + 1}`,
                width: 200,
                itemId: item?.id ?? `solid${index + 1}`,
            },
            // points
            {
                value: `${item?.points.length ?? '0'}`,
                readOnly: true,
                width: 200,
            },
            // lines
            {
                value: `${item?.lines.length ?? '0'}`,
                readOnly: true,
                width: 200,
            },
        ];
    };

    /**
     * 行データから Entity を生成
     * @param row
     * @param index
     */
    const parseEntity = (row: GridElement[], index: number): Solid => {
        const solidId = row[0].itemId;
        const solidName = row[0].value ?? `solid${index + 1}`;
        const entity = data.find((solid) => solid.id === solidId);
        if (entity) {
            const newEntity = JSON.parse(JSON.stringify(entity)) as Solid;
            newEntity.name = solidName;
            return newEntity;
        }

        return {
            id: solidName,
            name: solidName,
            points: [],
            lines: [],
        };
    };

    return (
        <DataTable<Solid>
            title="Solid"
            data={data}
            columns={['name', 'points', 'lines']}
            validator={isSolid}
            convertRow={convertRow}
            parseEntity={parseEntity}
        />
    );
};
