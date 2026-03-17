import { StyleSheet } from 'react-native';

export const BG = '#010a09';
export const CARD = '#0d1f1d';
export const BORDER = '#0a3530';
export const TEXT = '#e0fffc';
export const MUTED = '#3a8a80';
export const AQUA = '#00e5cc';
export const GREEN = '#22c55e';
export const RED = '#ef4444';
export const YELLOW = '#eab308';

const CW = 22; const CB = 3;

export const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, paddingHorizontal: 32 },
  overlay: { flex: 1, backgroundColor: 'rgba(1,10,9,0.6)', justifyContent: 'space-between', paddingBottom: 28 },
  header: { paddingTop: 16, paddingHorizontal: 20, gap: 4 },
  backBtn: { alignSelf: 'flex-start', marginBottom: 8, backgroundColor: 'rgba(0,229,204,0.1)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(0,229,204,0.2)' },
  backText: { color: AQUA, fontWeight: '700', fontSize: 13 },
  title: { fontSize: 24, fontWeight: '900', color: TEXT, letterSpacing: -0.5 },
  subtitle: { fontSize: 13, color: MUTED },
  viewfinderWrap: { alignItems: 'center', gap: 16 },
  viewfinder: { width: 240, height: 240, borderRadius: 16, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  corner: { position: 'absolute', width: CW, height: CW },
  cTL: { top: 0, left: 0, borderTopWidth: CB, borderLeftWidth: CB, borderTopLeftRadius: 6 },
  cTR: { top: 0, right: 0, borderTopWidth: CB, borderRightWidth: CB, borderTopRightRadius: 6 },
  cBL: { bottom: 0, left: 0, borderBottomWidth: CB, borderLeftWidth: CB, borderBottomLeftRadius: 6 },
  cBR: { bottom: 0, right: 0, borderBottomWidth: CB, borderRightWidth: CB, borderBottomRightRadius: 6 },
  scanLine: { position: 'absolute', left: 0, right: 0, height: 2, backgroundColor: AQUA, opacity: 0.7 },
  estadoCenter: { alignItems: 'center', gap: 6 },
  estadoEmoji: { fontSize: 36 },
  estadoMsg: { fontWeight: '700', fontSize: 14 },
  estadoGrande: { fontSize: 72, fontWeight: '900' },
  hint: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: '600', textAlign: 'center' },
  resultCard: { marginHorizontal: 16, backgroundColor: CARD, borderRadius: 22, borderWidth: 1, borderColor: BORDER, padding: 20, gap: 14 },
  reservaInfo: { gap: 10 },
  reservaEstadoBadge: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, borderWidth: 1 },
  reservaEstadoText: { fontSize: 12, fontWeight: '800', letterSpacing: 0.5 },
  reservaNombre: { fontSize: 17, fontWeight: '900', color: TEXT, letterSpacing: -0.3 },
  reservaRow: { flexDirection: 'row', justifyContent: 'space-between' },
  datoBox: { gap: 2 },
  datoLabel: { fontSize: 9, color: MUTED, textTransform: 'uppercase', letterSpacing: 1 },
  datoValue: { fontSize: 13, color: TEXT, fontWeight: '700' },
  errorMsg: { fontSize: 14, color: RED, textAlign: 'center' },
  btnReiniciar: { backgroundColor: AQUA, borderRadius: 14, paddingVertical: 14, alignItems: 'center', overflow: 'hidden' },
  btnReinText: { color: '#001a1a', fontWeight: '900', fontSize: 15 },
  btnShine: { position: 'absolute', top: 0, left: 0, right: 0, height: '50%', backgroundColor: 'rgba(255,255,255,0.12)', borderTopLeftRadius: 14, borderTopRightRadius: 14 },
  permBadge: { width: 80, height: 80, borderRadius: 24, backgroundColor: AQUA, alignItems: 'center', justifyContent: 'center' },
  permBadgeIcon: { fontSize: 36 },
  permTitle: { fontSize: 20, fontWeight: '800', color: TEXT, textAlign: 'center' },
  permSub: { fontSize: 14, color: MUTED, textAlign: 'center', lineHeight: 22 },
  btnPermiso: { backgroundColor: AQUA, borderRadius: 16, paddingVertical: 14, paddingHorizontal: 36, overflow: 'hidden' },
  btnPermisoText: { color: '#001a1a', fontWeight: '900', fontSize: 15 },
  btnVolver: { paddingVertical: 10 },
  btnVolverText: { color: MUTED, fontSize: 14, fontWeight: '600' },
  mutedText: { color: MUTED, fontSize: 14 },
});