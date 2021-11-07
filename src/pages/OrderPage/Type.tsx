import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Products from './Products';

type Props = {
  orderType: string;
};

const Type = ({ orderType }: Props) => {
  const [items, setItems] = useState([]);

  const loadItems = async (orderType: string) => {
    try {
      let response = await axios.get(`http://localhost:5000/${orderType}`);
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadItems(orderType);
  }, [loadItems]);

  const ItemComponents = orderType === 'products' ? Products : null;

  const optionItems = items.map((item) => (
    <ItemComponents
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));
  return <div>{optionItems}</div>;
};

export default Type;
