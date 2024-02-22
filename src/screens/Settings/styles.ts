import { StyleSheet } from "react-native";
import theme from "../../styles/theme";

const styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: 10,
    paddingRight: 20,
    paddingVertical: 15
  },
  bottomBtnContainer: {
    backgroundColor: theme.colors.primary,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 100
  },
  deleteNotesBtn: {
    width: 200,
    paddingVertical: 9,
    backgroundColor: theme.colors.secondary,
    alignItems: 'center',
    borderRadius: 24
  }
});

export default styles;