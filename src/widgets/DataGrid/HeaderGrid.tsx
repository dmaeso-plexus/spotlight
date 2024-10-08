import usePrevious from '../../hooks/usePrevious';
import * as React from 'react';
import { useCallback, useContext, useEffect } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import 'twin.macro';
import HeaderCell from './Cell/HeaderCell';
import { useColumnCount, useVisibleColumns } from './context/columnContext';
import { ResizingContext } from './context/resizeContext';

interface Props {
    height: number;
    width: number;
}

const HeaderGrid: React.ForwardRefRenderFunction<Grid, Props> = (
    { height, width },
    ref
) => {
    const rowHeight = useCallback(() => height, [height]);
    const columnCount = useColumnCount();

    const { getColumnWidth } = useContext(ResizingContext);

    const [displayedColumns] = useVisibleColumns();

    const previousColumnKeys = usePrevious(displayedColumns.map(({ key }) => key));

    useEffect(() => {
        // find first changed Index
        const index =
            previousColumnKeys?.findIndex(
                (key, index) => displayedColumns[index]?.key !== key
            ) || 0;
        if (index >= 0) {
            (ref as React.RefObject<Grid>)?.current?.resetAfterColumnIndex(index);
        }
    }, [displayedColumns, previousColumnKeys, ref]);

    return (
        <Grid
            columnCount={columnCount}
            columnWidth={getColumnWidth}
            rowCount={1}
            rowHeight={rowHeight}
            height={height}
            width={width}
            style={{
                overflow: 'hidden',
            }}
            ref={ref}
            tw="text-left text-xs"
        >
            {HeaderCell}
        </Grid>
    );
};

export default React.forwardRef(HeaderGrid);
