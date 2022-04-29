import React from 'react';
import { Text, View } from 'react-native';
import { ButtonV1 as Button } from '@fluentui/react-native';
import { Icon } from '@fluentui-react-native/icon';

export const GridButton = Button.compose({
  slots: {
    root: View,
    icon: Icon,
    content: Text,
  },
  slotProps: {
    content: {
      style: { aspectRatio: 1, alignItems: 'center', justifyContent: 'center' },
    },
  },
});

export type GridOfButtonsProps = {
  gridWidth: number;
  gridHeight: number;
  buttonRefs?: React.RefObject<View>[];
  onClick?: (index: number) => void;
};

export const GridOfButtons: React.FunctionComponent<GridOfButtonsProps> = (props: GridOfButtonsProps) => {
  return (
    <React.Fragment>
      {[...Array(props.gridHeight)].map((_value, heightIndex: number) => {
        return (
          <View key={heightIndex} style={{ flex: 1, flexDirection: 'row', alignContent: 'flex-start', alignItems: 'flex-start' }}>
            {[...Array(props.gridWidth)].map((_value, widthIndex: number) => {
              const gridIndex = heightIndex * props.gridWidth + widthIndex + 1;
              return (
                <GridButton
                  key={widthIndex}
                  componentRef={props?.buttonRefs?.[gridIndex]}
                  onClick={() => {
                    props?.onClick?.(gridIndex);
                  }}
                >
                  <Text>{gridIndex}</Text>
                </GridButton>
              );
            })}
          </View>
        );
      })}
    </React.Fragment>
  );
};
