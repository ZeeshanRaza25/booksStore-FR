import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BsCloudUpload } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { ImagetoBase64 } from '../utility/ImagetoBase64';
import { useNavigate, useParams } from 'react-router-dom';

const initValues = {
  name: '',
  writer: '',
  category: '',
  publisher: '',
  image: '',
  price: '',
  description: '',
  hasDiscount: false,
  discount: '',
  isOld: false,
};

const Newproduct = () => {
  const [data, setData] = useState(initValues);
  const { writers, categories, publishers } = useSelector(
    (state) => state.product
  );
  const params = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/product/${params.id}`
      );
      const resData = await res.json();
      setData(resData);
    } catch (error) {}
  };

  useEffect(() => {
    if (params?.id) {
      fetchData();
    } else {
      setData(initValues);
    }
  }, [params?.id]);

  const handleOnChange = (e) => {
    let { name, value } = e.target;

    value = ['hasDiscount', 'isOld'].includes(name) ? e.target.checked : value;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    // console.log(data)

    setData((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    const { name, image, writer, price } = data;

    if (name && image && writer && price) {
      const { _id, ...rest } = data;
      if (params?.id) {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMIN}/product/${params.id}`,
          {
            method: 'PUT',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(rest),
          }
        );

        const fetchRes = await fetchData.json();
        toast(fetchRes.message);
        setData(fetchRes.book);
      } else {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`,
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        );

        const fetchRes = await fetchData.json();

        toast(fetchRes.message);
        setData(initValues);
        navigate(`${fetchRes.book._id}`);
      }
    } else {
      toast('Enter required Fields');
    }
  };

  return (
    <div className='p-4'>
      <form
        className='m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white'
        onSubmit={handleSubmit}
      >
        <label htmlFor='name'>Name</label>
        <input
          type={'text'}
          name='name'
          className='bg-slate-200 p-1 my-1'
          onChange={handleOnChange}
          value={data.name}
        />

        <label htmlFor='writer'>Author</label>
        <select
          className='bg-slate-200 p-1 my-1'
          id='writer'
          name='writer'
          onChange={handleOnChange}
          value={data.writer}
        >
          <option value={''}>Select Author</option>
          {writers.map((el) => (
            <option value={el._id}>{el.name}</option>
          ))}
        </select>
        <label htmlFor='category'>Category</label>
        <select
          className='bg-slate-200 p-1 my-1'
          id='category'
          name='category'
          onChange={handleOnChange}
          value={data.category}
        >
          <option value={''}>Select Category</option>
          {categories.map((el) => (
            <option value={el._id}>{el.name}</option>
          ))}
        </select>

        <label htmlFor='publisher'>Publisher</label>
        <select
          className='bg-slate-200 p-1 my-1'
          id='publisher'
          name='publisher'
          onChange={handleOnChange}
          value={data.publisher}
        >
          <option value={''}>Select Publisher</option>
          {publishers.map((el) => (
            <option value={el._id}>{el.name}</option>
          ))}
        </select>

        <label htmlFor='image'>
          Image
          <div className='h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer'>
            {data.image ? (
              <img src={data.image} alt='' className='h-full' />
            ) : (
              <span className='text-5xl'>
                <BsCloudUpload />
              </span>
            )}

            <input
              type={'file'}
              accept='image/*'
              id='image'
              onChange={uploadImage}
              className='hidden'
            />
          </div>
        </label>

        <label htmlFor='description'>Description</label>
        <textarea
          rows={2}
          value={data.description}
          className='bg-slate-200 p-1 my-1 resize-none'
          name='description'
          onChange={handleOnChange}
        ></textarea>

        <label htmlFor='price' className='my-1'>
          Price
        </label>
        <input
          type={'text'}
          className='bg-slate-200 p-1 my-1'
          name='price'
          onChange={handleOnChange}
          value={data.price}
        />

        <div className='my-1'>
          <input
            type={'checkbox'}
            className='bg-slate-200 p-1 my-1 mr-3'
            name='hasDiscount'
            onChange={handleOnChange}
            checked={data.hasDiscount}
          />
          <label htmlFor='hasDiscount' className='my-1'>
            Has Discount
          </label>
        </div>

        {data.hasDiscount && (
          <>
            <label htmlFor='discount' className='my-1'>
              Discounted Price
            </label>
            <input
              type={'text'}
              className='bg-slate-200 p-1 my-1'
              name='discount'
              onChange={handleOnChange}
              value={data.discount}
            />
          </>
        )}

        <div className='my-1'>
          <input
            type={'checkbox'}
            className='bg-slate-200 p-1 my-1 mr-3'
            name='isOld'
            onChange={handleOnChange}
            checked={data.isOld}
          />
          <label htmlFor='isOld' className='my-1'>
            Old
          </label>
        </div>

        <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow'>
          {params?.id ? 'Update' : `Save`}
        </button>
      </form>
    </div>
  );
};

export default Newproduct;
