import React, { useCallback, useState } from 'react';
import { Alert, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState } from '../components/EmptyState';
import { ExpenseItem } from '../components/ExpenseItem';
import { GradientBackground } from '../components/GradientBackground';
import { GradientButton } from '../components/GradientButton';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { SectionTitle } from '../components/SectionTitle';
import { expenseService } from '../services/expenseService';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import type { Expense } from '../types';
import type { MainStackParamList, MainTabParamList } from '../navigation/types';

type Nav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'ExpenseList'>,
  NativeStackNavigationProp<MainStackParamList>
>;

export function ExpenseListScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadExpenses = useCallback(async () => {
    try {
      const data = await expenseService.getAll();
      setExpenses(data);
    } catch (error) {
      Alert.alert(
        'Could not load expenses',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadExpenses().finally(() => setLoading(false));
    }, [loadExpenses])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadExpenses();
    setRefreshing(false);
  };

  return (
    <View style={styles.root}>
      <GradientBackground variant="soft" style={[styles.header, { paddingTop: insets.top }]}>
        <SectionTitle title="All expenses" />
      </GradientBackground>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.purple} />
        }
      >
        {loading && !expenses.length ? <LoadingOverlay /> : null}

        <GradientButton
          title="+ Add expense"
          onPress={() => navigation.navigate('AddExpense')}
          style={styles.addBtn}
          size="md"
        />

        {expenses.length ? (
          expenses.map((expense) => <ExpenseItem key={expense.id} expense={expense} />)
        ) : (
          !loading && (
            <EmptyState
              title="No expenses yet"
              message="Start tracking what you spend together."
              icon="wallet-outline"
            />
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  addBtn: {
    marginBottom: spacing.lg,
  },
});
