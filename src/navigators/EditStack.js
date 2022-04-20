import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ShowAllScreen from '../pages/ShowAllScreen'
import EditScreen from '../pages/EditScreen'

const EditStack = createStackNavigator();

export default () => (
        <EditStack.Navigator>
            <EditStack.Screen name="Show" component={ShowAllScreen} options={{title: 'Vizualizar'}} />
            <EditStack.Screen name="Edit" component={EditScreen} options={{title: 'Editar'}} />
        </EditStack.Navigator>
    )