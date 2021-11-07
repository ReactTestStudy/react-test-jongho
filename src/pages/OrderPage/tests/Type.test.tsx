import { render, screen } from '@testing-library/react';
import Type from '../Type';

it('display product images from server ', async () => {
  render(<Type orderType="products" />);

  const productImage = (await screen.findAllByRole('img', {
    name: /product$/i,
  })) as HTMLImageElement[];

  expect(productImage).toHaveLength(2);

  const altText = productImage.map((element) => element.alt);
  expect(altText).toEqual(['America product', 'England product']);
});
