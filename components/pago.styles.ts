// components/pago.styles.ts
import { StyleSheet } from 'react-native';

export const BG     = '#010a09';
export const CARD   = '#0d1f1d';
export const BORDER = '#0a3530';
export const TEXT   = '#e0fffc';
export const MUTED  = '#3a8a80';
export const AQUA   = '#00e5cc';
export const AQUA2  = '#00b4a0';
export const ACCENT = AQUA;

export const s = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: BG },
  scroll: { paddingHorizontal: 20, paddingBottom: 48 },

  // Glows decorativos
  glowTL: { position: 'absolute', top: -60, left: -60, width: 180, height: 180, borderRadius: 90, backgroundColor: AQUA, opacity: 0.04 },
  glowBR: { position: 'absolute', bottom: 100, right: -60, width: 160, height: 160, borderRadius: 80, backgroundColor: AQUA2, opacity: 0.05 },

  // Header
  header:   { paddingTop: 16, paddingBottom: 24, gap: 4 },
  backBtn:  { alignSelf: 'flex-start', marginBottom: 12, backgroundColor: 'rgba(0,229,204,0.08)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: BORDER },
  backText: { color: AQUA2, fontSize: 14, fontWeight: '700' },
  title:    { fontSize: 28, fontWeight: '900', color: TEXT, letterSpacing: -0.8 },
  subtitle: { fontSize: 12, color: MUTED },

  // ── Selector de fechas ────────────────────────────────────────────────────
  fechasBox:      { backgroundColor: CARD, borderRadius: 18, borderWidth: 1, borderColor: BORDER, padding: 16, gap: 12, marginBottom: 16 },
  fechasTitle:    { fontSize: 13, fontWeight: '800', color: TEXT, letterSpacing: -0.2 },
  fechasRow:      { flexDirection: 'row', alignItems: 'center', gap: 8 },
  fechaBtn:       { flex: 1, backgroundColor: '#030f0e', borderRadius: 14, borderWidth: 1, borderColor: BORDER, padding: 12 },
  fechaBtnActive: { borderColor: AQUA, shadowColor: AQUA, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
  fechaBtnInner:  { flexDirection: 'row', alignItems: 'center', gap: 8 },
  fechaBtnIcon:   { fontSize: 18 },
  fechaBtnLabel:  { fontSize: 9, color: MUTED, fontWeight: '800', letterSpacing: 1.5, textTransform: 'uppercase' },
  fechaBtnValue:  { fontSize: 13, color: TEXT, fontWeight: '700', marginTop: 2 },
  fechaArrow:     { color: AQUA2, fontSize: 16, fontWeight: '700' },
  nightsBadge:    { alignSelf: 'flex-start', backgroundColor: 'rgba(0,229,204,0.08)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: 'rgba(0,229,204,0.18)' },
  nightsText:     { fontSize: 11, color: AQUA, fontWeight: '700' },

  // Modal del date picker
  modalBackdrop:    { flex: 1, backgroundColor: 'rgba(1,10,9,0.88)', justifyContent: 'flex-end' },
  modalCard:        { backgroundColor: '#0d1f1d', borderTopLeftRadius: 28, borderTopRightRadius: 28, borderWidth: 1, borderColor: BORDER, paddingBottom: 36 },
  modalHeader:      { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 8, gap: 4 },
  modalTitle:       { fontSize: 20, fontWeight: '900', color: TEXT, letterSpacing: -0.5 },
  modalSub:         { fontSize: 13, color: MUTED },
  modalPicker:      { marginHorizontal: 8 },
  modalBtns:        { flexDirection: 'row', gap: 12, paddingHorizontal: 24, marginTop: 16 },
  btnCancelar:      { flex: 1, backgroundColor: '#020f0e', borderRadius: 14, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: BORDER },
  btnCancelarText:  { color: MUTED, fontWeight: '700', fontSize: 15 },
  btnConfirmar:     { flex: 1, backgroundColor: AQUA, borderRadius: 14, paddingVertical: 14, alignItems: 'center', overflow: 'hidden', shadowColor: AQUA, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 8 },
  btnConfirmarText: { color: '#001a1a', fontWeight: '900', fontSize: 15 },

  // Resumen
  resumenBox:   { backgroundColor: CARD, borderRadius: 18, borderWidth: 1, borderColor: BORDER, padding: 18, gap: 10, marginBottom: 20 },
  resumenRow:   { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  resumenLabel: { fontSize: 10, color: MUTED, textTransform: 'uppercase', letterSpacing: 1 },
  resumenValue: { fontSize: 15, color: TEXT, fontWeight: '700', marginTop: 2 },

  // Card form
  card:        { backgroundColor: CARD, borderRadius: 22, borderWidth: 1, borderColor: BORDER, padding: 20, gap: 18, overflow: 'hidden' },
  cardGlow:    { position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: 60, backgroundColor: AQUA, opacity: 0.05 },
  field:       { gap: 7 },
  label:       { fontSize: 10, color: AQUA2, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 2 },
  row:         { flexDirection: 'row', gap: 12 },
  inputRow:    { flexDirection: 'row', alignItems: 'center', backgroundColor: '#030f0e', borderRadius: 14, borderWidth: 1, borderColor: BORDER, paddingHorizontal: 12 },
  inputFocused:{ borderColor: AQUA, shadowColor: AQUA, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 4 },
  networkIcon: { fontSize: 14, marginRight: 8 },
  input:       { flex: 1, color: TEXT, fontSize: 15, paddingVertical: 15 },

  // Botón pagar
  btnPagar:    { borderRadius: 16, overflow: 'hidden', backgroundColor: AQUA, shadowColor: AQUA, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 14, elevation: 10, marginTop: 4 },
  btnDisabled: { opacity: 0.5 },
  btnInner:    { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 17, gap: 8 },
  btnText:     { color: '#001a1a', fontWeight: '900', fontSize: 16, letterSpacing: 0.3 },
  btnShine:    { position: 'absolute', top: 0, left: 0, right: 0, height: '50%', backgroundColor: 'rgba(255,255,255,0.12)', borderTopLeftRadius: 16, borderTopRightRadius: 16 },
});