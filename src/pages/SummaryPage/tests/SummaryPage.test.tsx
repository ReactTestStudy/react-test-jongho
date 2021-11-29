import { render, screen } from '../../../test-util';
import SummaryPage from '../SummaryPage';

it('checkbox and button', () => {
  render(<SummaryPage setStep={undefined} />);
  const checkbox = screen.getByRole('checkbox', {
    name: '주문하려는 것을 확인하셨나요?',
  }) as HTMLInputElement;

  expect(checkbox.checked).toEqual(false);

  const confirmButton = screen.getByRole('button', {
    name: '주문 확인',
  }) as HTMLButtonElement;
  expect(confirmButton.disabled).toBeTruthy();
});
