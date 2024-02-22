import { Dispatch, SetStateAction } from "react";
import { ImageSourcePropType } from "react-native";

export type Category = {
    value: string;
    label: string;
}

export type Notes = {
    id: string;
    notesContent: string;
    categoryKey: string;
    createdDateTime: string;
}

export type TabBarProps = {
    isFocused: boolean,
    inactiveTabIcon: ImageSourcePropType,
    activeTabIcon: ImageSourcePropType, 
    tabTitle?: string
}

export type NotesSectionProps = {
    iconImage: ImageSourcePropType,
    sectionTitle: string,
    notesList: Notes[]
}

export type DisplayContainerProps = {
    onPressFunction?: () => void,
    leftIconImage?: ImageSourcePropType,
    hasCharacterLimit: boolean,
    hasRightIconAction: boolean,
    title: string,
    titleFontSize?: number
}

export type CustomAlertProps = {
    displayMessage: string,
    isShown: boolean,
    dismissAlert: Dispatch<SetStateAction<boolean>>
}

export type SummaryItemProps = {
    avatarImage: ImageSourcePropType,
    summaryTitle: string,
    totalRecordsCount: number
}