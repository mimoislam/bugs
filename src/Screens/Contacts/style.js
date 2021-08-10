import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    // backgroundColor: "#DDD",
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    right: 60,
  },
  backRightBtnLeft2: {
    right: 120,
  },
  backRightBtnLeft3: {
    right: 180,
  },
  backRightBtnRight: {
    right: 0,
  },
  image: {
    width: 26,
    height: 26,
  },
  modalButton: {
    width: 100,
  },
  modalContainer: { backgroundColor: 'white', padding: 20 },
  modalButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  border: { borderRightWidth: 1, borderRightColor: '#d8d8d8', width: 60 },
});

export { styles };
