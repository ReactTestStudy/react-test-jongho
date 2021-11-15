import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import axios from 'axios';
import Products from './Products';
import ErrorBanner from '../../components/ErrorBanner';
import Options from './Options';
import { OrderContext } from '../../contexts/OrderContext';

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
  const isMountedRef = useRef(true); // memory leak을 해결하기 위한 방법, https://stackoverflow.com/questions/56450975/to-fix-cancel-all-subscriptions-and-asynchronous-tasks-in-a-useeffect-cleanup-f
  const [orderDatas, updateItemCounts] = useContext(OrderContext);

  const loadItems = useCallback(async (orderType: string) => {
    try {
      let response = await axios.get(`http://localhost:5000/${orderType}`);
      if (isMountedRef.current) {
        setItems(response.data);
      }
    } catch (error) {
      if (isMountedRef.current) {
        setError(true);
      }
    }
  }, []);

  useEffect(() => {
    loadItems(orderType);

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const ItemComponents = orderType === 'products' ? Products : Options;

  const optionItems = items.map((item) => (
    <ItemComponents
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCounts={(itemName, newItemCount) =>
        updateItemCounts(itemName, newItemCount, orderType)
      }
    />
  ));

  if (error) {
    return <ErrorBanner message="에러가 발생했습니다." />;
  }

  return (
    <>
      <h2>주문 종류</h2>
      <p>하나의 가격</p>
      <p>총 가격: {orderDatas.totals[orderType]}</p>
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
