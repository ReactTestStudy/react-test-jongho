import React, { ChangeEvent, useContext, useState } from 'react';
import { OrderContext } from '../../contexts/OrderContext';

// type Props = {
//   setStep: (num: number) => void;
// };

const SummaryPage = ({ setStep }) => {
  const [checked, setChecked] = useState(false);
  const [orderDatas] = useContext(OrderContext);

  const productArray = Array.from(orderDatas.products);
  const productList = productArray.map(([key, value])=> (
    <li key={key}>
      {value} {key}
    </li>
  ))

  const clickCheckBox = (e) => {
    setChecked(e.target.checked);
  };

  const hasOptions = orderDatas.options.size > 0;
  let optionsRender = null;

  if(hasOptions) {
    const optionsArray = Array.from(orderDatas.options.keys());
    const optionList = optionsArray.map((key) => (
      <li key={key}>{key}</li>
    ))

    optionsRender = (
      <>
        <h2>옴션: {orderDatas.totals.optinos}</h2>
        <ul>
          {optionList}
        </ul>
      </>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  }

  return (
    <div>
      <h1>주문 확인</h1>
      <h2>여행 상품: {orderDatas.totals.products}</h2>
      <ul>
        {productList}
      </ul>
      {optionsRender}
      <form onSubmit={handleSubmit}>
        <input
          type="checkbox"
          checked={checked}
          id="confirm-checkbox"
          onChange={clickCheckBox}
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
