import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ShowAllScreen from '../pages/ShowAllScreen'
import EditScreen from '../pages/EditScreen'

const EditStack = createStackNavigator();

export default () => (
        <EditStack.Navigator>
            <EditStack.Screen name="Show" component={ShowAllScreen} options={{name: 'Vizualizar'}} />
            <EditStack.Screen name="Edit" component={EditScreen} options={{name: 'Editar'}} />
        </EditStack.Navigator>
    )