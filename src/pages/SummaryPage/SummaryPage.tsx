import React, { useState } from 'react';

const SummaryPage = () => {
  const [checked, setChecked] = useState(false);

  const clickCheckBox = (e: React.MouseEvent) => {
    const checkElement = e.target as HTMLInputElement;
    setChecked(checkElement.checked);
  };

  return (
    <div>
      <form>
        <input
          type="checkbox"
          checked={checked}
          id="confirm-checkbox"
          onChange={() => {}}
          onClick={clickCheckBox}
        />
        <label htmlFor="confirm-checkbox">주문하려는 것을 확인하셨나요?</label>
        <br />
        <button type="submit" disabled={!checked}>
          주문 확인
        </button>
      </form>
    </div>
  );
};

export default SummaryPage;
