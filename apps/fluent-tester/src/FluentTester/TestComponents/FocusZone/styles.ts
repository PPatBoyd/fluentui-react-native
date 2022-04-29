import { StyleSheet } from 'react-native';
import { IStackProps } from '@fluentui-react-native/stack';
import { Text } from '@fluentui/react-native';

export const focusZoneTestStyles = StyleSheet.create({
  focusZoneViewStyle: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  focusZoneContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: 4,
  },
  nestedFocusZoneStyle: {
    borderWidth: 1,
    padding: 8,
    margin: 8,
  },
  focusZoneButton: {
    height: 50,
    width: 50,
  },
});

export const SubheaderText = Text.customize({
  tokens: { variant: 'subheaderSemibold' },
  root: { style: { textDecorationLine: 'underline' } },
});

export const stackStyleFocusZone: IStackProps['style'] = {
  flexDirection: 'column',
  marginBottom: 40,
};
