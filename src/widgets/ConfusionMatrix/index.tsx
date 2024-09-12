import 'twin.macro';
import WidgetContainer from '../../components/ui/WidgetContainer';
import WidgetContent from '../../components/ui/WidgetContent';
import WidgetMenu from '../../components/ui/WidgetMenu';
import type { Widget } from '../types';
import { Button, useDataset, useWidgetConfig } from '../../lib';
import GridIcon from '../../icons/Grid';
import FilterIcon from '../../icons/Filter';
import FilterOffIcon from '../../icons/FilterOff';
import Matrix from './Matrix';
import { useCallback } from 'react';
import type { Cell } from './types';
import { useColumns, useData } from './hooks';
import Select from '../../components/ui/Select';

const COMPATIBLE_DATA_KINDS = ['int', 'Category', 'str', 'bool'];

const ConfusionMatrix: Widget = () => {
    const [xKey, setXKey] = useWidgetConfig<string>('xColumn');
    const [yKey, setYKey] = useWidgetConfig<string>('yColumn');

    const columns = useColumns();
    const compatibleColumns = columns.filter((c) =>
        COMPATIBLE_DATA_KINDS.includes(c.type.kind)
    );
    const compatibleColumnKeys = compatibleColumns.map((c) => c.key);
    const xColumn = compatibleColumns.filter((c) => c.key === xKey)[0];
    const yColumn = compatibleColumns.filter((c) => c.key === yKey)[0];

    const [filtered, setFiltered] = useWidgetConfig('filter', true);
    const data = useData(xColumn, yColumn, filtered);

    const toggleFilter = () => setFiltered((value) => !value);

    const handleHoverCell = useCallback((cell?: Cell) => {
        if (!cell) return;
        useDataset.getState().highlightRows(cell.bucket.rows);
    }, []);

    const handleClickCell = useCallback((cell?: Cell) => {
        if (!cell) return;
        useDataset.getState().selectRows(cell.bucket.rows);
    }, []);

    return (
        <WidgetContainer>
            <WidgetMenu>
                <div tw="font-bold text-gray-700 px-1">X</div>
                <div tw="w-32 h-full flex border-x border-gray-400">
                    <Select
                        options={compatibleColumnKeys}
                        onChange={setXKey}
                        value={xKey}
                        variant="inset"
                    />
                </div>
                <div tw="font-bold text-gray-700 px-1">Y</div>
                <div tw="w-32 h-full flex border-x border-gray-400">
                    <Select
                        options={compatibleColumnKeys}
                        onChange={setYKey}
                        value={yKey}
                        variant="inset"
                    />
                </div>
                <div tw="flex-grow" />
                <Button
                    onClick={toggleFilter}
                    tooltip={filtered ? 'show unfiltered' : 'hide unfiltered'}
                >
                    {filtered ? <FilterOffIcon /> : <FilterIcon />}
                </Button>
            </WidgetMenu>
            <WidgetContent tw="bg-white overflow-hidden">
                <Matrix
                    data={data}
                    onHoverCell={handleHoverCell}
                    onClickCell={handleClickCell}
                />
            </WidgetContent>
        </WidgetContainer>
    );
};

ConfusionMatrix.key = 'ConfusionMatrix';
ConfusionMatrix.defaultName = 'Confusion Matrix';
ConfusionMatrix.icon = GridIcon;

export default ConfusionMatrix;
