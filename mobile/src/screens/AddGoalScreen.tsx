import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FormScreen } from '../components/FormScreen';
import { GradientButton } from '../components/GradientButton';
import { Input } from '../components/Input';
import { goalService } from '../services/goalService';
import { todayISO } from '../utils/format';
import type { MainStackParamList } from '../navigation/types';

export function AddGoalScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const [title, setTitle] = useState('');
  const [goalDate, setGoalDate] = useState(todayISO());
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Please enter a goal title.');
      return;
    }
    if (!goalDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
      Alert.alert('Validation', 'Date must be YYYY-MM-DD.');
      return;
    }

    setLoading(true);
    try {
      await goalService.create({ title: title.trim(), goalDate });
      Alert.alert('Success', 'Goal added.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert(
        'Could not add goal',
        error instanceof Error ? error.message : 'Unknown error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormScreen
      title="New goal"
      subtitle="Plan something for today"
      onBack={() => navigation.goBack()}
    >
      <Input
        label="Goal"
        value={title}
        onChangeText={setTitle}
        placeholder="Cook dinner together..."
      />
      <Input
        label="Date"
        value={goalDate}
        onChangeText={setGoalDate}
        placeholder={todayISO()}
      />
      <GradientButton title="Save goal" onPress={handleSubmit} loading={loading} />
    </FormScreen>
  );
}
