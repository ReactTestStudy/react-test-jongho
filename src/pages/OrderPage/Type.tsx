import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Products from './Products';
import ErrorBanner from '../../components/ErrorBanner';

type Props = {
  orderType: string;
};

const Type = ({ orderType }: Props) => {
  const [items, setItems] = useState([]);
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
  }, [loadItems]);

  const ItemComponents = orderType === 'products' ? Products : null;

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

  return <div>{optionItems}</div>;
};

export default Type;
