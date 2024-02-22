import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text, View, TouchableOpacity, Modal } from "react-native";
import styles from "./styles";
import { CustomAlertProps } from "../../types";
import LinearGradient from "react-native-linear-gradient";

const CustomAlert = (props: CustomAlertProps) => {
    return (
        <View>
            <Modal
                visible={props.isShown}
                animationType={'fade'}
                transparent={true}>
                <View style={styles.mainContainer}>
                    <View style={styles.msgContainer}>
                        <LinearGradient
                            colors={['#C724E1', '#4E22CC']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={styles.linearGradientContainer}>
                            <Text style={styles.displayMessage}>{props.displayMessage}</Text>
                        </LinearGradient>
                    </View>
                    <TouchableOpacity onPress={() => props.dismissAlert(false)}>
                        <View style={styles.closeIconContainer}>
                            <FontAwesomeIcon icon={faClose} color="#ffffff" />
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

export default CustomAlert;