import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { HOSPEDAJES } from '../../logic/data/hospedajes.data';
import { styles } from '../index.styles';
import { HospedajeCard } from './HospedajeCard';

export function TabHospedajes() {
  return (
    <ScrollView 
      style={styles.scroll} 
      contentContainerStyle={styles.scrollContent} 
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.appName}>Stayly</Text>
          <Text style={styles.headerSub}>Encuentra tu hospedaje ideal</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>🏠</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Hospedajes disponibles</Text>
        <View style={styles.sectionBadge}>
          <Text style={styles.sectionCount}>{HOSPEDAJES.length} lugares</Text>
        </View>
      </View>

      <View style={styles.list}>
        {HOSPEDAJES.map((item, i) => (
          <HospedajeCard key={item.id} item={item} index={i} />
        ))}
      </View>
    </ScrollView>
  );
}