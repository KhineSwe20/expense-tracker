import React from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { shadows } from '../theme/shadows';

export function AuthFormSheet({ style, children, ...props }: ViewProps) {
  return (
    <View style={[styles.sheet, shadows.card, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    flex: 1,
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    marginTop: spacing.lg,
  },
});
