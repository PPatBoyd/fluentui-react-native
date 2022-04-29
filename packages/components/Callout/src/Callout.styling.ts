import { UseStylingOptions, buildProps, Theme, TokenSettings } from '@fluentui-react-native/framework';
import { calloutName, CalloutSlotProps, CalloutProps, CalloutTokens } from './Callout.types';

export const defaultCalloutTokens: TokenSettings<CalloutTokens> = (theme: Theme) =>
  ({
    backgroundColor: theme.colors.bodyStandoutBackground,
    beakWidth: 20,
    borderColor: theme.colors.bodyFrameBackground,
    borderWidth: 1,
  } as CalloutTokens);

/**
 * tell the styling hook how to build up the tokens
 */
export const stylingSettings: UseStylingOptions<CalloutProps, CalloutSlotProps, CalloutTokens> = {
  tokens: [defaultCalloutTokens, calloutName],
  tokensThatAreAlsoProps: 'all',
  slotProps: {
    root: buildProps(
      (tokens: CalloutTokens) => ({
        directionalHint: 'bottomLeftEdge',
        style: {
          backgroundColor: tokens.backgroundColor,
          borderColor: tokens.borderColor,
          borderWidth: tokens.borderWidth,
          minPadding: tokens.minPadding,
        },
      }),
      ['backgroundColor', 'beakWidth', 'borderColor', 'borderWidth', 'gapSpace', 'minPadding'],
    ),
  },
};
