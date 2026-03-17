import React from 'react';
import { View, Text, Animated } from 'react-native';
import { formatDate } from '../../logic/pago/usePago';
import { s, AQUA } from '../../components/pago.styles';

export function ResumenPago({ params, checkin, checkout, nights, montoTotal, scale }: any) {
  return (
    <Animated.View style={[s.resumenBox, { transform: [{ scale }] }]}>
      <Text style={s.resumenLabel}>Hospedaje</Text>
      <Text style={s.resumenValue}>{params.hospedajeNombre ?? '—'}</Text>
      <View style={s.resumenRow}>
        <View>
          <Text style={s.resumenLabel}>Check-in</Text>
          <Text style={s.resumenValue}>{formatDate(checkin)}</Text>
        </View>
        <View>
          <Text style={s.resumenLabel}>Check-out</Text>
          <Text style={s.resumenValue}>{formatDate(checkout)}</Text>
        </View>
        <View>
          <Text style={s.resumenLabel}>{nights} {nights === 1 ? 'noche' : 'noches'}</Text>
          <Text style={[s.resumenValue, { color: AQUA }]}>${montoTotal}</Text>
        </View>
      </View>
    </Animated.View>
  );
}