import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';

interface QuickActionProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color?: string;
  bgColor?: string;
  onPress: () => void;
}

export function QuickAction({
  icon,
  label,
  color = colors.purple,
  bgColor = colors.primaryLight,
  onPress,
}: QuickActionProps) {
  return (
    <Pressable style={styles.wrapper} onPress={onPress}>
      <View style={[styles.iconWrap, { backgroundColor: bgColor }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flex: 1,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
