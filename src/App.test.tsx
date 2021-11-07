import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('the counter starts at 0', () => {
  render(<App />);
  // screen object를 이ㅛㅇ해서원하는 엘리먼트에 접근(접근할 떄 Id로)
  const counterElement = screen.getByTestId('counter');

  // id가 counter인 엘레멘트의 텍스트가 0인지 테스트
  expect(counterElement).toHaveTextContent('0');
});
