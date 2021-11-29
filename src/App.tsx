import React, { useState } from 'react';
import OrderPage from './pages/OrderPage/OrderPage';
import { OrderContextProvider } from './contexts/OrderContext';
import SummaryPage from './pages/SummaryPage/SummaryPage';
import ComplatePage from './pages/ComplatePage/ComplatePage';

function App() {
  const [step, setStep] = useState(0);

  return (
    <div style={{ padding: '4rem' }}>
      <OrderContextProvider>
        {step === 0 && <OrderPage setStep={setStep} />}
        {step === 1 && <SummaryPage setStep={setStep} />}
        {step === 2 && <ComplatePage setStep={setStep} />}
      </OrderContextProvider>
    </div>
  );
}

export default App;
