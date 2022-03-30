import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons';
import EditScreen from '../pages/EditScreen';
import InsertScreen from '../pages/InsertScreen';
import SearchScreen from '../pages/SearchScreen';

const Tab = createBottomTabNavigator();

const MainTab = () => {
    return (
        <Tab.Navigator
        screenOptions={({route})=>({
            tabBarLabel: '',
            tabBarIcon: ( {focused, color, size} ) => {
                let iconName = null;
                switch(route.name) {
                    case 'Search':
                        iconName = 'ios-search'
                        break;
                    case 'Edit':
                        iconName = 'ios-pencil'
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
            <Tab.Screen name='Edit' component={EditScreen} options={{title: 'Editar'}}/>
        </Tab.Navigator>
    );
}

export default MainTab;