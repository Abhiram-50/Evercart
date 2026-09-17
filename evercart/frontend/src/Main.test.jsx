import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Main from './Main';

describe('Main homepage', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              id: 'demo-phone',
              name: 'Galaxy Phone',
              price: '₹49,999',
              img: 'https://example.com/phone.png',
              category: 'Mobiles',
              badge: 'Best Seller',
              rating: '4.7',
            },
          ]),
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('loads products from the API and shows them on the homepage', async () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    expect(await screen.findByText('Galaxy Phone')).toBeInTheDocument();
  });
});
