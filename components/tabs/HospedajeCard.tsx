import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import { router } from 'expo-router';
import { Hospedaje } from '../../logic/data/hospedajes.data';
import { styles } from '../index.styles';

interface Props {
  item: Hospedaje;
  index: number;
}

export function HospedajeCard({ item, index }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { 
        toValue: 1, 
        duration: 400, 
        delay: index * 100, 
        useNativeDriver: true 
      }),
      Animated.timing(slideAnim, { 
        toValue: 0, 
        duration: 400, 
        delay: index * 100, 
        useNativeDriver: true 
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push(item.ruta as any)}
        activeOpacity={0.85}
      >
        <View style={styles.imageContainer}>
          <Image source={item.imagen} style={styles.image} resizeMode="cover" />
          <View style={styles.imageOverlay} />
          <View style={[styles.tag, { backgroundColor: item.tagColor }]}>
            <Text style={styles.tagText}>{item.tag}</Text>
          </View>
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>{item.precio}</Text>
            <Text style={styles.priceNight}>/noche</Text>
          </View>
        </View>
        <View style={styles.info}>
          <Text style={styles.nombre} numberOfLines={1}>{item.nombre}</Text>
          <View style={styles.ubicacionRow}>
    <Text style={styles.pin}>📍</Text>
    <Text style={styles.ubicacion} numberOfLines={1}>{item.ubicacion}</Text>
  </View>
          <Text style={styles.descripcion} numberOfLines={2}>{item.descripcion}</Text>
          <View style={styles.cta}>
            <Text style={styles.ctaText}>Ver hospedaje →</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}