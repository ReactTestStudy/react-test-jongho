import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Products from './Products';
import ErrorBanner from '../../components/ErrorBanner';
import Options from './Options';

type Props = {
  orderType: string;
};

type ItemType = {
  name: string;
  imagePath: string;
};

const Type = ({ orderType }: Props) => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [error, setError] = useState(false);

  const loadItems = async (orderType: string, isMounted: boolean) => {
    try {
      let response = await axios.get(`http://localhost:5000/${orderType}`);
      if (isMounted) {
        setItems(response.data);
      }
    } catch (error) {
      if (isMounted) {
        setError(true);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    loadItems(orderType, isMounted);

    return () => {
      isMounted = false;
    };
  }, []);

  const ItemComponents = orderType === 'products' ? Products : Options;

  const optionItems = items.map((item) => (
    <ItemComponents
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  if (error) {
    return <ErrorBanner message="에러가 발생했습니다." />;
  }

  return (
    <>
      <h2>주문 종류</h2>
      <p>하나의 가격</p>
      <p>총 가격: </p>
      <div
        style={{
          display: 'flex',
          flexDirection: orderType === 'options' && 'column' ? 'column' : 'row',
        }}
      >
        {optionItems}
      </div>
    </>
  );
};

export default Type;
