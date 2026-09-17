const placeholderImage = (name = 'Product', category = 'Shop') => {
  const safeName = encodeURIComponent(name || 'Product');
  const safeCategory = encodeURIComponent(category || 'Shop');
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="500" viewBox="0 0 600 500">
    <rect width="600" height="500" fill="#f3f4f6"/>
    <rect x="40" y="40" width="520" height="420" rx="24" fill="white" stroke="#d1d5db" stroke-width="2"/>
    <circle cx="300" cy="220" r="90" fill="#e0f2fe"/>
    <path d="M230 310c18-60 122-60 140 0" fill="#93c5fd"/>
    <text x="300" y="388" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#1f2937">${safeName}</text>
    <text x="300" y="420" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#6b7280">${safeCategory}</text>
  </svg>`)}`;
};

export const getProductImage = (product = {}) => {
  const candidate = product.img || product.image || product.thumbnail || product.imageUrl || '';
  if (typeof candidate === 'string' && candidate.trim()) {
    return candidate;
  }
  return placeholderImage(product.name || product.title || product.productName, product.category);
};

export const normalizeProduct = (item = {}) => {
  const name = item.name || item.title || item.productName || 'Featured product';
  const category = item.category || 'Electronics';
  const image = getProductImage(item);

  return {
    id: item.id || `${name}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    price: item.price || item.current_price || item.salePrice || item.amount || 'Price available soon',
    img: image,
    category,
    badge: item.badge || (item.rating >= 4 ? 'Top Rated' : 'Trending'),
    rating: item.rating || item.rating?.rate || item.stars || '4.5',
    description: item.description || item.details || 'High-quality product with fast delivery.',
  };
};
