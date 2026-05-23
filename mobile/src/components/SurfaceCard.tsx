import React from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { shadows } from '../theme/shadows';

interface SurfaceCardProps extends ViewProps {
  elevated?: boolean;
  padding?: keyof typeof spacing;
}

export function SurfaceCard({
  style,
  children,
  elevated = true,
  padding = 'md',
  ...props
}: SurfaceCardProps) {
  return (
    <View
      style={[
        styles.card,
        { padding: spacing[padding] },
        elevated && shadows.card,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
});
