import * as React from 'react';
import { ScreenRect, Text, View, Switch, Picker } from 'react-native';
import { Button, Callout, Separator, IFocusable, RestoreFocusEvent, Checkbox, DismissBehaviors } from '@fluentui/react-native';
import { CALLOUT_TESTPAGE } from './consts';
import { Test, TestSection, PlatformStatus } from '../Test';

const standardCallout: React.FunctionComponent<{}> = () => {
  const [showStandardCallout, setShowStandardCallout] = React.useState(false);
  const [isStandardCalloutVisible, setIsStandardCalloutVisible] = React.useState(false);

  const [shouldSetInitialFocus, setShouldSetInitialFocus] = React.useState(true);
  const onInitialFocusChange = React.useCallback((value) => setShouldSetInitialFocus(value), []);

  const [customRestoreFocus, setCustomRestoreFocus] = React.useState(false);
  const onRestoreFocusChange = React.useCallback((value) => setCustomRestoreFocus(value), []);

  const [isBeakVisible, setIsBeakVisible] = React.useState(false);
  const onIsBeakVisibleChange = React.useCallback((value) => setIsBeakVisible(value), []);

  const [preventDismissOnKeyDown, setPreventDismissOnKeyDown] = React.useState(false);
  const [preventDismissOnClickOutside, setPreventDismissOnClickOutside] = React.useState(false);
  const [calloutDismissBehaviors, setDismissBehaviors] = React.useState<DismissBehaviors[]>();

  const reEvaluateDismissBehaviors = React.useCallback(() => {
    const dismissBehaviors: DismissBehaviors[] = [];
    if (preventDismissOnClickOutside) {
      dismissBehaviors.push('preventDismissOnClickOutside');
    }
    if (preventDismissOnKeyDown) {
      dismissBehaviors.push('preventDismissOnKeyDown');
    }
    if (dismissBehaviors.length > 0) {
      setDismissBehaviors(dismissBehaviors);
    }
  }, []);

  const onPreventDismissOnKeyDownChange = React.useCallback((value) => {
    setPreventDismissOnKeyDown(value);
    reEvaluateDismissBehaviors();
  }, []);

  const onPreventDismissOnClickOutsideChange = React.useCallback((value) => {
    setPreventDismissOnClickOutside(value);
    reEvaluateDismissBehaviors();
  }, []);

  const redTargetRef = React.useRef<View>(null);
  const blueTargetRef = React.useRef<View>(null);
  const greenTargetRef = React.useRef<View>(null);
  const decoyBtn1Ref = React.useRef<IFocusable>(null);
  const decoyBtn2Ref = React.useRef<IFocusable>(null);
  const [anchorRef, setAnchorRef] = React.useState(redTargetRef);

  const toggleShowStandardCallout = React.useCallback(() => {
    setShowStandardCallout(!showStandardCallout);

    // Unmounting a callout does not invoke onDismiss; onDismiss is only invoked
    // for dismissals generated by the native app.  When toggling to 'show',
    // the isVisible state will be corrected to 'true' by the onShow callback.
    setIsStandardCalloutVisible(false);
  }, [showStandardCallout, setIsStandardCalloutVisible, setShowStandardCallout]);

  const toggleCalloutRef = React.useCallback(() => {
    // Cycle the target ref between the RGB target views
    setAnchorRef(anchorRef === redTargetRef ? greenTargetRef : anchorRef === greenTargetRef ? blueTargetRef : redTargetRef);
  }, [anchorRef, setAnchorRef]);

  const onShowStandardCallout = React.useCallback(() => {
    setIsStandardCalloutVisible(true);
  }, [setIsStandardCalloutVisible]);

  const onDismissStandardCallout = React.useCallback(() => {
    setIsStandardCalloutVisible(false);

    // setting the internal state to false will instigate unmounting the
    // zombie Callout control.
    setShowStandardCallout(false);
  }, [setIsStandardCalloutVisible, setShowStandardCallout]);

  const onRestoreFocusStandardCallout = React.useCallback(
    (restoreFocusEvent: RestoreFocusEvent) => {
      if (restoreFocusEvent?.nativeEvent?.containsFocus) {
        decoyBtn1Ref?.current?.focus?.();
      } else {
        decoyBtn2Ref?.current?.focus?.();
      }
    },
    [decoyBtn1Ref, decoyBtn2Ref],
  );

  const colorDefault: string = 'default';
  const colorSelections: string[] = [colorDefault, 'red', 'green', 'blue'];

  const [selectedBackgroundColor, setSelectedBackgroundColor] = React.useState<string | undefined>(undefined);
  const [selectedBorderColor, setSelectedBorderColor] = React.useState<string | undefined>(undefined);

  const borderWidthDefault: string = 'default (1)';
  const borderWidthSelections: (number | string)[] = ['default (1)', 2, 4, 10];

  const [selectedBorderWidth, setSelectedBorderWidth] = React.useState<number | undefined>(undefined);

  return (
    <View>
      <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
        <View style={{ flexDirection: 'column', paddingHorizontal: 5 }}>
          <View style={{ flexDirection: 'row' }}>
            <Switch value={shouldSetInitialFocus} onValueChange={onInitialFocusChange} />
            <Text>Set Initial Focus</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Switch value={customRestoreFocus} onValueChange={onRestoreFocusChange} />
            <Text>Customize Restore Focus</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Switch value={isBeakVisible} onValueChange={onIsBeakVisibleChange} />
            <Text>Beak Visible</Text>
          </View>

          <Text>Dismiss Behaviors</Text>
          <Checkbox onChange={onPreventDismissOnKeyDownChange} label="Prevent Dismiss On Key Down" />
          <Checkbox onChange={onPreventDismissOnClickOutsideChange} label="Prevent Dismiss On Click Outside" />

          <Picker
            prompt="Background Color"
            selectedValue={selectedBackgroundColor || colorDefault}
            onValueChange={(color) => setSelectedBackgroundColor(color === colorDefault ? undefined : color)}
          >
            {colorSelections.map((color, index) => (
              <Picker.Item label={color} key={index} value={color} />
            ))}
          </Picker>

          <Picker
            prompt="Border Color"
            selectedValue={selectedBorderColor || colorDefault}
            onValueChange={(color) => setSelectedBorderColor(color === colorDefault ? undefined : color)}
          >
            {colorSelections.map((color, index) => (
              <Picker.Item label={color} key={index} value={color} />
            ))}
          </Picker>

          <Picker
            prompt="Border Width"
            selectedValue={selectedBorderWidth || borderWidthDefault}
            onValueChange={(width) => setSelectedBorderWidth(width === borderWidthDefault ? undefined : width)}
          >
            {borderWidthSelections.map((width, index) => (
              <Picker.Item label={width.toString()} key={index} value={width} />
            ))}
          </Picker>
        </View>

        <Separator vertical />

        <View style={{ flexDirection: 'column', paddingHorizontal: 5 }}>
          <Button content="Press for Callout" onClick={toggleShowStandardCallout} />
          <Text>
            <Text>Visibility: </Text>
            {isStandardCalloutVisible ? <Text style={{ color: 'green' }}>Visible</Text> : <Text style={{ color: 'red' }}>Not Visible</Text>}
          </Text>
        </View>

        <Separator vertical />

        <View style={{ flexDirection: 'column', paddingHorizontal: 5 }}>
          <View ref={redTargetRef} style={{ height: 20, width: 20, backgroundColor: 'red', padding: 5 }} />
          <View ref={greenTargetRef} style={{ height: 20, width: 20, backgroundColor: 'green', padding: 5 }} />
          <View ref={blueTargetRef} style={{ height: 20, width: 20, backgroundColor: 'blue', padding: 5 }} />
        </View>
      </View>

      <Separator />

      <View style={{ paddingVertical: 5 }}>
        <Button componentRef={decoyBtn1Ref} content="Custom reFocus w/ focus in Callout" />
        <Button componentRef={decoyBtn2Ref} content="Custom reFocus w/o focus in Callout" />
      </View>

      {showStandardCallout && (
        <Callout
          {...{
            target: anchorRef,
            onDismiss: onDismissStandardCallout,
            onShow: onShowStandardCallout,
            ...(customRestoreFocus && { onRestoreFocus: onRestoreFocusStandardCallout }),
            accessibilityLabel: 'Standard Callout',
            setInitialFocus: shouldSetInitialFocus,
            isBeakVisible: isBeakVisible,
            ...(selectedBorderColor && { borderColor: selectedBorderColor }),
            ...(selectedBackgroundColor && { backgroundColor: selectedBackgroundColor }),
            ...(selectedBorderWidth && { borderWidth: selectedBorderWidth }),
            ...(calloutDismissBehaviors && { dismissBehaviors: calloutDismissBehaviors }),
          }}
        >
          <View style={{ padding: 20 }}>
            <Button content="click to change anchor" onClick={toggleCalloutRef} />
          </View>
        </Callout>
      )}
    </View>
  );
};

const customCallout: React.FunctionComponent<{}> = () => {
  const [showCustomizedCallout, setShowCustomizedCallout] = React.useState(false);
  const [isCustomizedCalloutVisible, setIsCustomizedCalloutVisible] = React.useState(false);

  const toggleShowCustomizedCallout = React.useCallback(() => {
    setShowCustomizedCallout(!showCustomizedCallout);

    // Unmounting a callout does not invoke onDismiss; onDismiss is only invoked
    // for dismissals generated by the native app.  When toggling to 'show',
    // the isVisible state will be corrected to 'true' by the onShow callback.
    setIsCustomizedCalloutVisible(false);
  }, [showCustomizedCallout, setIsCustomizedCalloutVisible, setShowCustomizedCallout]);

  const onShowCustomizedCallout = React.useCallback(() => {
    setIsCustomizedCalloutVisible(true);
  }, [setIsCustomizedCalloutVisible]);

  const onDismissCustomizedCallout = React.useCallback(() => {
    setIsCustomizedCalloutVisible(false);

    // setting the internal state to false will instigate unmounting the
    // zombie Callout control.
    setShowCustomizedCallout(false);
  }, [setIsCustomizedCalloutVisible, setShowCustomizedCallout]);

  const myRect: ScreenRect = { screenX: 10, screenY: 10, width: 100, height: 100 };

  return (
    <View>
      <View style={{ flexDirection: 'column', paddingVertical: 5 }}>
        <Button content="Press for Callout" onClick={toggleShowCustomizedCallout} />
        <Text selectable={true}>
          <Text>Visibility: </Text>
          {isCustomizedCalloutVisible ? <Text style={{ color: 'green' }}>Visible</Text> : <Text style={{ color: 'red' }}>Not Visible</Text>}
        </Text>
      </View>

      {showCustomizedCallout && (
        <Callout
          anchorRect={myRect}
          onDismiss={onDismissCustomizedCallout}
          onShow={onShowCustomizedCallout}
          accessibilityLabel="Customized Callout"
          accessibilityRole="alert"
          accessibilityOnShowAnnouncement="Be informed that a customized callout has been opened."
        >
          <View style={{ padding: 20, borderWidth: 2, borderColor: 'black' }}>
            <Text>just some text so it does not take focus and is not empty.</Text>
          </View>
        </Callout>
      )}
    </View>
  );
};

const calloutSections: TestSection[] = [
  {
    name: 'Standard Usage',
    testID: CALLOUT_TESTPAGE,
    component: standardCallout,
  },
  {
    name: 'Customized Usage',
    component: customCallout,
  },
];

export const CalloutTest: React.FunctionComponent<{}> = () => {
  const status: PlatformStatus = {
    win32Status: 'Beta',
    uwpStatus: 'Backlog',
    iosStatus: 'Backlog',
    macosStatus: 'Backlog',
    androidStatus: 'Backlog',
  };

  const description = 'A callout is an anchored tip that can be used to teach people or guide them through the app without blocking them.';

  return <Test name="Callout Test" description={description} sections={calloutSections} status={status}></Test>;
};
