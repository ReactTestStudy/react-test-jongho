import React from 'react';

type Props = {
  name: string;
  imagePath: string;
};

const Products = ({ name, imagePath }: Props) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img
        src={`http://localhost:5000/${imagePath}`}
        alt={`${name} product`}
        style={{ width: '75%' }}
      />
      <form action="" style={{ marginTop: '10px' }}>
        <label htmlFor="" style={{ textAlign: 'right' }}>
          {name}
        </label>
        <input
          type="number"
          style={{ marginLeft: 7 }}
          name="quantity"
          min="0"
          defaultValue="0"
        />
      </form>
    </div>
  );
};

export default Products;
