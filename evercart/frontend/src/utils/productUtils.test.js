import { normalizeProduct, getProductImage } from './productUtils';

describe('product image normalization', () => {
  it('uses an API image field when it exists', () => {
    const product = normalizeProduct({
      id: 'api-1',
      name: 'Phone',
      image: 'https://example.com/phone.jpg',
      price: 100,
      category: 'Electronics',
    });

    expect(product.img).toBe('https://example.com/phone.jpg');
  });

  it('creates a placeholder image when no image is available', () => {
    const product = normalizeProduct({
      id: 'api-2',
      name: 'Camera',
      price: 200,
      category: 'Electronics',
    });

    expect(product.img).toContain('data:image/svg+xml');
  });

  it('returns a placeholder for invalid image values', () => {
    const image = getProductImage({ name: 'Headphones', category: 'Electronics', img: '' });
    expect(image).toContain('data:image/svg+xml');
  });
});
