import React, { useRef } from 'react';
import { Text, TouchableOpacity, Animated } from 'react-native';
import { styles } from './index.styles';

interface TabBtnProps {
  icon: string;
  label: string;
  active: boolean;
  onPress: () => void;
}

export function TabBtn({ icon, label, active, onPress }: TabBtnProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.85, duration: 80, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 200, friction: 8, useNativeDriver: true }),
    ]).start();
    onPress();
  };

  return (
    <TouchableOpacity style={styles.tabBtn} onPress={handlePress} activeOpacity={1}>
      <Animated.View style={[styles.tabBtnInner, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.tabIcon}>{icon}</Text>
        <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}