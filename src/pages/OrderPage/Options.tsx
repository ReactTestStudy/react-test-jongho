import React from 'react';

type Props = {
  name: string;
};

const Options = ({ name, updateItemCounts }: Props) => {
  return (
    <form>
      <input
        type="checkbox"
        id={`${name} option`}
        onChange={(e) => {
          updateItemCounts(name, e.target.checked ? 1 : 0);
        }}
      />{' '}
      <label htmlFor={`${name} option`}>{name}</label>
    </form>
  );
};

export default Options;
