import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Image, Text, View, TouchableOpacity } from "react-native";
import theme from "../../styles/theme";
import styles from "./styles";
import { DisplayContainerProps } from "../../types";

const DisplayContainer = (props: DisplayContainerProps) => {
    return (
        <TouchableOpacity onPress={props.onPressFunction} disabled={props.onPressFunction ? false : false}>
            <View style={styles.mainContainer}>
                {props.leftIconImage ? <Image style={{ marginRight: 10 }} source={props.leftIconImage} /> : <></>}
                <View style={{ flex: 10 }}>
                    <Text style={{ color: '#ffffff', fontSize: props.titleFontSize ? props.titleFontSize : 14 }}>
                        {!props.hasCharacterLimit ? props.title : props.title.length < 20 ? props.title : `${props.title.substring(0, 20)}...`}
                    </Text>
                </View>
                {
                    props.hasRightIconAction ?
                        <View style={{ flex: 1 }}>
                            <FontAwesomeIcon icon={faAngleRight} color={theme.colors.secondary} />
                        </View> :
                        <></>
                }
            </View>
        </TouchableOpacity>
    )
}

export default DisplayContainer;