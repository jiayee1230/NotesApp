import { Linking, ScrollView, Text, View } from "react-native"
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import DisplayContainer from "../../components/DisplayContainer";
import { TouchableOpacity } from "react-native-gesture-handler";
import theme from "../../styles/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAlert from "../../components/CustomAlert";
import { useState } from "react";


const Settings = () => {
    const [showRemoveNotesSuccessAlert, setShowRemoveNotesSuccessAlert] = useState<boolean>(false);

    // open external url with default browser
    function handleUrlOnClick(urlLink: string) {
        Linking.openURL(urlLink);
    }

    const removeAllNotes = async () => {
        try {
            await AsyncStorage.removeItem('notesData');
            setShowRemoveNotesSuccessAlert(true);
        } catch (e) {
            console.log('Error: ', e);
        }
    }

    return (
        <LinearGradient
            colors={theme.colors.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 2 }}
            style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.mainContainer}>
                    <DisplayContainer
                        onPressFunction={() => handleUrlOnClick('https://www.google.com')}
                        leftIconImage={require('../../assets/icons/online_customer_icon.png')}
                        hasCharacterLimit={false}
                        hasRightIconAction={true}
                        title={"Online Customer"}
                        titleFontSize={16} />
                    <DisplayContainer
                        onPressFunction={() => handleUrlOnClick('https://www.google.com')}
                        leftIconImage={require('../../assets/icons/user_agreement_icon.png')}
                        hasCharacterLimit={false}
                        hasRightIconAction={true}
                        title={"User Agreement"}
                        titleFontSize={16} />
                    <DisplayContainer
                        onPressFunction={() => handleUrlOnClick('https://www.google.com')}
                        leftIconImage={require('../../assets/icons/privacy_policy_icon.png')}
                        hasCharacterLimit={false}
                        hasRightIconAction={true}
                        title={"Privacy Policy"}
                        titleFontSize={16} />
                    <DisplayContainer
                        onPressFunction={() => handleUrlOnClick('https://www.google.com')}
                        leftIconImage={require('../../assets/icons/about_us_icon.png')}
                        hasCharacterLimit={false}
                        hasRightIconAction={true}
                        title={"About Us"}
                        titleFontSize={16} />
                </View>
            </ScrollView>
            {/* Sticky delete all note button */}
            <View style={styles.bottomBtnContainer}>
                <TouchableOpacity onPress={() => removeAllNotes()}>
                    <View style={styles.deleteNotesBtn}>
                        <Text style={{ color: '#ffffff' }}>Delete All Notes</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/* Alert message when all notes deleted successfully */}
            <CustomAlert
                displayMessage={"All notes have been cleared"}
                isShown={showRemoveNotesSuccessAlert}
                dismissAlert={setShowRemoveNotesSuccessAlert} />
        </LinearGradient>
    )
}

export default Settings;