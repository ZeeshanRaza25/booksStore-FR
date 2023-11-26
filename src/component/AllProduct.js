import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CardFeature from './CardFeature';
import FilterProduct from './FilterProduct';

const AllProduct = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);
  console.log('productData :>> ', productData);
  const categoryList = [
    ...new Set(
      productData
        .filter((el) => el.category && el.category?.name)
        .map((el) => el.category.name)
    ),
  ];
  console.log('categoryList :>> ', categoryList);
  //filter data display
  const [filterby, setFilterBy] = useState('');
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    setFilterBy(category);
    const filter = productData.filter(
      (el) => el.category?.name.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };

  const loadingArrayFeature = new Array(10).fill(null);

  return (
    <div className='my-5'>
      <h2 className='font-bold text-2xl text-slate-800 mb-4'> {heading} </h2>{' '}
      <div className='flex gap-4 justify-center overflow-scroll scrollbar-none'>
        {categoryList[0] ? (
          categoryList.map((el) => {
            return (
              <FilterProduct
                category={el}
                key={el}
                isActive={el.toLowerCase() === filterby?.toLowerCase()}
                onClick={() => handleFilterProduct(el)}
              />
            );
          })
        ) : (
          <div className='min-h-[150px] flex justify-center items-center'>
            <p> Loading... </p>
          </div>
        )}
      </div>
      <div className='flex flex-wrap justify-center gap-4 my-4'>
        {' '}
        {dataFilter[0]
          ? dataFilter.map((el) => {
              return (
                <CardFeature
                  {...el}
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                />
              );
            })
          : loadingArrayFeature.map((el, index) => (
              <CardFeature loading='Loading...' key={index + 'allProduct'} />
            ))}{' '}
      </div>{' '}
    </div>
  );
};

export default AllProduct;
