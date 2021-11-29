import { createContext, useEffect, useMemo, useState } from 'react';

export type OrderType = 'products' | 'options';
export type OrderCountType = {
  products: Map<string, number>;
  options: Map<string, number>;
};

export const OrderContext = createContext({
  products: 1000,
  options: 500,
});

const pricePerItem = {
  products: 1000,
  options: 500,
};

function calculateSubtotal(orderType: OrderType, orderCounts: OrderCountType) {
  let optionCount = 0;
  for (const count of orderCounts[orderType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[orderType];
}

export function OrderContextProvider(props: any) {
  const [orderCount, setOrderCount] = useState<OrderCountType>({
    products: new Map(),
    options: new Map(),
  });

  const [totals, setTotals] = useState({
    products: 0,
    options: 0,
    total: 0,
  });

  const resetOrderDatas = () => {
    setOrderCount({
      products: new Map(),
      options: new Map(),
    });
  };

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
    function updateItemCount(
      itemName: string,
      newItemCount: string,
      orderType: OrderType,
    ) {
      const newOrderCounts = { ...orderCount };

      const orderCountsMap = orderCount[orderType];
      orderCountsMap.set(itemName, parseInt(newItemCount));

      setOrderCount(newOrderCounts);
    }
    return [{ ...orderCount, totals }, updateItemCount, resetOrderDatas];
  }, [orderCount, totals]);

  return <OrderContext.Provider value={value} {...props} />;
}
