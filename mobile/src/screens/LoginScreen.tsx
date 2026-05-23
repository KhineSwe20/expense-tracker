import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthFormSheet } from '../components/AuthFormSheet';
import { GradientBackground } from '../components/GradientBackground';
import { GradientButton } from '../components/GradientButton';
import { Input } from '../components/Input';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import type { AuthStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Validation', 'Please enter email and password.');
      return;
    }
    setLoading(true);
    try {
      await login({ email: email.trim(), password });
    } catch (error) {
      Alert.alert('Login failed', error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <GradientBackground variant="auth" style={[styles.hero, { paddingTop: insets.top }]}>
        <Text style={styles.emoji}>💑</Text>
        <Text style={styles.brand}>Couple Expense</Text>
        <Text style={styles.tagline}>Track love & spending together</Text>
      </GradientBackground>

      <AuthFormSheet>
        <Text style={styles.welcome}>Welcome back</Text>
        <Text style={styles.hint}>Sign in to your shared wallet</Text>

        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="you@example.com"
        />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="••••••••"
        />

        <GradientButton title="Sign in" onPress={handleLogin} loading={loading} />

        <Pressable onPress={() => navigation.navigate('Register')} style={styles.linkWrap}>
          <Text style={styles.link}>
            New here? <Text style={styles.linkBold}>Create account</Text>
          </Text>
        </Pressable>
      </AuthFormSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: spacing.xl,
    minHeight: 260,
  },
  emoji: {
    fontSize: 56,
    marginBottom: spacing.md,
  },
  brand: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textOnGradient,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    marginTop: spacing.sm,
  },
  welcome: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  hint: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  linkWrap: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  link: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  linkBold: {
    color: colors.purple,
    fontWeight: '700',
  },
});
