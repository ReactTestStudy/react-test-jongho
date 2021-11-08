import React from 'react';

type Props = {
  message: string | undefined;
};

const ErrorBanner = ({ message }: Props) => {
  let errorMessage = message || '에러 입니다.';
  return (
    <div
      data-testid="error-banner"
      style={{ backgroundColor: 'red', color: 'white', textAlign: 'center' }}
    >
      {errorMessage}
    </div>
  );
};

export default ErrorBanner;
