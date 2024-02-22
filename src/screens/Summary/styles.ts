import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screenTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 70
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  summaryContainer: {
    backgroundColor: '#ffffff0d',
    height: '100%',
    paddingTop: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  }
});

export default styles;