import * as React from 'react';
import * as ReactNative from 'react-native';
import { IRenderData } from '@uifabricshared/foundation-composable';
import { IBackgroundColorTokens, IBorderTokens } from '@fluentui-native/tokens';
import { IFocusable } from '@fluentui-native/interactive-hooks';
import { IViewProps } from '@fluentui-native/adapters';

export const calloutName = 'RNFCallout';

/**
 * Properties and Tokens for fabric native Callout
 */

export type DirectionalHint =
  | 'leftTopEdge'
  | 'leftCenter'
  | 'leftBottomEdge'
  | 'topLeftEdge'
  | 'topAutoEdge'
  | 'topCenter'
  | 'topRightEdge'
  | 'rightTopEdge'
  | 'rightCenter'
  | 'rightBottomEdge'
  | 'bottonLeftEdge'
  | 'bottomAutoEdge'
  | 'bottomCenter'
  | 'bottomRightEdge';

export interface ICalloutTokens extends IBackgroundColorTokens, IBorderTokens {
  anchorRect?: ReactNative.ScreenRect;
  gapSpace?: number;
  minPadding?: number;
  directionalHint?: DirectionalHint;
}

export type ICalloutState = {
  /**
   * Do we need any state for Callout?
   */
};

export interface ICalloutProps extends ICalloutTokens {
  /**
   * A RefObject to access the IFocusable interface. Use this to access the public methods and properties of the component.
   */
  componentRef?: React.RefObject<IFocusable>;

  /**
   * Target node the callout uses for relative positioning; the anchor of the callout.
   */
  target?: React.ReactNode;

  /**
   * Visibility of the callout
   */
}

export type ICalloutSlotProps = {
  root: ICalloutProps;
  inner: IViewProps;
};

export type ICalloutRenderData = IRenderData<ICalloutSlotProps, ICalloutState>;

export interface ICalloutType {
  props: ICalloutProps;
  slotProps: ICalloutSlotProps;
  tokens: ICalloutTokens;
  state: ICalloutState;
}
