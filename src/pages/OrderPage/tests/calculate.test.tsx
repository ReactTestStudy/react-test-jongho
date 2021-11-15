import { render, screen } from '../../../test-util';
import userEvent from '@testing-library/user-event';
import Type from '../Type';
import { OrderContextProvider } from '../../../contexts/OrderContext';

it("update product's total when products change", async () => {
  render(<Type orderType="products" />);

  const productsTotal = screen.getByText('총 가격:', { exact: false }); // 뒤에 문자가 더 있어서 가져올 수 있게 한다
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
