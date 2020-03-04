import * as React from 'react';
import { View } from 'react-native';
import { Button, Callout, Separator } from 'react-native-uifabric';
import { TextWin32, IViewWin32 } from '@office-iss/react-native-win32';
import { fabricTesterStyles } from '../Common/styles';

export const CalloutTest: React.FunctionComponent<{}> = () => {
  const [state, setState] = React.useState({
    showStandardCallout: false,
    showCustomizedCallout: false
  });

  const stdBtnRef = React.useRef<IViewWin32>(null);

  const custBtnRef = React.useRef<IViewWin32>(null);

  const toggleShowStandardCallout = React.useCallback(() => {
    setState({ ...state, showStandardCallout: !state.showStandardCallout });
  }, [state, setState]);

  const toggleShowCustomizedCallout = React.useCallback(() => {
    setState({ ...state, showCustomizedCallout: !state.showCustomizedCallout });
  }, [state, setState]);

  return (
    <View>
      <TextWin32 style={fabricTesterStyles.testSection}>Standard Usage</TextWin32>
      <Separator />
      <Button componentRef={stdBtnRef} content="Press for Callout" onClick={toggleShowStandardCallout} />

      {state.showStandardCallout && (
        <Callout target={stdBtnRef}>
          <Button content="Close" />
        </Callout>
      )}

      <TextWin32 style={fabricTesterStyles.testSection}>Customized Usage</TextWin32>
      <Separator />
      <Button componentRef={custBtnRef} content="Press for Callout" onClick={toggleShowCustomizedCallout} />

      {state.showCustomizedCallout && (
        <Callout target={custBtnRef}>
          <Button content="Close" />
        </Callout>
      )}
    </View>
  );
};
