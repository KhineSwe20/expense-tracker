import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SurfaceCard } from './SurfaceCard';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import type { Goal } from '../types';

interface GoalItemProps {
  goal: Goal;
  onToggle?: (goal: Goal) => void;
}

export function GoalItem({ goal, onToggle }: GoalItemProps) {
  return (
    <Pressable onPress={() => onToggle?.(goal)} disabled={!onToggle}>
      <SurfaceCard
        style={[styles.card, goal.completed && styles.completed]}
        padding="md"
        elevated={false}
      >
        <View style={styles.row}>
          <View style={[styles.checkbox, goal.completed && styles.checkboxDone]}>
            {goal.completed ? (
              <Ionicons name="checkmark" size={16} color="#fff" />
            ) : null}
          </View>
          <View style={styles.content}>
            <Text style={[styles.title, goal.completed && styles.titleDone]}>
              {goal.title}
            </Text>
            {goal.userName ? (
              <Text style={styles.userName}>{goal.userName}</Text>
            ) : null}
          </View>
          <Ionicons
            name={goal.completed ? 'sparkles' : 'ellipse-outline'}
            size={20}
            color={goal.completed ? colors.pink : colors.border}
          />
        </View>
      </SurfaceCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.sm,
  },
  completed: {
    backgroundColor: colors.accentLight,
    borderColor: colors.pinkLight,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: radius.sm,
    borderWidth: 2,
    borderColor: colors.purple,
    marginRight: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: colors.purple,
    borderColor: colors.purple,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  userName: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
