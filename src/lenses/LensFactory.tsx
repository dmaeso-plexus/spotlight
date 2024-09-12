import _ from 'lodash';
import { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { ErrorBoundary } from 'react-error-boundary';
import tw from 'twin.macro';
import LoadingIndicator from '../components/LoadingIndicator';
import useMemoWithPrevious from '../hooks/useMemoWithPrevious';
import { DataColumn, LensKey, LensSettings, Setter } from '../types';
import LensContext from './LensContext';
import useCellValues from './useCellValues';
import None from './None';
import { isLensCompatible, useComponentsStore } from '../stores/components';

interface Props {
    view: LensKey;
    columns: DataColumn[];
    rowIndex: number;
    syncKey: string;
    deferLoading?: boolean;
    settings: LensSettings;
    onChangeSettings: Setter<LensSettings>;
}

const Info = tw.div`w-full h-full flex items-center justify-center text-gray-800 italic text-sm p-2 text-center`;

const ErrorFallback = ({
    error,
    message,
}: {
    error: FallbackProps['error'];
    message?: string;
}) => {
    return (
        <div tw="w-full h-full flex justify-center items-center">
            <div tw="text-center font-bold uppercase text-sm text-gray-700">
                {message ? <p>{message}</p> : <p>Error Creating View.</p>}
                <p>{`${error.message}`}</p>
            </div>
        </div>
    );
};

const LensFactory: FunctionComponent<Props> = ({
    view,
    columns,
    rowIndex,
    syncKey,
    deferLoading = false,
    settings,
    onChangeSettings,
}) => {
    const columnKeys = useMemo(() => columns.map((c) => c.key), [columns]);
    const [values, problem] = useCellValues(rowIndex, columnKeys, deferLoading);

    const lenses = useComponentsStore((state) => state.lensesByKey);
    const LensComponent = lenses[view];

    const [sharedState, setSharedState] = useState<Record<string, unknown>>({});

    const urls = useMemoWithPrevious(
        (previousUrls: (string | undefined)[] | undefined) => {
            if (!values) return;
            if (previousUrls) return previousUrls;

            return values.map((value) => {
                if (value instanceof ArrayBuffer) {
                    const bufferView = new Uint8Array(value as ArrayBuffer);
                    const blob = new Blob([bufferView]);
                    return URL.createObjectURL(blob);
                } else {
                    return undefined;
                }
            });
        },
        [values],
        undefined
    );

    useEffect(() => {
        return () =>
            urls?.forEach((url) => {
                if (url) URL.revokeObjectURL(url);
            });
    }, [urls]);

    const fallbackRenderer = useCallback(
        ({ error }: FallbackProps) => (
            <ErrorFallback
                error={error}
                message={`Error Creating ${LensComponent.displayName}.`}
            />
        ),
        [LensComponent]
    );

    const types = columns.map((c) => c.type);
    const allEditable = columns.every((c) => c.editable);

    if (problem) {
        return <Info>{problem.title}</Info>;
    }
    if (!values || !urls) return <LoadingIndicator delay={100} />;
    if (!LensComponent) return <Info>View not found ({view})!</Info>;
    if (!isLensCompatible(LensComponent, types, allEditable))
        return <Info>Incompatible View ({view})</Info>;

    if (!LensComponent?.handlesNull && values.every(_.isNull)) return <None />;

    const context = { settings, onChangeSettings, sharedState, setSharedState };
    return (
        <LensContext.Provider value={context}>
            <ErrorBoundary fallbackRender={fallbackRenderer}>
                <LensComponent
                    url={urls[0]}
                    urls={urls}
                    value={values[0]}
                    values={values}
                    column={columns[0]}
                    columns={columns}
                    rowIndex={rowIndex}
                    syncKey={syncKey}
                />
            </ErrorBoundary>
        </LensContext.Provider>
    );
};

export default LensFactory;
