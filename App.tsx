import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  Image,
  Text,
  View,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { Home, NewNote, Settings, Summary } from './src/screens';
import theme from './src/styles/theme';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { TabBarProps } from './src/types';
import { notes } from './src/mocks/data';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator
      backBehavior='history'
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
          backgroundColor: theme.colors.primary,
          paddingHorizontal: 40,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 0,
          display: route.name == 'NewNoteStack' ? 'none' : 'flex',
        },
        tabBarItemStyle: {
          height: 100
        },
      })}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={({ navigation }) => ({
          title: 'Home',
          headerStyle: {
            backgroundColor: theme.colors.primary,
            height: 112
          },
          headerShown: true,
          headerTitleAlign: "left",
          headerShadowVisible: false,
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: "600",
            fontSize: 24,
            lineHeight: 36,
            paddingLeft: 10
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.push('Settings')}>
              <View style={{ paddingRight: 20 }}>
                <Image source={require('./src/assets/icons/setting_icon.png')} />
              </View>
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused }) => {
            return (
              <TabBarItem
                isFocused={focused}
                tabTitle={'Home'}
                inactiveTabIcon={require('./src/assets/icons/home_inactive_icon.png')}
                activeTabIcon={require('./src/assets/icons/home_active_icon.png')} />
            )
          }
        })}
      />
      <Tab.Screen
        name='NewNoteStack'
        component={NewNoteStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabBarItem
                isFocused={focused}
                inactiveTabIcon={require('./src/assets/icons/new_note_icon.png')}
                activeTabIcon={require('./src/assets/icons/new_note_icon.png')} />
            )
          }
        }}
      />
      <Tab.Screen
        name='Summary'
        component={Summary}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabBarItem
                isFocused={focused}
                tabTitle={'Summary'}
                inactiveTabIcon={require('./src/assets/icons/summary_inactive_icon.png')}
                activeTabIcon={require('./src/assets/icons/summary_active_icon.png')} />
            )
          }
        }}
      />

    </Tab.Navigator>
  )
}

const NewNoteStack = () => {
  return (
    <Stack.Navigator initialRouteName='NewNote'>
      <Stack.Screen
        name='NewNote'
        component={NewNote}
        options={({ navigation }) => ({
          title: 'New note',
          headerStyle: {
            backgroundColor: theme.colors.primary,
            height: 112
          },
          headerTitleAlign: "left",
          headerShadowVisible: false,
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: "600",
            fontSize: 24,
            lineHeight: 36
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={{ paddingLeft: 20 }}>
                <FontAwesomeIcon size={20} icon={faAngleLeft} color={'#ffffff'} />
              </View>
            </TouchableOpacity>
          )
        })}
      />
    </Stack.Navigator>
  )
}

function TabBarItem(props: TabBarProps) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Image source={props.isFocused ? props.activeTabIcon : props.inactiveTabIcon} />
      {props.tabTitle ?
        <Text style={{ fontSize: 12, color: props.isFocused ? theme.colors.secondary : '#ffffff', paddingTop: 5 }}>{props.tabTitle}</Text>
        : <View />
      }
    </View>
  )
}

export default function App() {

  useEffect(() => {
    // store mock data with async storage
    storeMockData();
  }, []);

  const storeMockData = async () => {
    try {
      await AsyncStorage.setItem('notesData', JSON.stringify(notes));
    } catch (e) {
      // error saving data
      console.log("Error: ", e);
    }
  }

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen
            name='HomeTab'
            component={HomeTab}
            options={{
              title: 'Home',
              headerShown: false
            }}
          />
          <Stack.Screen
            name='Settings'
            component={Settings}
            options={{
              title: 'Settings',
              headerStyle: {
                backgroundColor: theme.colors.primary,
                height: 112
              },
              headerTitleAlign: "left",
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerBackImage: (props) => (
                <View style={{ paddingLeft: 20 }}>
                  <FontAwesomeIcon size={20} icon={faAngleLeft} color={'#ffffff'} />
                </View>
              ),
              headerTintColor: '#ffffff',
              headerTitleStyle: {
                fontWeight: "600",
                fontSize: 24,
                lineHeight: 36,
              }
            }}
          />
          <Stack.Screen
            name='NewNote'
            component={NewNote}
            options={({ route, navigation }) => ({
              title: 'New note',
              headerStyle: {
                backgroundColor: theme.colors.primary,
                height: 112
              },
              headerTitleAlign: "left",
              headerShadowVisible: false,
              headerTintColor: '#ffffff',
              headerTitleStyle: {
                fontWeight: "600",
                fontSize: 24,
                lineHeight: 36
              },
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <View style={{ paddingLeft: 20 }}>
                    <FontAwesomeIcon size={20} icon={faAngleLeft} color={'#ffffff'} />
                  </View>
                </TouchableOpacity>
              )
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>

  )
}