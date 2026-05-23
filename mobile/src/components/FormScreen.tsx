import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientBackground } from './GradientBackground';
import { AppHeader } from './AppHeader';
import { SurfaceCard } from './SurfaceCard';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

interface FormScreenProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
  children: React.ReactNode;
}

export function FormScreen({ title, subtitle, onBack, children }: FormScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <GradientBackground variant="auth" style={styles.header}>
        <AppHeader title={title} subtitle={subtitle} onBack={onBack} light />
      </GradientBackground>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <SurfaceCard style={styles.form} padding="lg">
          {children}
        </SurfaceCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingBottom: spacing.xl,
  },
  scroll: {
    flex: 1,
    marginTop: -spacing.lg,
  },
  content: {
    paddingHorizontal: spacing.lg,
  },
  form: {
    marginBottom: spacing.lg,
  },
});
