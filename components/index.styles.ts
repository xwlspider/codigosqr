import { StyleSheet } from 'react-native';

export const BG     = '#0a0a0a';
export const CARD   = '#141414';
export const BORDER = '#222222';
export const TEXT   = '#f5f5f5';
export const MUTED  = '#737373';
export const ACCENT = '#f97316';

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  // ── Header ──────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: '900',
    color: TEXT,
    letterSpacing: -1,
  },
  headerSub: {
    fontSize: 13,
    color: MUTED,
    marginTop: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 20 },

  // ── Sección ──────────────────────────────────────────────
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: TEXT,
  },
  sectionCount: {
    fontSize: 13,
    color: MUTED,
    backgroundColor: CARD,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER,
  },

  // ── Lista ────────────────────────────────────────────────
  list: { gap: 16 },

  // ── Card ─────────────────────────────────────────────────
  card: {
    backgroundColor: CARD,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 140,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  tag: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },
  priceBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.75)',
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 2,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#fff',
  },
  priceNight: {
    fontSize: 11,
    color: '#ccc',
  },

  // ── Info ─────────────────────────────────────────────────
  info: {
    padding: 16,
    gap: 6,
  },
  nombre: {
    fontSize: 18,
    fontWeight: '800',
    color: TEXT,
    letterSpacing: -0.4,
  },
  ubicacionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pin: { fontSize: 12 },
  ubicacion: {
    fontSize: 12,
    color: MUTED,
    flex: 1,
  },
  descripcion: {
    fontSize: 13,
    color: '#a3a3a3',
    lineHeight: 19,
    marginTop: 2,
  },
  cta: {
    marginTop: 8,
    alignSelf: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: ACCENT,
  },
  ctaText: {
    fontSize: 13,
    fontWeight: '700',
    color: ACCENT,
  },
});