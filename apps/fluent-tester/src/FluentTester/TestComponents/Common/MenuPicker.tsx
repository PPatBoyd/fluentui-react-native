import React from 'react';
import { Text, View } from 'react-native';
import { MenuButton, MenuButtonItemProps } from '@fluentui/react-native';

export type MenuPickerProps = {
  prompt: string;
  menuItems: MenuButtonItemProps[];
  contentKey: string;
  onItemClick?: (key: string) => void;
};

export const MenuPicker: React.FunctionComponent<MenuPickerProps> = (props) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text>{props.prompt}</Text>
      <MenuButton
        content={props.menuItems[props.contentKey].text}
        menuItems={props.menuItems}
        onItemClick={props.onItemClick ?? undefined}
        contextualMenu={{
          shouldFocusOnMount: true,
          shouldFocusOnContainer: true,
        }}
      />
    </View>
  );
};
