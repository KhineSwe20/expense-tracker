import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { shadows } from '../theme/shadows';

interface GradientButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  size?: 'md' | 'lg';
}

export function GradientButton({
  title,
  loading = false,
  disabled,
  style,
  size = 'lg',
  ...props
}: GradientButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.wrapper,
        size === 'lg' ? styles.lg : styles.md,
        shadows.button,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
      disabled={isDisabled}
      {...props}
    >
      <LinearGradient
        colors={[...gradients.primary]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[styles.gradient, size === 'lg' ? styles.lg : styles.md]}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={[styles.text, size === 'md' && styles.textMd]}>{title}</Text>
        )}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lg: {
    minHeight: 56,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
  },
  md: {
    minHeight: 44,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
  },
  text: {
    color: colors.textOnGradient,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  textMd: {
    fontSize: 15,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.55,
  },
});
