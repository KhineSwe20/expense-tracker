import React from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients } from '../theme/colors';

interface GradientBackgroundProps extends ViewProps {
  variant?: 'primary' | 'soft' | 'auth';
  children: React.ReactNode;
}

const variantColors = {
  primary: gradients.primary,
  soft: gradients.soft,
  auth: [colors.pinkLight, colors.purpleLight, colors.purple] as const,
};

export function GradientBackground({
  variant = 'primary',
  style,
  children,
  ...props
}: GradientBackgroundProps) {
  return (
    <View style={[styles.container, style]} {...props}>
      <LinearGradient
        colors={[...variantColors[variant]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
