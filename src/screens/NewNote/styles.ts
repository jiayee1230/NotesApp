import { StyleSheet } from "react-native";
import theme from "../../styles/theme";

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      padding: 20
    },
    dropdownInput: {
      borderColor: '#ffffff1f',
      color: '#ffffff',
      backgroundColor: '#ffffff0d',
      borderRadius: 16,
      height: 56
    },
    noteContentInput: {
      marginTop: 20,
      borderWidth: 1,
      paddingHorizontal: 10,
      paddingTop: 13,
      height: 200, 
      textAlignVertical: 'top',
      borderColor: '#ffffff1f',
      color: '#ffffff',
      backgroundColor: '#ffffff0d',
      borderRadius: 16,
      fontSize: 14
    },
    errorLabel: {
      color: '#eb3434',
      fontWeight: 'bold',
      paddingTop: 10
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
    saveNoteBtn: {
      width: 200,
      paddingVertical: 9,
      backgroundColor: theme.colors.secondary,
      alignItems: 'center',
      borderRadius: 24
    }
  });
  
export default styles;