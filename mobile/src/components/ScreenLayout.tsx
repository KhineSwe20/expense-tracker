import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  type ScrollViewProps,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

interface ScreenLayoutProps extends ScrollViewProps {
  scroll?: boolean;
  padded?: boolean;
  background?: 'default' | 'muted';
}

export function ScreenLayout({
  children,
  scroll = true,
  padded = true,
  background = 'default',
  contentContainerStyle,
  ...props
}: ScreenLayoutProps) {
  const bg =
    background === 'muted' ? colors.surfaceMuted : colors.background;

  const content = <View style={[padded && styles.padded]}>{children}</View>;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bg }]} edges={['left', 'right']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {scroll ? (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
            showsVerticalScrollIndicator={false}
            {...props}
          >
            {content}
          </ScrollView>
        ) : (
          <View style={[styles.flex, padded && styles.padded]}>{children}</View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
});
