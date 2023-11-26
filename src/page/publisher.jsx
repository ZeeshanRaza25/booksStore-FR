import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const initValues = {
  name: '',
  city: null,
};

const Publisher = () => {
  const [data, setData] = useState(initValues);
  const { cities } = useSelector((state) => state.product);
  const params = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/publisher/${params.id}`
      );
      const resData = await res.json();
      console.log('resData :>> ', resData);
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
    console.log('name, value :>> ', name, value);
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    const { name, city } = data;

    if (name && city) {
      const { _id, ...rest } = data;
      if (params?.id) {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMIN}/publisher/${params.id}`,
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
        setData(initValues);
      } else {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMIN}/publisher`,
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
        navigate(`${fetchRes.publisher._id}`);
      }
    } else {
      toast('Enter required Fields');
    }
  };
  console.log('cities :>> ', cities);
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

        <label htmlFor='city'>City</label>
        <select
          className='bg-slate-200 p-1 my-1'
          id='city'
          name='city'
          onChange={handleOnChange}
          value={data.city}
        >
          <option value={''}>Select City</option>
          {cities.map((el) => (
            <option value={el._id}>{el.name}</option>
          ))}
        </select>

        <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow'>
          {params?.id ? 'Update' : `Save`}
        </button>
      </form>
    </div>
  );
};

export default Publisher;
