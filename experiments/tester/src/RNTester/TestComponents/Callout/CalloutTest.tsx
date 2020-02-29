import * as React from 'react';
import { View } from 'react-native';
import { Button, Separator } from 'react-native-uifabric';
import { TextWin32 } from '@office-iss/react-native-win32';
import { fabricTesterStyles } from '../Common/styles';

export const CalloutTest: React.FunctionComponent<{}> = () => {
  return (
    <View>
      <TextWin32 style={fabricTesterStyles.testSection}>Standard Usage</TextWin32>
      <Separator />
      <Button content="Press for Callout" />

      <TextWin32 style={fabricTesterStyles.testSection}>Customized Usage</TextWin32>
      <Separator />
      <Button content="Press for Callout" />
    </View>
  );
};
