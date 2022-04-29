import { calloutName, CalloutType } from './Callout.types';
import { IComposeSettings } from '@uifabricshared/foundation-compose';

export const settings: IComposeSettings<CalloutType> = [
  {
    tokens: {
      backgroundColor: 'bodyStandoutBackground',
      beakWidth: 20,
      borderColor: 'bodyFrameBackground',
      borderWidth: 1,
      gapSpace: 0,
      minPadding: 0,
    },
    root: {
      directionalHint: 'bottomLeftEdge',
    },
  },
  calloutName,
];
