/** @jsx withSlots */
import { useViewCommandFocus } from '@fluentui-react-native/interactive-hooks';
import { compose, withSlots, UseSlots } from '@fluentui-react-native/framework';
import * as React from 'react';
import { findNodeHandle, Platform } from 'react-native';
import { stylingSettings } from './Callout.styling';
import { calloutName, CalloutProps, CalloutType } from './Callout.types';
import { ensureNativeComponent } from '@fluentui-react-native/component-cache';

const NativeCalloutView = Platform.select({
  macos: ensureNativeComponent('FRNCallout'),
  default: ensureNativeComponent('RCTCallout'), // win32
});

const NativeCallout: React.FunctionComponent<CalloutProps> = (props) => {
  const calloutRef = useViewCommandFocus(props.componentRef);
  const [nativeTarget, setNativeTarget] = React.useState<number | string | null>(null);

  React.useLayoutEffect(() => {
    if (typeof props.target === 'string') {
      // Pass string type `target` directly
      setNativeTarget(props.target);
    } else if (props.target?.current) {
      // Pass the tagID for a valid ref `target`
      setNativeTarget(findNodeHandle(props.target.current));
    }
  }, [props.target]);

  return <NativeCalloutView ref={calloutRef} target={nativeTarget ?? undefined} {...props} />;
};

export const Callout = compose<CalloutType>({
  displayName: calloutName,
  ...stylingSettings,
  slots: {
    root: NativeCallout,
  },

  useRender: (props: CalloutProps, useSlots: UseSlots<CalloutType>) => {
    const Slots = useSlots(props);
    return (final: CalloutProps) => {
      return <Slots.root {...final} />;
    };
  },
});

export default Callout;
