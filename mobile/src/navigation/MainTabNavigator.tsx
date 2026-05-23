import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ExpenseListScreen } from '../screens/ExpenseListScreen';
import { DailyGoalsScreen } from '../screens/DailyGoalsScreen';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.purple,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused, color, size }) => {
          const icons: Record<keyof MainTabParamList, keyof typeof Ionicons.glyphMap> = {
            Dashboard: focused ? 'home' : 'home-outline',
            ExpenseList: focused ? 'list' : 'list-outline',
            DailyGoals: focused ? 'flag' : 'flag-outline',
          };
          return (
            <View style={focused ? styles.iconActive : undefined}>
              <Ionicons name={icons[route.name]} size={size} color={color} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="ExpenseList" component={ExpenseListScreen} options={{ title: 'Expenses' }} />
      <Tab.Screen name="DailyGoals" component={DailyGoalsScreen} options={{ title: 'Goals' }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopWidth: 0,
    height: 64,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    elevation: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  iconActive: {
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    padding: 4,
  },
});
