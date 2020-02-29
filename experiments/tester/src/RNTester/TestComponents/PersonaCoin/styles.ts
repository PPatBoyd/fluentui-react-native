import { StyleSheet } from 'react-native';
import { fabricTesterStyles } from '../Common/styles';

export const styles = StyleSheet.create({
  ...fabricTesterStyles,
  root: {
    marginTop: 16,
    marginRight: 32,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  oneCoin: {
    margin: 8
  },
  switch: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  header: {
    marginVertical: 6,
    fontSize: 12
  },
  settings: {
    flexGrow: 1
  },
  slider: {
    marginVertical: 6
  }
});

export const satyaPhotoUrl =
  'https://www.microsoft.com/en-us/CMSImages/satya.jpg?version=0881eb71-4942-b627-d602-84c832b8a0b6&amp;CollectionId=1b46ce2d-c90d-421e-94f1-cfb6bc6ef6ec';

export const steveBallmerPhotoUrl = 'http://www.rmndigital.com/wp-content/uploads/2012/11/stevems.jpg';

export const undefinedText = '(undefined)';
