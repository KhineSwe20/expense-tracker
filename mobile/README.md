# Couple Expense Tracker (Mobile)

React Native Expo app for tracking shared couple expenses and daily goals.

## Stack

- Expo SDK 52
- React Navigation (native stack)
- Axios API client with JWT storage
- Reusable UI components

## Screens

| Screen | Description |
|--------|-------------|
| Login | Sign in |
| Register | Create account / join couple via invite code |
| Dashboard | Summary stats and quick actions |
| Add Expense | Create a shared expense |
| Expense List | All expenses |
| Daily Goals | Today's goals with toggle |
| Add Goal | Create a daily goal |

## Getting started

```bash
npm install
npm start
```

Set the API URL (Spring Boot backend default port 8080):

```bash
# .env or shell
EXPO_PUBLIC_API_URL=http://localhost:8080/api
```

- **Android emulator:** uses `http://10.0.2.2:8080/api` by default
- **Physical device:** use your machine's LAN IP, e.g. `http://192.168.1.10:8080/api`

## Expected API endpoints

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/auth/login` | Login |
| POST | `/auth/register` | Register |
| GET | `/auth/me` | Current user |
| GET | `/dashboard` | Dashboard summary |
| GET | `/expenses` | List expenses |
| POST | `/expenses` | Create expense |
| GET | `/goals?date=YYYY-MM-DD` | Goals for date |
| POST | `/goals` | Create goal |
| PATCH | `/goals/:id` | Toggle goal completion |

## Project structure

```
src/
  components/   # Button, Input, Card, etc.
  context/      # AuthProvider
  navigation/   # Auth + Main stacks
  screens/      # All screens
  services/     # axios API layer
  theme/        # colors, spacing
  types/        # TypeScript models
  utils/        # formatters
```
