import { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import { supabase } from '../supabase/supabase';

export type ScanEstado = 'idle' | 'loading' | 'valido' | 'invalido' | 'ya_usado';

export function useScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [estado, setEstado] = useState<ScanEstado>('idle');
  const [reservaInfo, setReservaInfo] = useState<{
    hospedajeNombre: string; checkin: string; checkout: string; monto: string;
  } | null>(null);

  const resultSlide = useRef(new Animated.Value(100)).current;
  const resultOpac = useRef(new Animated.Value(0)).current;
  const scanLine = useRef(new Animated.Value(0)).current;
  const headerOpac = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerOpac, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLine, { toValue: 1, duration: 1800, useNativeDriver: true }),
        Animated.timing(scanLine, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const mostrarResultado = () => {
    Animated.parallel([
      Animated.spring(resultSlide, { toValue: 0, tension: 60, friction: 10, useNativeDriver: true }),
      Animated.timing(resultOpac, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  const ocultarResultado = () => {
    Animated.parallel([
      Animated.timing(resultSlide, { toValue: 100, duration: 200, useNativeDriver: true }),
      Animated.timing(resultOpac, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  const validarQR = async (data: string) => {
    const rawData = data.trim();
    let idABuscar = rawData; // Por defecto usamos el texto tal cual
  
    // 1. Intentamos ver si lo que escaneamos es un JSON
    try {
      const parsed = JSON.parse(rawData);
      if (parsed.tx) {
        idABuscar = parsed.tx; // Si tiene un campo "tx", usamos solo ese pedacito
      }
    } catch (e) {
      // Si no es JSON (es un texto plano), seguimos usando rawData
    }
  
    console.log("🔍 Buscando en DB el ID:", idABuscar);
  
    setScanned(true);
    setEstado('loading');
    
    try {
      const { data: reserva, error } = await supabase
        .from('reservas')
        .select('id, hospedaje_nombre, fecha_checkin, fecha_checkout, monto')
        .eq('transaction_id', idABuscar) // <--- Ahora sí buscará "TX-1773783577366"
        .single();
  
      if (error || !reserva) {
        console.log("❌ No se encontró la reserva en la tabla");
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setEstado('invalido'); 
        mostrarResultado(); 
        return;
      }
  
      // ... (resto de tu lógica de qr_scans y reservaInfo igual)
  
      // 2. Verificamos si ya se usó (esta parte está bien)
      const { data: scansAnteriores } = await supabase
        .from('qr_scans')
        .select('id')
        .eq('reserva_id', reserva.id);
  
      if (scansAnteriores && scansAnteriores.length > 0) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        setEstado('ya_usado');
      } else {
        await supabase.from('qr_scans').insert({ reserva_id: reserva.id, resultado: 'valido' });
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setEstado('valido');
      }
  
      setReservaInfo({
        hospedajeNombre: reserva.hospedaje_nombre,
        checkin: reserva.fecha_checkin,
        checkout: reserva.fecha_checkout,
        monto: String(reserva.monto),
      });
      mostrarResultado();
  
    } catch (err) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setEstado('invalido'); 
      mostrarResultado();
    }
  };

  const reiniciar = () => {
    ocultarResultado();
    setTimeout(() => {
      setScanned(false);
      setEstado('idle');
      setReservaInfo(null);
    }, 220);
  };

  return {
    permission, requestPermission, scanned, estado, reservaInfo,
    animations: { resultSlide, resultOpac, scanLine, headerOpac },
    validarQR, reiniciar
  };
}