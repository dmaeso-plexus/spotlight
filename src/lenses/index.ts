import ArrayLens from './ArrayLens';
import AudioLens from './AudioLens';
import HtmlLens from './HtmlLens';
import ImageLens from './ImageLens';
import MarkdownLens from './MarkdownLens';
import MeshLens from './MeshLens';
import SafeHtmlLens from './SafeHtmlLens';
import ScalarLens from './ScalarLens';
import SequenceLens from './SequenceLens';
import SpectrogramLens from './SpectrogramLens';
import TextLens from './TextLens';
import VideoLens from './VideoLens';
import RougeScoreLens from './RougeScoreLens';
import BLEUScoreLens from './BLEUScoreLens';
import BoundingBoxLens from './BoundingBoxLens';

export const ALL_LENSES = [
    ArrayLens,
    AudioLens,
    SpectrogramLens,
    VideoLens,
    ImageLens,
    MeshLens,
    SequenceLens,
    TextLens,
    SafeHtmlLens,
    HtmlLens,
    MarkdownLens,
    ScalarLens,
    RougeScoreLens,
    BLEUScoreLens,
    BoundingBoxLens,
];
