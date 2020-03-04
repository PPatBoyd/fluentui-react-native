import * as React from 'react';
import { View, requireNativeComponent } from 'react-native';
import { compose, IUseComposeStyling } from '@uifabricshared/foundation-compose';
import { backgroundColorTokens, borderTokens } from '@fluentui-native/tokens';
import { calloutName, ICalloutProps, ICalloutSlotProps, ICalloutType, ICalloutRenderData } from './Callout.types';
import { useViewCommandFocus } from '@fluentui-native/interactive-hooks';
import { mergeSettings } from '@uifabricshared/foundation-settings';
import { ISlots } from '@uifabricshared/foundation-composable';
import { filterViewProps } from '@fluentui-native/adapters';

const RCTCallout = requireNativeComponent('RCTCallout');

export const Callout = compose<ICalloutType>({
  displayName: calloutName,
  usePrepareProps: (props: ICalloutProps, useStyling: IUseComposeStyling<ICalloutType>) => {
    const { componentRef, ...rest } = props;
    const buttonRef = useViewCommandFocus(componentRef);

    const slotProps = mergeSettings<ICalloutSlotProps>(useStyling(props), {
      root: {
        ref: buttonRef,
        ...rest
      },
      inner: {}
    });

    return { slotProps };
  },
  render: (slots: ISlots<ICalloutSlotProps>, renderData: ICalloutRenderData, ...children: React.ReactNode[]) => {
    return (
      <slots.root>
        <slots.inner>{...children}</slots.inner>
      </slots.root>
    );
  },
  slots: {
    root: RCTCallout,
    inner: { slotType: View, filter: filterViewProps }
  },
  styles: {
    root: [backgroundColorTokens, borderTokens],
    inner: []
  }
});

export default Callout;
