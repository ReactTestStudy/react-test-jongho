import React from 'react';

type Props = {
  name: string;
  imagePath: string;
};

const Products = ({ name, imagePath, updateItemCounts }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    updateItemCounts(name, currentValue);
  };
  return (
    <div style={{ textAlign: 'center' }}>
      <img
        src={`http://localhost:5000/${imagePath}`}
        alt={`${name} product`}
        style={{ width: '75%' }}
      />
      <form action="" style={{ marginTop: '10px' }}>
        <label htmlFor={name} style={{ textAlign: 'right' }}>
          {name}
        </label>
        <input
          id={name}
          type="number"
          style={{ marginLeft: 7 }}
          name="quantity"
          min="0"
          defaultValue="0"
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default Products;
