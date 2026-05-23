import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SurfaceCard } from './SurfaceCard';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';

interface StatCardProps {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  tint?: string;
  bgTint?: string;
}

export function StatCard({
  label,
  value,
  icon,
  tint = colors.purple,
  bgTint = colors.primaryLight,
}: StatCardProps) {
  return (
    <SurfaceCard style={styles.card} padding="md">
      <View style={[styles.iconWrap, { backgroundColor: bgTint }]}>
        <Ionicons name={icon} size={20} color={tint} />
      </View>
      <Text style={[styles.value, { color: tint }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '30%',
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  value: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});
