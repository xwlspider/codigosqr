// app/index.tsx
import React from 'react';
import { View, SafeAreaView, StatusBar, Animated, Dimensions } from 'react-native';
import { styles } from '../components/index.styles';
import { useNavigation } from '../logic/hooks/useNavegation';

// Importación de componentes refactorizados
import { TabHospedajes } from '../components/tabs/TabHospedajes';
import { TabScanner } from '../components/tabs/TabScanner';
import Perfil from './perfil';
import { TabBtn } from '../components/TabBtn';

const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 3;

export default function Index() {
  const { activeTab, switchTab, tabIndicator } = useNavigation();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#010a09" />
      
      <View style={{ flex: 1 }}>
        {activeTab === 'hospedajes' && <TabHospedajes />}
        {activeTab === 'scanner'    && <TabScanner />}
        {activeTab === 'perfil'     && <Perfil />}
      </View>

      {/* Barra de tabs */}
      <View style={styles.tabBar}>
        <Animated.View style={[
          styles.tabIndicator,
          { 
            width: TAB_WIDTH,
            transform: [{ 
              translateX: tabIndicator.interpolate({ 
                inputRange: [0, 1, 2], 
                outputRange: [0, TAB_WIDTH, TAB_WIDTH * 2] 
              }) 
            }] 
          },
        ]} />
        
        <TabBtn 
          icon="🏠" 
          label="Hospedajes" 
          active={activeTab === 'hospedajes'} 
          onPress={() => switchTab('hospedajes')} 
        />
        <TabBtn 
          icon="📷" 
          label="Escanear"   
          active={activeTab === 'scanner'}    
          onPress={() => switchTab('scanner')} 
        />
        <TabBtn 
          icon="👤" 
          label="Perfil"     
          active={activeTab === 'perfil'}     
          onPress={() => switchTab('perfil')} 
        />
      </View>
    </SafeAreaView>
  );
}