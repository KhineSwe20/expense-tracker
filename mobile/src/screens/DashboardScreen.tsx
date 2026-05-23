import React, { useCallback, useState } from 'react';
import {
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BalanceHero } from '../components/BalanceHero';
import { CoupleAvatars } from '../components/CoupleAvatars';
import { EmptyState } from '../components/EmptyState';
import { ExpenseItem } from '../components/ExpenseItem';
import { GradientBackground } from '../components/GradientBackground';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { QuickAction } from '../components/QuickAction';
import { SectionTitle } from '../components/SectionTitle';
import { StatCard } from '../components/StatCard';
import { useAuth } from '../context/AuthContext';
import { dashboardService } from '../services/dashboardService';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { formatCurrency } from '../utils/format';
import type { DashboardSummary } from '../types';
import type { MainStackParamList, MainTabParamList } from '../navigation/types';

type Nav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Dashboard'>,
  NativeStackNavigationProp<MainStackParamList>
>;

export function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const { user, logout } = useAuth();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadSummary = useCallback(async () => {
    try {
      const data = await dashboardService.getSummary();
      setSummary(data);
    } catch {
      setSummary(null);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadSummary().finally(() => setLoading(false));
    }, [loadSummary])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadSummary();
    setRefreshing(false);
  };

  return (
    <View style={styles.root}>
      <GradientBackground variant="auth" style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.hello}>Hello,</Text>
            <Text style={styles.name}>{user?.name ?? 'there'} ✨</Text>
          </View>
          <View style={styles.headerRight}>
            <CoupleAvatars nameA={user?.name} />
            <Pressable onPress={logout} style={styles.logout}>
              <Ionicons name="log-out-outline" size={22} color={colors.textOnGradient} />
            </Pressable>
          </View>
        </View>
      </GradientBackground>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.purple}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {loading && !summary ? <LoadingOverlay /> : null}

        <BalanceHero
          label="Total spent this month"
          amount={formatCurrency(summary?.totalExpensesThisMonth ?? 0)}
          subtitle={`${summary?.expenseCount ?? 0} shared expenses`}
        />

        <View style={styles.quickRow}>
          <QuickAction
            icon="add-circle"
            label="Add"
            color={colors.pink}
            bgColor={colors.accentLight}
            onPress={() => navigation.navigate('AddExpense')}
          />
          <QuickAction
            icon="list"
            label="Expenses"
            onPress={() => navigation.navigate('ExpenseList')}
          />
          <QuickAction
            icon="flag"
            label="Goals"
            color={colors.purpleDark}
            bgColor={colors.primaryLight}
            onPress={() => navigation.navigate('DailyGoals')}
          />
        </View>

        <View style={styles.stats}>
          <StatCard
            label="Expenses"
            value={String(summary?.expenseCount ?? 0)}
            icon="receipt-outline"
            tint={colors.purple}
          />
          <StatCard
            label="Goals done"
            value={`${summary?.goalsCompletedToday ?? 0}/${summary?.goalsTotalToday ?? 0}`}
            icon="heart-outline"
            tint={colors.pink}
            bgTint={colors.accentLight}
          />
        </View>

        <SectionTitle
          title="Recent expenses"
          actionLabel="See all"
          onAction={() => navigation.navigate('ExpenseList')}
        />

        {summary?.recentExpenses?.length ? (
          summary.recentExpenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} />
          ))
        ) : (
          <EmptyState
            title="No expenses yet"
            message="Tap Add to log your first shared purchase."
            icon="wallet-outline"
          />
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
    paddingBottom: spacing.xl + spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
  },
  hello: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
  name: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.textOnGradient,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logout: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  scroll: {
    flex: 1,
    marginTop: -spacing.xl,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  quickRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  stats: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
});
