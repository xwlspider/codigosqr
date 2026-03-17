import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { diffDays, formatDate } from '../../logic/pago/usePago';
import { s, AQUA } from '../../components/pago.styles';

interface DateSelectorProps {
  checkin: Date;
  checkout: Date;
  onCheckinChange: (d: Date) => void;
  onCheckoutChange: (d: Date) => void;
}

export function DateSelector({ checkin, checkout, onCheckinChange, onCheckoutChange }: DateSelectorProps) {
  const [showPicker, setShowPicker] = useState<'checkin' | 'checkout' | null>(null);
  const [tempDate, setTempDate] = useState(new Date());
  const nights = diffDays(checkin, checkout);

  const openPicker = (type: 'checkin' | 'checkout') => {
    setTempDate(type === 'checkin' ? checkin : checkout);
    setShowPicker(type);
  };

  const handleConfirm = () => {
    if (showPicker === 'checkin') onCheckinChange(tempDate);
    if (showPicker === 'checkout') onCheckoutChange(tempDate);
    setShowPicker(null);
  };

  return (
    <>
      <View style={s.fechasBox}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={s.fechasTitle}>📅 Selecciona tus fechas</Text>
          <View style={s.nightsBadge}>
            <Text style={s.nightsText}>{nights} {nights === 1 ? 'noche' : 'noches'}</Text>
          </View>
        </View>

        <View style={s.fechasRow}>
          <TouchableOpacity 
            style={[s.fechaBtn, showPicker === 'checkin' && s.fechaBtnActive]} 
            onPress={() => openPicker('checkin')}
          >
            <View style={s.fechaBtnInner}>
              <Text style={s.fechaBtnIcon}>🛬</Text>
              <View>
                <Text style={s.fechaBtnLabel}>CHECK-IN</Text>
                <Text style={s.fechaBtnValue}>{formatDate(checkin)}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <Text style={s.fechaArrow}>→</Text>

          <TouchableOpacity 
            style={[s.fechaBtn, showPicker === 'checkout' && s.fechaBtnActive]} 
            onPress={() => openPicker('checkout')}
          >
            <View style={s.fechaBtnInner}>
              <Text style={s.fechaBtnIcon}>🛫</Text>
              <View>
                <Text style={s.fechaBtnLabel}>CHECK-OUT</Text>
                <Text style={s.fechaBtnValue}>{formatDate(checkout)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {showPicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="default"
          minimumDate={showPicker === 'checkout' ? checkin : new Date()}
          onChange={(_, date) => {
            setShowPicker(null);
            if (date) {
              if (showPicker === 'checkin') onCheckinChange(date);
              if (showPicker === 'checkout') onCheckoutChange(date);
            }
          }}
        />
      )}

      {showPicker && Platform.OS === 'ios' && (
        <Modal transparent animationType="slide">
          <TouchableOpacity style={s.modalBackdrop} activeOpacity={1} onPress={() => setShowPicker(null)}>
            <View style={s.modalCard}>
              <View style={s.modalHeader}>
                <Text style={s.modalTitle}>{showPicker === 'checkin' ? '🛬 Check-in' : '🛫 Check-out'}</Text>
                <Text style={s.modalSub}>{showPicker === 'checkin' ? 'Fecha de llegada' : 'Fecha de salida'}</Text>
              </View>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="inline"
                minimumDate={showPicker === 'checkout' ? checkin : new Date()}
                onChange={(_, date) => { if (date) setTempDate(date); }}
                themeVariant="dark"
                accentColor={AQUA}
                style={s.modalPicker}
              />
              <View style={s.modalBtns}>
                <TouchableOpacity style={s.btnCancelar} onPress={() => setShowPicker(null)}>
                  <Text style={s.btnCancelarText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.btnConfirmar} onPress={handleConfirm}>
                  <Text style={s.btnConfirmarText}>Confirmar →</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </>
  );
}