export const colors = {
  pink: '#EC4899',
  pinkLight: '#F9A8D4',
  pinkSoft: '#FDF2F8',
  purple: '#8B5CF6',
  purpleDark: '#6D28D9',
  purpleLight: '#C4B5FD',
  purpleSoft: '#F5F3FF',

  primary: '#8B5CF6',
  primaryDark: '#6D28D9',
  primaryLight: '#EDE9FE',
  accent: '#EC4899',
  accentLight: '#FCE7F3',

  background: '#FDF4FF',
  surface: '#FFFFFF',
  surfaceMuted: '#FAF5FF',

  text: '#1E1B4B',
  textSecondary: '#6B7280',
  textOnGradient: '#FFFFFF',
  textMuted: '#A78BFA',

  border: '#E9D5FF',
  borderLight: '#F3E8FF',

  error: '#F43F5E',
  success: '#10B981',
  warning: '#F59E0B',

  shadow: 'rgba(109, 40, 217, 0.12)',
  shadowPink: 'rgba(236, 72, 153, 0.2)',

  gradientStart: '#F472B6',
  gradientMid: '#C084FC',
  gradientEnd: '#8B5CF6',
} as const;

export const gradients = {
  primary: [colors.gradientStart, colors.gradientMid, colors.gradientEnd] as const,
  soft: [colors.pinkSoft, colors.purpleSoft] as const,
  card: ['#FFFFFF', '#FDF4FF'] as const,
};
