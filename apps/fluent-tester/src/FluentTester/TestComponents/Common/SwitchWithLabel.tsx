import React from 'react';
import { Switch, Text, View } from 'react-native';
import { commonTestStyles } from './styles';

export interface ISwitchWithLabelProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export function SwitchWithLabel(props: ISwitchWithLabelProps): React.ReactElement {
  const { label, value, onValueChange } = props;
  return (
    <View style={commonTestStyles.switch}>
      <Switch value={value} onValueChange={onValueChange} />
      <Text>{label}</Text>
    </View>
  );
}
