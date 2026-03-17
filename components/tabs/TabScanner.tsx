import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { router } from 'expo-router';
import { styles } from '../index.styles';

export function TabScanner() {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacAnim  = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, tension: 50, friction: 8, useNativeDriver: true }),
      Animated.timing(opacAnim,  { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
    
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.12, duration: 1500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1,    duration: 1500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.centerTab}>
      <Animated.View style={{ opacity: opacAnim, transform: [{ scale: scaleAnim }], alignItems: 'center', gap: 24 }}>
        <View style={styles.scanIconWrap}>
          <Animated.View style={[styles.scanRing, { transform: [{ scale: pulseAnim }] }]} />
          <View style={styles.scanIconBadge}><Text style={styles.scanIconText}>📷</Text></View>
        </View>
        <View style={{ alignItems: 'center', gap: 8 }}>
          <Text style={styles.scanTitle}>Escanear comprobante</Text>
          <Text style={styles.scanSub}>Valida el QR de una reserva{"\n"}en cualquier momento</Text>
        </View>
        <TouchableOpacity style={styles.btnScan} onPress={() => router.push('/scanner' as any)}>
          <Text style={styles.btnScanText}>Abrir escáner →</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}