// Use the deployed Render backend by default so the APK works everywhere.
// For local testing with Expo Go, you may override this in your terminal:
// PowerShell: $env:EXPO_PUBLIC_API_URL="http://YOUR_LAPTOP_IP:8080/api"
// CMD: set EXPO_PUBLIC_API_URL=http://YOUR_LAPTOP_IP:8080/api
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? 'https://expense-tracker-ej2p.onrender.com/api';
