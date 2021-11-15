import { createContext, useEffect, useMemo, useState } from 'react';

// type OrderContextType = {
//   data: ;
//   update: ;
// }

export const OrderContext = createContext();

const pricePerItem = {
  products: 1000,
  options: 500,
};

function calculateSubtotal(orderType, orderCounts) {
  let optionCount = 0;
  for (const count of orderCounts[orderType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[orderType];
}

export function OrderContextProvider(props) {
  const [orderCount, setOrderCount] = useState({
    products: new Map(),
    options: new Map(),
  });

  const [totals, setTotals] = useState({
    products: 0,
    options: 0,
    total: 0,
  });

  useEffect(() => {
    const productsTotal = calculateSubtotal('products', orderCount);
    const optionsTotal = calculateSubtotal('options', orderCount);
    const total = productsTotal + optionsTotal;

    setTotals({
      products: productsTotal,
      options: optionsTotal,
      total,
    });
  }, [orderCount]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, orderType) {
      const newOrderCounts = { ...orderCount };

      const orderCountsMap = orderCount[orderType];
      orderCountsMap.set(itemName, parseInt(newItemCount));

      setOrderCount(newOrderCounts);
    }
    return [{ ...orderCount, totals }, updateItemCount];
  }, [orderCount, totals]);

  return <OrderContext.Provider value={value} {...props} />;
}
