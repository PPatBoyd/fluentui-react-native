import { calloutName, ICalloutType } from './Callout.types';
import { IComposeSettings } from '@uifabricshared/foundation-compose';

export const settings: IComposeSettings<ICalloutType> = [
  {
    tokens: {
      backgroundColor: 'bodyFrameBackground',
      borderColor: 'bodyFrameDivider',
      gapSpace: 0,
      minPadding: 0,
      anchorRect: { screenX: 0, screenY: 0, width: 0, height: 0 },
      directionalHint: 'bottomAutoEdge'
    }
  },
  calloutName
];
