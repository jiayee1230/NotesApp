import { View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Text } from "react-native"
import styles from "./styles";
import React, { useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import DropDownPicker from 'react-native-dropdown-picker';
import theme from "../../styles/theme";
import { notesCategories } from "../../mocks/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';
import { Category } from "../../types";
import CustomAlert from "../../components/CustomAlert";

const NewNote = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>(notesCategories);
  const [noteContent, setNoteContent] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(true);
  const [showCreateNoteSuccessAlert, setShowCreateNoteSuccessAlert] = useState<boolean>(false);

  useEffect(() => { }, [isFormValid]);

  const validateForm = () => {
    if (selectedCategory == "") {
      return false;
    } else if (noteContent == "") {
      return false;
    } else if (noteContent.length > 200) {
      return false;
    } else {
      return true;
    }
  }

  const saveNewNote = async () => {
    try {
      Keyboard.dismiss();
      // check form validation
      let isValid = validateForm();
      setIsFormValid(isValid);
      if (isValid) {
        let notesList = [];
        let updatedNotesList = [];
        // prepare note payload
        const newNote = {
          "id": uuid.v4(),
          "notesContent": noteContent,
          "categoryKey": selectedCategory,
          "createdDateTime": `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`
        }
        // get current notes list from storage
        const notesDataJson = await AsyncStorage.getItem('notesData');
        if (notesDataJson != null) {
          notesList = JSON.parse(notesDataJson);
        }
        // push new note into list and save back to storage
        updatedNotesList = [...notesList, newNote];
        await AsyncStorage.setItem('notesData', JSON.stringify(updatedNotesList));
        // reset form
        setNoteContent("");
        setSelectedCategory("");
        setShowCreateNoteSuccessAlert(true);
      }
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient
        colors={theme.colors.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 2 }}
        style={{ flex: 1 }}>
        <View style={styles.mainContainer}>
          {/* Category dropdown picker */}
          <DropDownPicker
            open={openDropdown}
            value={selectedCategory}
            items={categories}
            setOpen={setOpenDropdown}
            setValue={setSelectedCategory}
            setItems={setCategories}
            theme="DARK"
            style={styles.dropdownInput}
            placeholder="Choose a category"
          />
          {!isFormValid && selectedCategory == "" ? <Text style={styles.errorLabel}>Category is required.</Text> : <></>}
          {/* Note content text input */}
          <TextInput
            style={styles.noteContentInput}
            onChangeText={setNoteContent}
            value={noteContent}
            placeholder='Please input note content'
            placeholderTextColor='#ffffffe6'
            multiline={true}
            numberOfLines={7}
          />
          {!isFormValid && noteContent == "" ? <Text style={styles.errorLabel}>Note content is required.</Text> : <></>}
          {!isFormValid && noteContent.length > 200 ? <Text style={styles.errorLabel}>Note content characters cannot more than 200.</Text> : <></>}
        </View>
        {/* Sticky bottom save button */}
        <View style={styles.bottomBtnContainer}>
          <TouchableOpacity onPress={() => saveNewNote()}>
            <View style={styles.saveNoteBtn}>
              <Text style={{ color: '#ffffff' }}>Save</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Alert message when note created successfully */}
        <CustomAlert
          displayMessage={"Note created successfully"}
          isShown={showCreateNoteSuccessAlert}
          dismissAlert={setShowCreateNoteSuccessAlert} />
      </LinearGradient>
    </TouchableWithoutFeedback>
  )
}

export default NewNote;