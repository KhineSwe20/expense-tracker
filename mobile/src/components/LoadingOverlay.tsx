import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';

export function LoadingOverlay() {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color={colors.purple} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(253, 244, 255, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
});
