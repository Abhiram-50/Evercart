const normalizeNumber = (value) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const cleaned = value.replace(/[^\d.-]/g, '');
    if (!cleaned) return 0;
    const numeric = Number(cleaned);
    return Number.isFinite(numeric) ? numeric : 0;
  }
  return 0;
};

export const formatPrice = (value) => {
  const numeric = normalizeNumber(value);
  return `₹${numeric.toLocaleString('en-IN')}`;
};

export const parsePrice = (value) => normalizeNumber(value);

export const toCurrency = (value) => {
  const numeric = normalizeNumber(value);
  return `₹${numeric.toLocaleString('en-IN')}`;
};
