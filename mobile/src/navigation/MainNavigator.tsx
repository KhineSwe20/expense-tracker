import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddExpenseScreen } from '../screens/AddExpenseScreen';
import { AddGoalScreen } from '../screens/AddGoalScreen';
import { colors } from '../theme/colors';
import { MainTabNavigator } from './MainTabNavigator';
import type { MainStackParamList } from './types';

const Stack = createNativeStackNavigator<MainStackParamList>();

export function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen
        name="AddExpense"
        component={AddExpenseScreen}
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="AddGoal"
        component={AddGoalScreen}
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
      />
    </Stack.Navigator>
  );
}
