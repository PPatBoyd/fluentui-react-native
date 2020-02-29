import * as React from 'react';
import { View } from 'react-native';
import { Separator } from 'react-native-uifabric';
import { StandardUsage } from './StandardUsage';
import { CustomizeUsage } from './CustomizeUsage';
import { styles } from './styles';
import { TextWin32 } from '@office-iss/react-native-win32';

export const PersonaCoinTest: React.FunctionComponent<{}> = () => {
  return (
    <View>
      <TextWin32 style={styles.testSection}>Standard Usage</TextWin32>
      <Separator />
      <StandardUsage />

      <TextWin32 style={styles.testSection}>Customize Usage</TextWin32>
      <Separator />
      <CustomizeUsage />
    </View>
  );
};
