import { contextualMenuItemName, IContextualMenuItemType } from './ContextualMenuItem.types';
import { IComposeSettings } from '@uifabricshared/foundation-compose';

export const settings: IComposeSettings<IContextualMenuItemType> = [
  {
    tokens: {
      backgroundColor: 'buttonBackground',
      color: 'buttonText',
      borderColor: 'buttonBorder',
      borderWidth: 1,
      borderRadius: 2
    },
    root: {
      accessible: true,
      acceptsKeyboardFocus: true,
      accessibilityRole: 'menuitem',
      style: { display: 'flex', alignItems: 'flex-start', flexDirection: 'row', alignSelf: 'flex-start' }
    },
    content: {},
    icon: {},
    stack: {
      style: {
        display: 'flex',
        paddingStart: 16,
        paddingEnd: 16,
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        minHeight: 32,
        minWidth: 80,
        justifyContent: 'center'
      }
    },
    _precedence: ['hovered', 'focused', 'pressed', 'disabled'],
    _overrides: {
      disabled: {
        tokens: {
          backgroundColor: 'buttonBackgroundDisabled',
          color: 'buttonTextDisabled',
          borderColor: 'buttonBorderDisabled'
        }
      },
      hovered: {
        tokens: {
          backgroundColor: 'buttonBackgroundHovered',
          color: 'buttonTextHovered',
          borderColor: 'buttonBorderHovered'
        }
      },
      pressed: {
        tokens: {
          backgroundColor: 'buttonBackgroundPressed',
          color: 'buttonTextPressed',
          borderColor: 'buttonBorderPressed'
        }
      },
      focused: {
        tokens: {
          borderColor: 'buttonBorderFocused',
          color: 'buttonTextHovered'
        }
      }
    }
  },
  contextualMenuItemName
];
