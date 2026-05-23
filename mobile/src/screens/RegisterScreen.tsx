import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FormScreen } from '../components/FormScreen';
import { GradientButton } from '../components/GradientButton';
import { Input } from '../components/Input';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import type { AuthStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password) {
      Alert.alert('Validation', 'Please fill in name, email, and password.');
      return;
    }
    setLoading(true);
    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
        inviteCode: inviteCode.trim() || undefined,
      });
    } catch (error) {
      Alert.alert(
        'Registration failed',
        error instanceof Error ? error.message : 'Unknown error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormScreen
      title="Join together"
      subtitle="Create or link your couple account"
      onBack={() => navigation.goBack()}
    >
      <Input label="Your name" value={name} onChangeText={setName} placeholder="Alex" />
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
        placeholder="Min. 6 characters"
      />
      <Input
        label="Partner invite code"
        value={inviteCode}
        onChangeText={setInviteCode}
        autoCapitalize="characters"
        placeholder="Optional — ABC123"
      />

      <GradientButton title="Create account" onPress={handleRegister} loading={loading} />

      <Pressable onPress={() => navigation.goBack()} style={styles.linkWrap}>
        <Text style={styles.link}>
          Already have an account? <Text style={styles.linkBold}>Sign in</Text>
        </Text>
      </Pressable>
    </FormScreen>
  );
}

const styles = StyleSheet.create({
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
