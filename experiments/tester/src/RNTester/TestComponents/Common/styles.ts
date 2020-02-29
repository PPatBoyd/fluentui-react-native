import { StyleSheet } from 'react-native';

export const commonTestStyles = StyleSheet.create({
  viewStyle: {
    minHeight: 200,
    justifyContent: 'space-between'
  },
  stackStyle: {
    borderWidth: 2,
    borderColor: '#bdbdbd',
    padding: 12,
    margin: 8
  },
  separatorStackStyle: {
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  textBoxStyle: {
    borderWidth: 1,
    height: 25,
    fontSize: 12,
    width: 150,
    marginBottom: 8
  }
});

export const fabricTesterStyles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    minHeight: 550,
    minWidth: 300,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 4
  },
  testHeader: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 'bold'
  },
  testList: {
    width: 160
  },
  testListContainerStyle: {
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  testListItem: {
    width: 150
  },
  testSection: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0B6A0B',
    marginTop: 12
  },
  separator: {
    marginHorizontal: 8,
    width: 2
  },
  noTest: {
    alignSelf: 'center',
    fontSize: 14
  }
});
