import AddWidgetIcon from '../../icons/Add';
import Dropdown, { DropdownContext } from '../ui/Dropdown';
import { Widget } from '../../widgets/types';
import { useContext } from 'react';
import 'twin.macro';
import AddWidgetButton from './AddWidgetButton';
import { useComponentsStore } from '../../stores/components';

interface Props {
    addWidget: (widget: Widget) => void;
}

const Content = ({ addWidget }: Props) => {
    const widgets = useComponentsStore((state) => state.widgets);
    const dropdown = useContext(DropdownContext);

    return (
        <div tw="w-96 grid grid-cols-2 gap-1 p-1">
            {widgets.map((widget) => (
                <AddWidgetButton
                    name={widget.defaultName}
                    key={widget.key}
                    icon={widget.icon}
                    onClick={() => {
                        dropdown.hide();
                        addWidget(widget);
                    }}
                    experimental={widget.key.startsWith('experimental/')}
                />
            ))}
        </div>
    );
};

const AddWidgetDropdown = ({ addWidget }: Props): JSX.Element => {
    return (
        <Dropdown
            key="add"
            tooltip="Add Widget"
            content={<Content addWidget={addWidget} />}
        >
            <AddWidgetIcon tw="w-4 h-4" data-tour="addWidget" />
        </Dropdown>
    );
};

export default AddWidgetDropdown;
