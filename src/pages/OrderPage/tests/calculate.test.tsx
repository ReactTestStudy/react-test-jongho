import { render, screen } from '../../../test-util';
import userEvent from '@testing-library/user-event';
import Type from '../Type';
import { OrderContextProvider } from '../../../contexts/OrderContext';
import OrderPage from '../OrderPage';
import { useEffect } from 'react';

it("update product's total when products change", async () => {
  render(<Type orderType="products" />);

  const productsTotal = screen.getByText('상품 총 가격:', { exact: false }); // 뒤에 문자가 더 있어서 가져올 수 있게 한다
  expect(productsTotal).toHaveTextContent('0');

  // 아메리카 여행 상품 한개 올리기
  const americaInput = await screen.findByRole('spinbutton', {
    // getByRole대신 쓴 이유는 이 부분도 서버가 여행 상품에 대한 정보를 가져온 다음에, 값을 가질 수 있기 때문에, findByRole 한다.
    name: 'America',
  });

  userEvent.clear(americaInput);
  userEvent.type(americaInput, '1');
  expect(productsTotal).toHaveTextContent('1000');
  /**
   * 아메리카가 하나 들어갔기 때문에
   * 총 가격이 1000원이 되었는지 확인해보는 테스트케이스 입니다.
   */
});

it('update options total when options change', async () => {
  render(<Type orderType="options" />);

  const optionsTotal = screen.getByText('옵션 총 가격:', { exact: false });
  expect(optionsTotal).toHaveTextContent('0');

  const insuranceCheckbox = await screen.findByRole({
    name: 'Insurance option',
  });
  userEvent.click(insuranceCheckbox);
  expect(optionsTotal).toHaveTextContent('500');

  const dinnerCheckbox = await screen.findByRole({
    name: 'Dinner',
  });
  userEvent.click(dinnerCheckbox);
  expect(optionsTotal).toHaveTextContent('1000');

  userEvent.click(dinnerCheckbox);
  expect(optionsTotal).toHaveTextContent('500');
});

describe('total price of goods and options', () => {
  test('total price stats with 0 and Updating total price when adding one product', async () => {
    render(<OrderPage />);

    const total = screen.getByText('Total Price', { exact: false });
    expect(total).toHaveTextContent('0');

    const americaInput = await screen.findByRole('spinbutton', {
      name: 'America',
    });
    userEvent.clear(americaInput);
    userEvent.type(americaInput, '1');

    expect(total).toHaveTextContent('1000');
  });
  test('Updating total price when adding one option', async () => {
    render(<OrderPage />);
    const total = screen.getByText('Total Price', { exact: false });

    const insuranceCheckbox = await screen.findByRole('checkbox', {
      name: 'Insurance',
    });

    userEvent.clear(insuranceCheckbox);
    userEvent.click(insuranceCheckbox);
    expect(total).toHaveTextContent('500');
  });
  test('Updating total price when removing option and product', async () => {
    render(<OrderPage />);
    const total = screen.getByText('Total Price', { exact: false });

    const insuranceCheckbox = await screen.findByRole('checkbox', {
      name: 'Insurance',
    });
    userEvent.clear(insuranceCheckbox);
    userEvent.click(insuranceCheckbox);

    const americaInput = await screen.findByRole('spinbutton', {
      name: 'America',
    });
    userEvent.clear(americaInput);
    userEvent.type(americaInput, '3');

    userEvent.clear(americaInput);
    userEvent.type(americaInput, '1');

    expect(total).toHaveTextContent('1500');
  });
});
