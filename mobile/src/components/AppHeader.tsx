import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
  light?: boolean;
}

export function AppHeader({ title, subtitle, onBack, right, light = false }: AppHeaderProps) {
  const insets = useSafeAreaInsets();
  const textColor = light ? colors.textOnGradient : colors.text;
  const subColor = light ? 'rgba(255,255,255,0.8)' : colors.textSecondary;

  return (
    <View style={[styles.wrap, { paddingTop: insets.top + spacing.sm }]}>
      <View style={styles.row}>
        {onBack ? (
          <Pressable onPress={onBack} style={styles.back} hitSlop={12}>
            <Ionicons
              name="chevron-back"
              size={24}
              color={light ? colors.textOnGradient : colors.purple}
            />
          </Pressable>
        ) : (
          <View style={styles.backPlaceholder} />
        )}
        <View style={styles.center}>
          <Text style={[styles.title, { color: textColor }]}>{title}</Text>
          {subtitle ? (
            <Text style={[styles.subtitle, { color: subColor }]}>{subtitle}</Text>
          ) : null}
        </View>
        <View style={styles.right}>{right ?? <View style={styles.backPlaceholder} />}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backPlaceholder: {
    width: 40,
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  right: {
    width: 40,
    alignItems: 'flex-end',
  },
});
