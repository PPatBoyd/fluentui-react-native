import { contextualMenuName, ContextualMenuType } from './ContextualMenu.types';
import { IComposeSettings } from '@uifabricshared/foundation-compose';
import { I18nManager } from 'react-native';

export const settings: IComposeSettings<ContextualMenuType> = [
  {
    root: {
      directionalHint: I18nManager.isRTL ? 'bottomRightEdge' : 'bottomLeftEdge',
    },
    container: {
      style: {
        padding: 5,
      },
    },
  },
  contextualMenuName,
];
