import { StyleSheet } from "react-native";
import theme from "../../styles/theme";

const styles = StyleSheet.create({
    mainContainer: {
      paddingHorizontal: 20,
      paddingVertical: 25
    },
    titleContainer: {
      flexDirection: 'row'
    },
    titleLabel: {
      color: '#ffffffb3', 
      paddingLeft: 10, 
      fontSize: 16
    },
    notesTitleLabel: {
      color: '#ffffff',
      fontSize: 16,
      paddingLeft: 10
    }
  });
  
export default styles;