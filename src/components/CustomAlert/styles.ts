import { StyleSheet } from "react-native";
import theme from "../../styles/theme";

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#34343480', 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  msgContainer: {
    height: 80, 
    width: 170, 
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden'
  },
  closeIconContainer: {
    borderWidth: 1,
    borderColor: '#ffffff',
    marginTop: 20,
    borderRadius: 50,
    padding: 5
  },
  linearGradientContainer: {
    width: '100%', 
    height: '100%', 
    justifyContent: 'center'
  },
  displayMessage: {
    textAlign: 'center', 
    color: '#ffffff', 
    fontSize: 16
  }
});
  
export default styles;