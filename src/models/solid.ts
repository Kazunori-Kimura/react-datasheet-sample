export interface Color {
    r: number;
    g: number;
    b: number;
}

export const isColor = (item: unknown): item is Color => {
    if (item && typeof item === 'object') {
        const temp = item as Record<string, unknown>;
        return (
            typeof temp.r === 'number' && typeof temp.g === 'number' && typeof temp.b === 'number'
        );
    }
    return false;
};

export interface Point {
    id: string;
    name: string;
    x: number;
    y: number;
    z: number;
    color: Color;
}

export const isPoint = (item: unknown): item is Point => {
    if (item && typeof item === 'object') {
        const temp = item as Record<string, unknown>;
        return (
            typeof temp.id === 'string' &&
            typeof temp.name === 'string' &&
            typeof temp.x === 'number' &&
            typeof temp.y === 'number' &&
            typeof temp.z === 'number' &&
            isColor(temp.color)
        );
    }
    return false;
};

export interface Line {
    id: string;
    name: string;
    start: string;
    end: string;
    color: Color;
}

export const isLine = (item: unknown): item is Line => {
    if (item && typeof item === 'object') {
        const temp = item as Record<string, unknown>;
        return (
            typeof temp.id === 'string' &&
            typeof temp.name === 'string' &&
            typeof temp.start === 'string' &&
            typeof temp.end === 'string' &&
            isColor(temp.color)
        );
    }
    return false;
};

export interface Solid {
    id: string;
    name: string;
    points: Point[];
    lines: Line[];
}

export const isSolid = (item: unknown): item is Solid => {
    if (item && typeof item === 'object') {
        const temp = item as Record<string, unknown>;
        return (
            typeof temp.id === 'string' &&
            typeof temp.name === 'string' &&
            Array.isArray(temp.points) &&
            Array.isArray(temp.lines) &&
            temp.points.every(isPoint) &&
            temp.lines.every(isLine)
        );
    }
    return false;
};

export const defaultColor: Color = {
    r: 0,
    g: 0,
    b: 0,
};

export const data: Solid[] = [
    // 立方体
    {
        id: 'solid1',
        name: 'solid1',
        points: [
            {
                id: 'p1',
                name: 'point',
                x: 0,
                y: 0,
                z: 0,
                color: defaultColor,
            },
            {
                id: 'p2',
                name: 'point',
                x: 6,
                y: 0,
                z: 0,
                color: defaultColor,
            },
            {
                id: 'p3',
                name: 'point',
                x: 6,
                y: 0,
                z: 6,
                color: defaultColor,
            },
            {
                id: 'p4',
                name: 'point',
                x: 0,
                y: 0,
                z: 6,
                color: defaultColor,
            },
            {
                id: 'p5',
                name: 'point',
                x: 0,
                y: 6,
                z: 0,
                color: defaultColor,
            },
            {
                id: 'p6',
                name: 'point',
                x: 6,
                y: 6,
                z: 0,
                color: defaultColor,
            },
            {
                id: 'p7',
                name: 'point',
                x: 6,
                y: 6,
                z: 6,
                color: defaultColor,
            },
            {
                id: 'p8',
                name: 'point',
                x: 0,
                y: 6,
                z: 6,
                color: defaultColor,
            },
        ],
        lines: [
            {
                id: 'l1',
                name: 'line',
                start: 'p1',
                end: 'p2',
                color: defaultColor,
            },
            {
                id: 'l2',
                name: 'line',
                start: 'p2',
                end: 'p3',
                color: defaultColor,
            },
            {
                id: 'l3',
                name: 'line',
                start: 'p3',
                end: 'p4',
                color: defaultColor,
            },
            {
                id: 'l4',
                name: 'line',
                start: 'p1',
                end: 'p4',
                color: defaultColor,
            },
            {
                id: 'l5',
                name: 'line',
                start: 'p1',
                end: 'p5',
                color: defaultColor,
            },
            {
                id: 'l6',
                name: 'line',
                start: 'p2',
                end: 'p6',
                color: defaultColor,
            },
            {
                id: 'l7',
                name: 'line',
                start: 'p3',
                end: 'p7',
                color: defaultColor,
            },
            {
                id: 'l8',
                name: 'line',
                start: 'p4',
                end: 'p8',
                color: defaultColor,
            },
            {
                id: 'l9',
                name: 'line',
                start: 'p5',
                end: 'p6',
                color: defaultColor,
            },
            {
                id: 'l10',
                name: 'line',
                start: 'p6',
                end: 'p7',
                color: defaultColor,
            },
            {
                id: 'l11',
                name: 'line',
                start: 'p7',
                end: 'p8',
                color: defaultColor,
            },
            {
                id: 'l12',
                name: 'line',
                start: 'p5',
                end: 'p8',
                color: defaultColor,
            },
        ],
    },
];
