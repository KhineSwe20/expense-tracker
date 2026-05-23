import { Platform } from 'react-native';

const LOCALHOST =
  Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? `${LOCALHOST}/api`;
