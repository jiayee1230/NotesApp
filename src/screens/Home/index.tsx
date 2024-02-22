import { Image, Text, View } from "react-native"
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import theme from "../../styles/theme";
import { useState } from "react";
import { Notes, NotesSectionProps } from "../../types";
import { useFocusEffect } from "@react-navigation/native";
import { HEALTH_WELLNESS, LIFE, WORK_STUDY } from "../../constants";
import React from 'react'
import DisplayContainer from "../../components/DisplayContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
    const [workStudyNotesList, setWorkStudyNotesList] = useState<Notes[]>([]);
    const [lifeNotesList, setLifeNotesList] = useState<Notes[]>([]);
    const [healthWellnessNotesList, setHealthWellnessNotesList] = useState<Notes[]>([]);

    const NotesSection = (props: NotesSectionProps) => (
        <View style={{ marginTop: 30 }}>
            <View style={{ flexDirection: 'row' }}>
                <Image source={props.iconImage} />
                <Text style={styles.notesTitleLabel}>{props.sectionTitle}</Text>
            </View>
            {
                props.notesList.length > 0 ?
                    props.notesList.map((item) =>
                        <DisplayContainer
                            hasCharacterLimit={true}
                            hasRightIconAction={true}
                            title={item.notesContent}
                            key={item.id} />)
                    : <DisplayContainer
                        hasCharacterLimit={false}
                        hasRightIconAction={false}
                        title={"No notes for this category."} />
            }
        </View>
    );

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
                            const groupedNotes = sortListByLatest(notesList).reduce((group: { [key: string]: Notes[] }, item) => {
                                if (!group[item.categoryKey]) {
                                    group[item.categoryKey] = [];
                                }
                                // only allow display 3 latest notes each cateory
                                if (group[item.categoryKey].length < 3) {
                                    group[item.categoryKey].push(item);
                                }
                                return group;
                            }, {});
                            // set notes list
                            setWorkStudyNotesList(groupedNotes[WORK_STUDY]);
                            setLifeNotesList(groupedNotes[LIFE]);
                            setHealthWellnessNotesList(groupedNotes[HEALTH_WELLNESS]);
                        }
                    } else {
                        setWorkStudyNotesList([]);
                        setLifeNotesList([]);
                        setHealthWellnessNotesList([]);
                    }
                } catch (e) {
                    console.log("Error: ", e);
                }
            };
            getData();
        }, [])
    );

    // sort the notes list by latest based on created date time
    const sortListByLatest = (notesList: Notes[]) => notesList.sort((a, b) => {
        const dateA = new Date(a.createdDateTime).valueOf();
        const dateB = new Date(b.createdDateTime).valueOf();
        if (dateA > dateB) {
            return -1;
        }
        return 1;
    });

    return (
        <LinearGradient
            colors={theme.colors.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 2 }}
            style={{ flex: 1 }}>
            <View style={{ position: 'relative', flex: 1 }}>
                <ScrollView style={{ marginBottom: 112 }}>
                    <View style={styles.mainContainer}>
                        {/* Title section */}
                        <View style={styles.titleContainer}>
                            <Image source={require('../../assets/icons/recent_icon.png')} />
                            <Text style={styles.titleLabel}>Recently created notes</Text>
                        </View>
                        {/* Work and study section */}
                        <NotesSection
                            iconImage={require('../../assets/icons/work_study_icon.png')}
                            sectionTitle={"Work and study"}
                            notesList={workStudyNotesList} />
                        {/* Life section */}
                        <NotesSection
                            iconImage={require('../../assets/icons/life_icon.png')}
                            sectionTitle={"Life"}
                            notesList={lifeNotesList} />
                        {/* Health and wellness section */}
                        <NotesSection
                            iconImage={require('../../assets/icons/health_wellness_icon.png')}
                            sectionTitle={"Health and wellness"}
                            notesList={healthWellnessNotesList} />
                    </View>
                </ScrollView>
            </View>
        </LinearGradient>
    )
}

export default Home;