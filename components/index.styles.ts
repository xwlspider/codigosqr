// components/index.styles.ts
import { StyleSheet } from 'react-native';

export const BG     = '#010a09';
export const CARD   = '#0d1f1d';
export const BORDER = '#0a3530';
export const TEXT   = '#e0fffc';
export const MUTED  = '#3a8a80';
export const AQUA   = '#00e5cc';
export const AQUA2  = '#00b4a0';

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },

  // ── Header ──────────────────────────────────────────────
  header:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24, paddingBottom: 20 },
  appName:    { fontSize: 32, fontWeight: '900', color: TEXT, letterSpacing: -1 },
  headerSub:  { fontSize: 13, color: MUTED, marginTop: 2 },
  avatar:     { width: 44, height: 44, borderRadius: 14, backgroundColor: AQUA, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 20 },

  // ── Sección ──────────────────────────────────────────────
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle:  { fontSize: 17, fontWeight: '700', color: TEXT },
  sectionBadge:  { backgroundColor: CARD, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, borderWidth: 1, borderColor: BORDER },
  sectionCount:  { fontSize: 13, color: MUTED },

  // ── Lista ────────────────────────────────────────────────
  list: { gap: 16 },

  // ── Card ─────────────────────────────────────────────────
  card:           { backgroundColor: CARD, borderRadius: 20, borderWidth: 1, borderColor: BORDER, overflow: 'hidden' },
  imageContainer: { height: 155, position: 'relative' },
  image:          { width: '100%', height: '100%' },
  imageOverlay:   { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,10,9,0.3)' },
  tag:            { position: 'absolute', top: 10, left: 10, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  tagText:        { fontSize: 11, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },
  priceBadge:     { position: 'absolute', bottom: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.78)', flexDirection: 'row', alignItems: 'baseline', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, gap: 2 },
  priceText:      { fontSize: 16, fontWeight: '900', color: '#fff' },
  priceNight:     { fontSize: 11, color: '#aaa' },

  // ── Info ─────────────────────────────────────────────────
  info:         { padding: 16, gap: 6 },
  nombre:       { fontSize: 18, fontWeight: '800', color: TEXT, letterSpacing: -0.4 },
  ubicacionRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  pin:          { fontSize: 12 },
  ubicacion:    { fontSize: 12, color: MUTED, flex: 1 },
  descripcion:  { fontSize: 13, color: '#5a9a94', lineHeight: 19, marginTop: 2 },
  cta:          { marginTop: 8, alignSelf: 'flex-start', borderBottomWidth: 1, borderBottomColor: AQUA },
  ctaText:      { fontSize: 13, fontWeight: '700', color: AQUA },

  // ── Tab bar ───────────────────────────────────────────────
  tabBar: { 
    flexDirection: 'row', 
    backgroundColor: '#020f0e', 
    borderTopWidth: 1, 
    borderTopColor: BORDER, 
    paddingBottom: 8, 
    paddingTop: 4,
    position: 'relative' // Asegura que el indicador se posicione bien
  },
  tabBtn: { 
    flex: 1, 
    alignItems: 'center',
    zIndex: 2 // Por encima del indicador
  },
  tabIndicator: { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    height: 2, 
    backgroundColor: AQUA,
    zIndex: 1 
  },

  tabBtnInner: { 
    alignItems: 'center', 
    paddingVertical: 8, 
    gap: 3 
  },
  tabIcon: { 
    fontSize: 20 
  },
  tabLabel: { 
    fontSize: 10, 
    color: '#3a8a80', // MUTED
    fontWeight: '600', 
    letterSpacing: 0.3 
  },
  tabLabelActive: { 
    color: '#00e5cc' // AQUA
  },

  // ── Scanner tab ───────────────────────────────────────────
  centerTab:      { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 },
  scanIconWrap:   { width: 100, height: 100, alignItems: 'center', justifyContent: 'center' },
  scanRing:       { position: 'absolute', width: 100, height: 100, borderRadius: 50, borderWidth: 1.5, borderColor: AQUA, opacity: 0.4 },
  scanIconBadge:  { width: 72, height: 72, borderRadius: 22, backgroundColor: AQUA, alignItems: 'center', justifyContent: 'center', shadowColor: AQUA, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 16, elevation: 10 },
  scanIconText:   { fontSize: 32 },
  scanTitle:      { fontSize: 22, fontWeight: '900', color: TEXT, textAlign: 'center', letterSpacing: -0.5 },
  scanSub:        { fontSize: 14, color: MUTED, textAlign: 'center', lineHeight: 20 },
  viewfinderDeco: { width: 120, height: 120, borderRadius: 12, backgroundColor: CARD, borderWidth: 1, borderColor: BORDER, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  cornerDeco:     { position: 'absolute', width: 20, height: 20 },
  cornerTL:       { top: 6, left: 6, borderTopWidth: 2, borderLeftWidth: 2, borderColor: AQUA, borderTopLeftRadius: 4 },
  cornerTR:       { top: 6, right: 6, borderTopWidth: 2, borderRightWidth: 2, borderColor: AQUA, borderTopRightRadius: 4 },
  cornerBL:       { bottom: 6, left: 6, borderBottomWidth: 2, borderLeftWidth: 2, borderColor: AQUA, borderBottomLeftRadius: 4 },
  cornerBR:       { bottom: 6, right: 6, borderBottomWidth: 2, borderRightWidth: 2, borderColor: AQUA, borderBottomRightRadius: 4 },
  viewfinderText: { fontSize: 28, fontWeight: '900', color: BORDER },
  btnScan:        { backgroundColor: AQUA, borderRadius: 16, paddingVertical: 16, paddingHorizontal: 40, overflow: 'hidden', shadowColor: AQUA, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 8 },
  btnScanText:    { color: '#001a1a', fontWeight: '900', fontSize: 16 },
  btnShine:       { position: 'absolute', top: 0, left: 0, right: 0, height: '50%', backgroundColor: 'rgba(255,255,255,0.15)', borderTopLeftRadius: 16, borderTopRightRadius: 16 },

  // ── Perfil tab ────────────────────────────────────────────
  perfilContent:    { paddingHorizontal: 20, paddingBottom: 32, paddingTop: 8 },
  perfilHeader:     { alignItems: 'center', paddingVertical: 28, gap: 8 },
  perfilAvatarWrap: { width: 100, height: 100, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  perfilAvatarRing: { position: 'absolute', width: 100, height: 100, borderRadius: 50, borderWidth: 1.5, borderColor: AQUA, opacity: 0.4 },
  perfilAvatar:     { width: 76, height: 76, borderRadius: 38, backgroundColor: AQUA, alignItems: 'center', justifyContent: 'center', shadowColor: AQUA, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 14, elevation: 10 },
  perfilAvatarText: { fontSize: 32, fontWeight: '900', color: '#001a1a' },
  perfilNombre:     { fontSize: 22, fontWeight: '900', color: TEXT, letterSpacing: -0.5 },
  perfilEmail:      { fontSize: 13, color: MUTED },
  perfilCards:      { backgroundColor: CARD, borderRadius: 20, borderWidth: 1, borderColor: BORDER, overflow: 'hidden' },
  infoRow:          { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderBottomWidth: 1, borderBottomColor: BORDER },
  infoIcon:         { fontSize: 18, width: 28, textAlign: 'center' },
  infoLabel:        { fontSize: 10, color: MUTED, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase' },
  infoValue:        { fontSize: 15, color: TEXT, fontWeight: '600', marginTop: 2 },
  perfilAcciones:   { gap: 12 },
  btnReservas:      { backgroundColor: CARD, borderRadius: 16, paddingVertical: 16, alignItems: 'center', borderWidth: 1, borderColor: AQUA2 },
  btnReservasText:  { color: AQUA, fontWeight: '700', fontSize: 15 },
  btnLogout:        { backgroundColor: '#1a0505', borderRadius: 16, paddingVertical: 16, alignItems: 'center', borderWidth: 1, borderColor: '#3a1010' },
  btnLogoutText:    { color: '#ef4444', fontWeight: '700', fontSize: 15 },
});