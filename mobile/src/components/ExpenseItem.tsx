import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SurfaceCard } from './SurfaceCard';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { formatCurrency, formatDate } from '../utils/format';
import type { Expense } from '../types';

interface ExpenseItemProps {
  expense: Expense;
}

export function ExpenseItem({ expense }: ExpenseItemProps) {
  return (
    <SurfaceCard style={styles.card} padding="md" elevated={false}>
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <Ionicons name="wallet-outline" size={22} color={colors.purple} />
        </View>
        <View style={styles.info}>
          <Text style={styles.description}>
            {expense.description || 'Expense'}
          </Text>
          <Text style={styles.meta}>
            {formatDate(expense.expenseDate)}
            {expense.paidByName ? ` · ${expense.paidByName}` : ''}
          </Text>
        </View>
        <Text style={styles.amount}>{formatCurrency(expense.amount)}</Text>
      </View>
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  info: {
    flex: 1,
    marginRight: spacing.sm,
  },
  description: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  meta: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.pink,
  },
});
