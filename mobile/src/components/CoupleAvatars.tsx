import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

interface CoupleAvatarsProps {
  nameA?: string;
  nameB?: string;
}

function initials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function CoupleAvatars({ nameA = 'You', nameB = 'Partner' }: CoupleAvatarsProps) {
  return (
    <View style={styles.row}>
      <View style={[styles.avatar, styles.avatarA]}>
        <Text style={styles.initials}>{initials(nameA)}</Text>
      </View>
      <View style={[styles.avatar, styles.avatarB]}>
        <Text style={styles.initials}>{initials(nameB)}</Text>
      </View>
      <View style={styles.heart}>
        <Text style={styles.heartIcon}>♥</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 88,
    height: 44,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.surface,
  },
  avatarA: {
    backgroundColor: colors.pink,
    zIndex: 2,
  },
  avatarB: {
    backgroundColor: colors.purple,
    marginLeft: -14,
    zIndex: 1,
  },
  initials: {
    color: colors.textOnGradient,
    fontWeight: '700',
    fontSize: 14,
  },
  heart: {
    position: 'absolute',
    right: -4,
    bottom: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  heartIcon: {
    color: colors.pink,
    fontSize: 11,
  },
});
