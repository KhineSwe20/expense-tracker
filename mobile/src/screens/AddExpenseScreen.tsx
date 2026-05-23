import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FormScreen } from '../components/FormScreen';
import { GradientButton } from '../components/GradientButton';
import { Input } from '../components/Input';
import { expenseService } from '../services/expenseService';
import { todayISO } from '../utils/format';
import type { MainStackParamList } from '../navigation/types';

export function AddExpenseScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [expenseDate, setExpenseDate] = useState(todayISO());
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const parsed = parseFloat(amount);
    if (!parsed || parsed <= 0) {
      Alert.alert('Validation', 'Please enter a valid amount.');
      return;
    }
    if (!expenseDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
      Alert.alert('Validation', 'Date must be YYYY-MM-DD.');
      return;
    }

    setLoading(true);
    try {
      await expenseService.create({
        amount: parsed,
        description: description.trim() || undefined,
        expenseDate,
      });
      Alert.alert('Success', 'Expense added.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert(
        'Could not add expense',
        error instanceof Error ? error.message : 'Unknown error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormScreen
      title="New expense"
      subtitle="Log shared spending"
      onBack={() => navigation.goBack()}
    >
      <Input
        label="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="decimal-pad"
        placeholder="0.00"
      />
      <Input
        label="Description"
        value={description}
        onChangeText={setDescription}
        placeholder="Dinner, groceries..."
      />
      <Input
        label="Date"
        value={expenseDate}
        onChangeText={setExpenseDate}
        placeholder={todayISO()}
      />
      <GradientButton title="Save expense" onPress={handleSubmit} loading={loading} />
    </FormScreen>
  );
}
