import ArrayIcon from '../icons/Array';
import AudioIcon from '../icons/Audio';
import CalendarIcon from '../icons/Calendar';
import CategoricalIcon from '../icons/Categorical';
import EmbeddingIcon from '../icons/Embedding';
import ImageIcon from '../icons/Image';
import MeshIcon from '../icons/Mesh';
import NumberIcon from '../icons/Number';
import QuestionIcon from '../icons/Question';
import Sequence1DIcon from '../icons/Sequence1D';
import TextIcon from '../icons/Text';
import VideoIcon from '../icons/Video';
import WindowIcon from '../icons/Window';
import BoundingBoxIcon from '../icons/BoundingBox';
import SequenceIcon from '../icons/Sequence';
import { DataType } from '../datatypes';

const ICONS: Record<DataType['kind'], JSX.Element> = {
    float: <NumberIcon />,
    int: <NumberIcon />,
    bool: <QuestionIcon />,
    str: <TextIcon />,
    array: <ArrayIcon />,
    datetime: <CalendarIcon />,
    Sequence1D: <Sequence1DIcon />,
    Image: <ImageIcon />,
    Embedding: <EmbeddingIcon />,
    Mesh: <MeshIcon />,
    Audio: <AudioIcon />,
    Video: <VideoIcon />,
    Window: <WindowIcon />,
    BoundingBox: <BoundingBoxIcon />,
    Category: <CategoricalIcon />,
    Sequence: <SequenceIcon />,
    Unknown: <QuestionIcon />,
};

interface Props {
    type: DataType;
}
const DataTypeIcon = ({ type }: Props): JSX.Element => ICONS[type.kind];

export default DataTypeIcon;
