import { FunctionComponent, useState, useCallback, useMemo, useRef, MutableRefObject } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { ViewWin32 } from '@office-iss/react-native-win32';
import {
  ButtonV1 as Button,
  Callout,
  Separator,
  IFocusable,
  RestoreFocusEvent,
  DismissBehaviors,
  CalloutProps,
  MenuButtonItemProps,
} from '@fluentui/react-native';
import { GridOfButtons } from '../Common/GridOfButtons';
import { CALLOUT_TESTPAGE } from './consts';
import { Test, TestSection, PlatformStatus } from '../Test';
import { E2ECalloutTest } from './CalloutE2ETest';
import { fluentTesterStyles } from '../Common/styles';
import React from 'react';
import { calloutTestStyles } from './styles';
import { SwitchWithLabel } from '../Common/SwitchWithLabel';
import { MenuPicker } from '../Common/MenuPicker';

const ConditionalScrollView: FunctionComponent<{ condition: boolean }> = (props) => {
  return props.condition ? (
    <ScrollView
      contentContainerStyle={[fluentTesterStyles.scrollViewStyle, { flex: 1 }]}
      style={{ flex: 1, minWidth: 200, minHeight: 200 }} // The minWidth and minHeight props here are crutches while the initial size is wrong
    >
      {props.children}
    </ScrollView>
  ) : (
    <>{props.children}</>
  );
};

const PaddedVerticalSeparator = () => <Separator vertical style={{ margin: 5 }} />;

const CustomizedCallout = Callout.customize({ gapSpace: 10 });

interface UseCustomizedCalloutProps extends CalloutProps {
  useCustomized: boolean;
}

const UseCustomizedCallout: FunctionComponent<UseCustomizedCalloutProps> = (props) => {
  const { useCustomized, ...rest } = props;
  if (useCustomized) {
    return <CustomizedCallout {...rest}>{props.children}</CustomizedCallout>;
  } else {
    return <Callout {...rest}>{props.children}</Callout>;
  }
};

const CalloutContentGrid: FunctionComponent = () => {
  const [gridHeight, setGridHeight] = useState(3);
  const [gridWidth, setGridWidth] = useState(3);

  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <View>
          <Button onClick={() => setGridWidth(gridWidth + 1)}>+ column</Button>
          <Button onClick={() => setGridWidth(gridWidth > 0 ? gridWidth - 1 : 0)}>- column</Button>
        </View>
        <View>
          <Button onClick={() => setGridHeight(gridHeight + 1)}>+ row</Button>
          <Button onClick={() => setGridHeight(gridHeight > 0 ? gridHeight - 1 : 0)}>- row</Button>
        </View>
      </View>
      <View style={{ flex: 1, borderWidth: 4, borderRadius: 2, borderColor: 'olive' }}>
        {GridOfButtons({
          gridWidth: gridWidth,
          gridHeight: gridHeight,
        })}
      </View>
    </>
  );
};

const CalloutTestPage: FunctionComponent = () => {
  const [showStandardCallout, setShowStandardCallout] = useState(false);
  const [isStandardCalloutVisible, setIsStandardCalloutVisible] = useState(false);
  const [openCalloutOnHoverAnchor, setOpenCalloutOnHoverAnchor] = useState(false);
  const [shouldSetInitialFocus, setShouldSetInitialFocus] = useState(true);
  const [customRestoreFocus, setCustomRestoreFocus] = useState(false);
  const [isBeakVisible, setIsBeakVisible] = useState(false);
  const [preventDismissOnKeyDown, setPreventDismissOnKeyDown] = useState(false);
  const [preventDismissOnClickOutside, setPreventDismissOnClickOutside] = useState(false);
  const [showScrollViewCallout, setShowScrollViewCallout] = useState(false);
  const [useCustomizedGapCallout, setUseCustomizedGapCallout] = useState(false);
  const [calloutDismissBehaviors, setDismissBehaviors] = useState<DismissBehaviors[]>([]);

  const onDismissBehaviorToggled = useCallback(
    (addedElseRemoved: any, dismissBehavior: DismissBehaviors) => {
      if (addedElseRemoved) {
        setDismissBehaviors(calloutDismissBehaviors.concat(dismissBehavior));
      } else {
        setDismissBehaviors(
          calloutDismissBehaviors.filter((value) => {
            value != dismissBehavior;
          }),
        );
      }
    },
    [calloutDismissBehaviors],
  );

  const onPreventDismissOnKeyDownChange = useCallback(
    (value) => {
      setPreventDismissOnKeyDown(value);
      onDismissBehaviorToggled(value, 'preventDismissOnKeyDown');
    },
    [onDismissBehaviorToggled],
  );

  const onPreventDismissOnClickOutsideChange = useCallback(
    (value) => {
      setPreventDismissOnClickOutside(value);
      onDismissBehaviorToggled(value, 'preventDismissOnClickOutside');
    },
    [onDismissBehaviorToggled],
  );

  const anchorTargetsSize = 3;
  const [anchorTargetIndex, setAnchorTargetIndex] = useState(0);
  const memoAnchorTargetRefs = React.useMemo(
    () =>
      Array(anchorTargetsSize)
        .fill(null)
        .map(() => React.createRef<View>()),
    [anchorTargetsSize],
  );

  const decoyBtn1Ref = useRef<IFocusable>(null);
  const decoyBtn2Ref = useRef<IFocusable>(null);

  const [anchorRef, setAnchorRef] = useState(memoAnchorTargetRefs[0]);
  const toggleCalloutAnchorRef = useCallback(() => {
    // Cycle the target ref between the RGB target views
    setAnchorTargetIndex(anchorTargetIndex + (1 % anchorTargetsSize));
    setAnchorRef(memoAnchorTargetRefs[anchorTargetIndex]);
  }, [anchorTargetIndex, memoAnchorTargetRefs]);

  const toggleShowStandardCallout = useCallback(() => {
    if (openCalloutOnHoverAnchor) return;

    setShowStandardCallout(!showStandardCallout);

    // Unmounting a callout does not invoke onDismiss; onDismiss is only invoked
    // for dismissals generated by the native app.  When toggling to 'show',
    // the isVisible state will be corrected to 'true' by the onShow callback.
    setIsStandardCalloutVisible(false);
  }, [openCalloutOnHoverAnchor, showStandardCallout, setIsStandardCalloutVisible, setShowStandardCallout]);

  const setShowStandardCalloutOnHoverAnchor = useCallback(
    (show: boolean, hoverAnchorRef: MutableRefObject<View>) => {
      if (!openCalloutOnHoverAnchor || hoverAnchorRef != anchorRef) return;

      setShowStandardCallout(show);
    },
    [anchorRef, openCalloutOnHoverAnchor],
  );

  const onDismissStandardCallout = useCallback(() => {
    setIsStandardCalloutVisible(false);

    // setting the internal state to false will instigate unmounting the
    // zombie Callout control.
    setShowStandardCallout(false);
  }, [setIsStandardCalloutVisible, setShowStandardCallout]);

  const onRestoreFocusStandardCallout = useCallback(
    (restoreFocusEvent: RestoreFocusEvent) => {
      if (restoreFocusEvent?.nativeEvent?.containsFocus) {
        decoyBtn1Ref?.current?.focus?.();
      } else {
        decoyBtn2Ref?.current?.focus?.();
      }
    },
    [decoyBtn1Ref, decoyBtn2Ref],
  );

  const defaultString = 'default';
  const colorSelections: string[] = [defaultString, 'red', 'green', 'blue'];

  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState<string>(colorSelections[0]);
  const [selectedBorderColor, setSelectedBorderColor] = useState<string>(colorSelections[0]);

  const borderWidthSelections: string[] = [defaultString, '1', '2', '4', '10'];

  const [selectedBorderWidth, setSelectedBorderWidth] = useState<string>(borderWidthSelections[0]);

  const switchListData: { value: boolean; onSwitch: (boolean) => void; label: string }[] = useMemo(() => {
    return [
      { value: openCalloutOnHoverAnchor, onSwitch: setOpenCalloutOnHoverAnchor, label: 'Open Callout On Hover Anchor' },
      { value: shouldSetInitialFocus, onSwitch: setShouldSetInitialFocus, label: 'Set Initial Focus' },
      { value: customRestoreFocus, onSwitch: setCustomRestoreFocus, label: 'Customize Restore Focus' },
      { value: isBeakVisible, onSwitch: setIsBeakVisible, label: 'Beak Visible' },
      { value: preventDismissOnKeyDown, onSwitch: onPreventDismissOnKeyDownChange, label: 'Prevent Dismiss On Key Down' },
      { value: preventDismissOnClickOutside, onSwitch: onPreventDismissOnClickOutsideChange, label: 'Prevent Dismiss On Click Outside' },
      { value: showScrollViewCallout, onSwitch: setShowScrollViewCallout, label: 'Enable ScrollView Callout' },
      { value: useCustomizedGapCallout, onSwitch: setUseCustomizedGapCallout, label: 'Use Customized gapSpace Callout' },
    ];
  }, [
    openCalloutOnHoverAnchor,
    shouldSetInitialFocus,
    customRestoreFocus,
    isBeakVisible,
    preventDismissOnKeyDown,
    onPreventDismissOnKeyDownChange,
    preventDismissOnClickOutside,
    onPreventDismissOnClickOutsideChange,
    showScrollViewCallout,
    useCustomizedGapCallout,
  ]);

  const colorMenuItems: MenuButtonItemProps[] = colorSelections.map((color) => ({ itemKey: color, text: color }));
  const borderWidthMenuItems: MenuButtonItemProps[] = borderWidthSelections.map((width) => ({ itemKey: width, text: width }));

  return (
    <View>
      <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
        <View>
          {switchListData.map((value, index: number) => {
            return <SwitchWithLabel key={index} label={value.label} value={value.value} onValueChange={value.onSwitch} />;
          })}

          <MenuPicker
            prompt="Background Color"
            contentKey={selectedBackgroundColor}
            menuItems={colorMenuItems}
            onItemClick={(color) => setSelectedBackgroundColor(color)}
          />

          <MenuPicker
            prompt="Border Color"
            contentKey={selectedBorderColor}
            menuItems={colorMenuItems}
            onItemClick={(color) => setSelectedBorderColor(color)}
          />

          <MenuPicker
            prompt="Border Width"
            contentKey={selectedBorderWidth}
            menuItems={borderWidthMenuItems}
            onItemClick={(width) => setSelectedBorderWidth(width)}
          />
        </View>

        <PaddedVerticalSeparator />

        <View>
          <Button onClick={toggleShowStandardCallout}>
            {(openCalloutOnHoverAnchor ? 'Hover Color Anchor ' : 'Press Here ') + 'for Callout'}
          </Button>
          <Text>
            <Text>Visibility: </Text>
            {isStandardCalloutVisible ? <Text style={{ color: 'green' }}>Visible</Text> : <Text style={{ color: 'red' }}>Not Visible</Text>}
          </Text>
        </View>

        <PaddedVerticalSeparator />

        <View>
          <ViewWin32
            ref={memoAnchorTargetRefs[0]}
            style={{ ...calloutTestStyles.anchorSquareCommonStyle, ...{ backgroundColor: 'red' } }}
            onMouseEnter={() => setShowStandardCalloutOnHoverAnchor(true, memoAnchorTargetRefs[0])}
            onMouseLeave={() => setShowStandardCalloutOnHoverAnchor(false, memoAnchorTargetRefs[0])}
          />
          <ViewWin32
            ref={memoAnchorTargetRefs[1]}
            style={{ ...calloutTestStyles.anchorSquareCommonStyle, ...{ backgroundColor: 'green' } }}
            onMouseEnter={() => setShowStandardCalloutOnHoverAnchor(true, memoAnchorTargetRefs[1])}
            onMouseLeave={() => setShowStandardCalloutOnHoverAnchor(false, memoAnchorTargetRefs[1])}
          />
          <ViewWin32
            ref={memoAnchorTargetRefs[2]}
            style={{ ...calloutTestStyles.anchorSquareCommonStyle, ...{ backgroundColor: 'blue' } }}
            onMouseEnter={() => setShowStandardCalloutOnHoverAnchor(true, memoAnchorTargetRefs[2])}
            onMouseLeave={() => setShowStandardCalloutOnHoverAnchor(false, memoAnchorTargetRefs[2])}
          />
        </View>
      </View>

      <PaddedVerticalSeparator />

      <View style={{ paddingVertical: 5 }}>
        <Button componentRef={decoyBtn1Ref}>Custom reFocus w/ focus in Callout</Button>
        <Button componentRef={decoyBtn2Ref}>Custom reFocus w/o focus in Callout</Button>
      </View>

      {showStandardCallout && (
        <UseCustomizedCallout
          useCustomized={useCustomizedGapCallout}
          accessibilityLabel="Light Dismiss Callout"
          accessibilityRole="alert"
          accessibilityOnShowAnnouncement="Be informed that a customized callout has been opened."
          backgroundColor={selectedBackgroundColor !== defaultString ? selectedBackgroundColor : undefined}
          borderColor={selectedBorderColor !== defaultString ? selectedBorderColor : undefined}
          borderWidth={selectedBorderWidth !== defaultString ? parseInt(selectedBorderWidth) : undefined}
          dismissBehaviors={calloutDismissBehaviors ?? undefined}
          doNotTakePointerCapture={openCalloutOnHoverAnchor ?? undefined}
          isBeakVisible={isBeakVisible}
          onDismiss={onDismissStandardCallout}
          onShow={() => setIsStandardCalloutVisible(true)}
          onRestoreFocus={onRestoreFocusStandardCallout ?? undefined}
          setInitialFocus={shouldSetInitialFocus}
          style={{ flex: 1 }}
          target={anchorRef}
        >
          <ConditionalScrollView condition={showScrollViewCallout}>
            <Button onClick={toggleCalloutAnchorRef}>click to change anchor</Button>
            <CalloutContentGrid />
          </ConditionalScrollView>
        </UseCustomizedCallout>
      )}
    </View>
  );
};

const calloutSections: TestSection[] = [
  {
    name: 'Callout Usage',
    testID: CALLOUT_TESTPAGE,
    component: CalloutTestPage,
  },
  {
    name: 'E2E Testing Callout',
    component: E2ECalloutTest,
  },
];

export const CalloutTest: FunctionComponent = () => {
  const status: PlatformStatus = {
    win32Status: 'Beta',
    uwpStatus: 'Backlog',
    iosStatus: 'Backlog',
    macosStatus: 'Backlog',
    androidStatus: 'Backlog',
  };

  const description = 'A callout is an anchored tip that can be used to teach people or guide them through the app without blocking them.';

  return <Test name="Callout Test" description={description} sections={calloutSections} status={status} />;
};
