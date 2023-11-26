import React from 'react';

const FilterProduct = ({ category, onClick, isActive }) => {
  return (
    <div onClick={onClick}>
      <div
        className={`text-2xl p-4  rounded-full cursor-pointer ${
          isActive ? 'bg-red-600 text-white' : 'bg-yellow-500'
        }`}
      >
        <p className='text-center font-small my-1 capitalize'> {category} </p>
      </div>
    </div>
  );
};

export default FilterProduct;
