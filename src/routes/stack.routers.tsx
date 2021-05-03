import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import colors from '../styles/colors';

import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import { PlantSelect } from '../pages/PlantSelect/Index';
import { PlantSave } from '../pages/PlantSave/Index';
import { PagesEnum } from '../shared/constants';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            }
        }}
    >

        <stackRoutes.Screen
            name="Welcome"
            component={Welcome}
        />

        <stackRoutes.Screen
            name={PagesEnum.UserIndentification}
            component={UserIdentification}
        />

        <stackRoutes.Screen
            name={PagesEnum.Confirmation}
            component={Confirmation}
        />

        <stackRoutes.Screen
            name={PagesEnum.PlantSelect}
            component={PlantSelect}
        />

        <stackRoutes.Screen
            name={PagesEnum.PlantSave}
            component={PlantSave}
        />

    </stackRoutes.Navigator>
)

export default AppRoutes;
