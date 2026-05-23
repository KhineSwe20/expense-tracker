import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { shadows } from '../theme/shadows';

interface BalanceHeroProps {
  label: string;
  amount: string;
  subtitle?: string;
}

export function BalanceHero({ label, amount, subtitle }: BalanceHeroProps) {
  return (
    <LinearGradient
      colors={[...gradients.primary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, shadows.soft]}
    >
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.amount}>{amount}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <View style={styles.decor}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    minHeight: 140,
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
    marginBottom: spacing.xs,
  },
  amount: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.textOnGradient,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginTop: spacing.sm,
  },
  decor: {
    position: 'absolute',
    right: -20,
    top: -20,
  },
  circle: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  circle1: {
    width: 100,
    height: 100,
    right: 0,
    top: 0,
  },
  circle2: {
    width: 60,
    height: 60,
    right: 60,
    top: 50,
  },
});
