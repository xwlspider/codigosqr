import { useState, useRef } from 'react';
import { Animated } from 'react-native';

export type Tab = 'hospedajes' | 'scanner' | 'perfil';

export function useNavigation() {
  const [activeTab, setActiveTab] = useState<Tab>('hospedajes');
  const tabIndicator = useRef(new Animated.Value(0)).current;

  const switchTab = (tab: Tab) => {
    const pos = { hospedajes: 0, scanner: 1, perfil: 2 };
    setActiveTab(tab);
    Animated.spring(tabIndicator, { 
      toValue: pos[tab], 
      tension: 70, 
      friction: 10, 
      useNativeDriver: true 
    }).start();
  };

  return { activeTab, switchTab, tabIndicator };
}