import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import AllProduct from '../component/AllProduct';
import { addCartItem } from '../redux/productSlide';
import { SocialShare } from '../component/SocialShare';
import { WhatsappIcon } from 'react-share';
import { info } from '../utility/socialsInfo';

const Menu = () => {
  const { filterby } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.productList);

  const productDisplay = productData.filter((el) => el._id === filterby)[0];

  const handleAddCartProduct = (e) => {
    dispatch(addCartItem(productDisplay));
  };

  const handleBuy = () => {
    dispatch(addCartItem(productDisplay));
    navigate('/cart');
  };

  let shareUrl = `${process.env.REACT_APP_FRONTEND_URL}/menu/${filterby}`;

  let price = productDisplay?.hasDiscount
    ? productDisplay?.discount
    : productDisplay?.price;

  return (
    <div className='p-2 md:p-4'>
      <div className='w-full max-w-4xl m-auto md:flex bg-white'>
        <div className='max-w-sm  overflow-hidden w-full p-5'>
          <img
            src={productDisplay?.image}
            className='hover:scale-105 transition-all h-full'
            alt=''
          />
        </div>
        <div className='flex flex-col justify-between py-5'>
          <div className='flex flex-col gap-1'>
            <h3 className='font-semibold text-slate-600  capitalize text-2xl md:text-4xl'>
              {productDisplay?.name}
            </h3>
            {productDisplay?.writer?.name && (
              <p className=' text-slate-500  font-medium text-2xl'>
                Author: {productDisplay?.writer?.name}
              </p>
            )}
            {productDisplay?.category?.name && (
              <p className=' text-slate-500  font-medium text-2xl'>
                Category: {productDisplay?.category?.name}
              </p>
            )}
            {productDisplay?.publisher?.name && (
              <p className=' text-slate-500  font-medium text-2xl'>
                Publisher: {productDisplay?.publisher?.name}
              </p>
            )}
            <p className=' font-bold md:text-2xl'>
              <span className='text-red-500 '>Rs.</span>
              <span>{price}</span>
            </p>
            {productDisplay?.description && (
              <div>
                <p className='text-slate-600 font-medium'>Description: </p>
                <p>{productDisplay?.description}</p>
              </div>
            )}
            <div className='flex gap-3'>
              <a
                target='_blank'
                href={`${info.whatsAppLink}?text=Hi+I%27m+interested+in+this+book%21%0A%0APrice in Pakistan%0ARs.${price} - PKR%0A ${productDisplay?.name}+%0A${shareUrl}`}
                alt=''
                rel='noreferrer'
              >
                <button
                  // onClick={handleBuy}
                  className='bg-green-500 flex items-center justify-center gap-2 py-2 mt-2 rounded hover:bg-green-600 min-w-[250px] text-white'
                >
                  <WhatsappIcon size={32} round />
                  Order through WhatsApp
                </button>
              </a>
              {/* <button onClick={handleAddCartProduct} className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]">Add Cart</button> */}
            </div>
          </div>
          <div>
            <SocialShare shareUrl={shareUrl} title={productDisplay?.name} />
          </div>
        </div>
      </div>

      {/* <AllProduct heading={'Related Product'} /> */}
    </div>
  );
};

export default Menu;
