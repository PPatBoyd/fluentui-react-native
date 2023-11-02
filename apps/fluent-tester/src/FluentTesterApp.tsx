'use strict';

import * as React from 'react';
import { View, FlatList, StyleSheet, Text, Button } from 'react-native';

import { FocusZone } from '@fluentui/react-native';

import type { FluentTesterProps } from './FluentTester';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: 200,
    maxHeight: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export const FluentTesterApp: React.FunctionComponent<FluentTesterProps> = () => {
  //const scrollerRef = React.createRef<FlatList>();
  const flatListContainerStyle = { padding: 10 };

  const [fzVisible, setFzVisible] = React.useState(0);
  const [flexDirection, setFlexDirection] = React.useState<'row' | 'column'>('row');

  // Sample data
  const data = [
    { id: '1', text: 'Item 1' },
    { id: '2', text: 'Item 2' },
    { id: '3', text: 'Item 3' },
    { id: '4', text: 'Item 4' },
    { id: '5', text: 'Item 5' },
    { id: '1', text: 'Item 1' },
    { id: '2', text: 'Item 2' },
    { id: '3', text: 'Item 3' },
    { id: '4', text: 'Item 4' },
    { id: '5', text: 'Item 5' },
    { id: '1', text: 'Item 1' },
    { id: '2', text: 'Item 2' },
    { id: '3', text: 'Item 3' },
    { id: '4', text: 'Item 4' },
    { id: '5', text: 'Item 5' },
    { id: '1', text: 'Item 1' },
    { id: '2', text: 'Item 2' },
    { id: '3', text: 'Item 3' },
    { id: '4', text: 'Item 4' },
    { id: '5', text: 'Item 5' },
    { id: '1', text: 'Item 1' },
    { id: '2', text: 'Item 2' },
    { id: '3', text: 'Item 3' },
    { id: '4', text: 'Item 4' },
    { id: '5', text: 'Item 5' },
    { id: '1', text: 'Item 1' },
    { id: '2', text: 'Item 2' },
    { id: '3', text: 'Item 3' },
    { id: '4', text: 'Item 4' },
    { id: '5', text: 'Item 5' },
    { id: '1', text: 'Item 1' },
    { id: '2', text: 'Item 2' },
    { id: '3', text: 'Item 3' },
    { id: '4', text: 'Item 4' },
    { id: '5', text: 'Item 5' },
  ];

  const renderItem = ({ item }: { item: { id: string; text: string } }) => (
    <View style={styles.item}>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, flexGrow: 1, flexShrink: 1 }}>
      <View style={{ flexDirection: 'row' }}>
        <Button color="lightblue" title="Toggle FocusZone Tristate" onPress={() => setFzVisible((fzVisible + 1) % 3)} />
        <Button color="lightblue" title="Swap FlexDirection" onPress={() => setFlexDirection(flexDirection === 'row' ? 'column' : 'row')} />
      </View>
      <View style={{ flex: 1, flexGrow: 1, flexShrink: 1 }}>
        <Button title="Header" />
        <View style={{ flex: 1, maxWidth: 200, flexDirection: 'row' }}>
          {fzVisible % 2 === 0 && (
            <View style={{ flexDirection: flexDirection }}>
              <Button color="lightgreen" title="FocusZone wrapped" />
              <FocusZone>
                <FlatList contentContainerStyle={flatListContainerStyle} data={data} renderItem={renderItem} />
              </FocusZone>
            </View>
          )}
          {fzVisible > 0 && (
            <View style={{ flexDirection: flexDirection }}>
              <Button color="lightyellow" title="View wrapped" />
              <View>
                <FlatList contentContainerStyle={flatListContainerStyle} data={data} renderItem={renderItem} />
              </View>
            </View>
          )}
        </View>
      </View>
      <Button title="Footer" />
    </View>
  );
};
