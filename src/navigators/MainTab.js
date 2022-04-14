import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons';
import EditStack from './EditStack';
import InsertScreen from '../pages/InsertScreen';
import SearchScreen from '../pages/SearchScreen';

const Tab = createBottomTabNavigator();

const MainTab = () => {
    return (
        <Tab.Navigator
        screenOptions={({route})=>({
            tabBarHideOnKeyboard: true,
            tabBarLabel: '',
            tabBarIcon: ( {focused, color, size} ) => {
                let iconName = null;
                switch(route.name) {
                    case 'Search':
                        iconName = 'ios-search'
                        break;
                    case 'EditScreen':
                        iconName = 'ios-eye'
                        break;
                    case 'Insert':
                        iconName = 'ios-add'
                        break;
                }
                return <Icon name={iconName} size={size} color={color} />;
            }
        })}
        >
            <Tab.Screen name='Search' component={SearchScreen} options={{title: 'Consultar'}}/>
            <Tab.Screen name='Insert' component={InsertScreen} options={{title: 'Inserir'}}/>
            <Tab.Screen name='EditScreen' component={EditStack} options={{headerShown:false}}  />
        </Tab.Navigator>
    );
}

export default MainTab;