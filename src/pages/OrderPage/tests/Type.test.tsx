import { render, screen, waitFor } from '@testing-library/react';
import { server } from '../../../mocks/server';
import Type from '../Type';
import { rest } from 'msw';

it('display product images from server ', async () => {
  render(<Type orderType="products" />);

  const productImage = (await screen.findAllByRole('img', {
    name: /product$/i,
  })) as HTMLImageElement[];

  expect(productImage).toHaveLength(2);

  const altText = productImage.map((element) => element.alt);
  expect(altText).toEqual(['America product', 'England product']);
});

it('when fetching product datas, face on error', async () => {
  server.resetHandlers(
    rest.get('http://localhost:5000/products', (req, res, ctx) => {
      return res(ctx.status(500));
    }),
  );

  render(<Type orderType="products" />);

  const errorBanner = await screen.findByTestId('error-banner');
  await waitFor(() =>
    expect(errorBanner).toHaveTextContent('에러가 발생했습니다.'),
  );
});
