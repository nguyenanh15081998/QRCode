import {StyleSheet} from 'react-native';
import {
  getStatusBarHeight,
  getWidth,
  getHeight,
  fontFamily,
} from '@common/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 0,
  },
  viewQR: {
    alignSelf: 'center',
    paddingVertical: 30,
  },
  viewBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 50,
  },
  btnSave: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    width: 130,
    alignItems: 'center',
  },
  btnShare: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    width: 130,
    alignItems: 'center',
  },
  colorText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  viewSendMail: {
    alignSelf: 'center',
  },
  btnSendEmail: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    width: 130,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerPicker: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
});

export default styles;
