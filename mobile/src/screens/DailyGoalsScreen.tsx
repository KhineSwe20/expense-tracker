import React, { useCallback, useState } from 'react';
import { Alert, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { EmptyState } from '../components/EmptyState';
import { GoalItem } from '../components/GoalItem';
import { GradientButton } from '../components/GradientButton';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { SectionTitle } from '../components/SectionTitle';
import { SurfaceCard } from '../components/SurfaceCard';
import { goalService } from '../services/goalService';
import { colors, gradients } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { formatDate, todayISO } from '../utils/format';
import type { Goal } from '../types';
import type { MainStackParamList, MainTabParamList } from '../navigation/types';

type Nav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'DailyGoals'>,
  NativeStackNavigationProp<MainStackParamList>
>;

export function DailyGoalsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const today = todayISO();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadGoals = useCallback(async () => {
    try {
      const data = await goalService.getByDate(today);
      setGoals(data);
    } catch (error) {
      Alert.alert(
        'Could not load goals',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }, [today]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadGoals().finally(() => setLoading(false));
    }, [loadGoals])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadGoals();
    setRefreshing(false);
  };

  const handleToggle = async (goal: Goal) => {
    try {
      const updated = await goalService.toggleComplete(goal.id, !goal.completed);
      setGoals((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
    } catch (error) {
      Alert.alert(
        'Could not update goal',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  };

  const completedCount = goals.filter((g) => g.completed).length;
  const progress = goals.length ? completedCount / goals.length : 0;

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Text style={styles.dateLabel}>Today</Text>
        <Text style={styles.date}>{formatDate(today)}</Text>

        <SurfaceCard style={styles.progressCard} padding="md">
          <View style={styles.progressRow}>
            <Text style={styles.progressText}>
              {completedCount} of {goals.length} completed
            </Text>
            <Text style={styles.progressPct}>{Math.round(progress * 100)}%</Text>
          </View>
          <View style={styles.track}>
            <LinearGradient
              colors={[...gradients.primary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.fill, { width: `${Math.max(progress * 100, 4)}%` }]}
            />
          </View>
        </SurfaceCard>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.purple} />
        }
      >
        {loading && !goals.length ? <LoadingOverlay /> : null}

        <SectionTitle title="Daily goals" />
        <GradientButton
          title="+ Add goal"
          onPress={() => navigation.navigate('AddGoal')}
          style={styles.addBtn}
          size="md"
        />

        {goals.length ? (
          goals.map((goal) => (
            <GoalItem key={goal.id} goal={goal} onToggle={handleToggle} />
          ))
        ) : (
          !loading && (
            <EmptyState
              title="No goals for today"
              message="Set something fun or practical to do together."
              icon="flag-outline"
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
    paddingBottom: spacing.md,
    backgroundColor: colors.purpleSoft,
    borderBottomLeftRadius: radius.xxl,
    borderBottomRightRadius: radius.xxl,
  },
  dateLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: spacing.md,
    fontWeight: '600',
  },
  date: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.md,
  },
  progressCard: {
    marginBottom: spacing.sm,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  progressPct: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.purple,
  },
  track: {
    height: 8,
    backgroundColor: colors.borderLight,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radius.full,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  addBtn: {
    marginBottom: spacing.lg,
  },
});
