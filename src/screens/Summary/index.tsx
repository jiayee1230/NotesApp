import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import theme from "../../styles/theme";
import DisplayContainer from "../../components/DisplayContainer";
import { Notes, SummaryItemProps } from "../../types";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { HEALTH_WELLNESS, LIFE, WORK_STUDY } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Summary = () => {
    const [workStudyNotesCount, setWorkStudyNotesCount] = useState<number>(0);
    const [lifeNotesCount, setLifeNotesCount] = useState<number>(0);
    const [healthWellnessNotesCount, setHealthWellnessNotesCount] = useState<number>(0);

    useFocusEffect(
        React.useCallback(() => {
            let notesList: Notes[] = [];
            const getData = async () => {
                try {
                    // get mock data with async storage
                    const notesDataJson = await AsyncStorage.getItem('notesData');
                    if (notesDataJson != null) {
                        notesList = JSON.parse(notesDataJson);
                        if (notesList.length > 0) {
                            // group by category
                            const groupedNotes = notesList.reduce((group: { [key: string]: Notes[] }, item) => {
                                if (!group[item.categoryKey]) {
                                    group[item.categoryKey] = [];
                                }
                                group[item.categoryKey].push(item);
                                return group;
                            }, {});
                            // set notes total to each state
                            setWorkStudyNotesCount(groupedNotes[WORK_STUDY].length);
                            setLifeNotesCount(groupedNotes[LIFE].length);
                            setHealthWellnessNotesCount(groupedNotes[HEALTH_WELLNESS].length);
                        }
                    }else{
                        setWorkStudyNotesCount(0);
                        setLifeNotesCount(0);
                        setHealthWellnessNotesCount(0);
                    }
                } catch (e) {
                    console.log('Error: ', e);
                }
            };
            getData();
        }, [])
    );

    const SummaryItem = (props: SummaryItemProps) => (
        <View style={{paddingHorizontal: 20, marginBottom: 30}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{width: 48, height: 48, marginRight: 15}} source={props.avatarImage} />
                    <Text style={{color: '#FFFFFF', fontSize: 16}}>{props.summaryTitle}</Text>
                </View>
                <TouchableOpacity>
                    <View style={{backgroundColor: theme.colors.secondary, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 24}}>
                        <Text style={{color: '#FFFFFF', fontWeight: '600'}}>Detail</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <DisplayContainer 
                hasCharacterLimit={false} 
                hasRightIconAction={false} 
                title={`This topic has a total of ${ props.totalRecordsCount.toString() } records.`} />
        </View>
    );

    return (
        <LinearGradient
            colors={theme.colors.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 2 }}
            style={{ flex: 1 }}>
            <ScrollView>
                <View style={{marginBottom: 112}}>
                    {/* Title section */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.screenTitle}>Summary</Text>
                        <Image source={require('../../assets/avatar/summary_avatar.png')} />
                    </View>
                    {/* Summary section */}
                    <View style={styles.summaryContainer}>
                        <SummaryItem
                            avatarImage={require('../../assets/avatar/work_study_avatar.png')}
                            summaryTitle='Work and study'
                            totalRecordsCount={workStudyNotesCount} />
                        <SummaryItem
                            avatarImage={require('../../assets/avatar/life_avatar.png')}
                            summaryTitle='Life'
                            totalRecordsCount={lifeNotesCount} />
                        <SummaryItem
                            avatarImage={require('../../assets/avatar/health_wellness_avatar.png')}
                            summaryTitle='Health and wellness'
                            totalRecordsCount={healthWellnessNotesCount} />
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}

export default Summary;