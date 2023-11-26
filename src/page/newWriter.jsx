import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const NewWriter = () => {
  const [data, setData] = useState({
    name: '',
  });

  const params = useParams();

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/writer/${params.id}`
      );
      const resData = await res.json();
      setData(resData);
    } catch (error) {}
  };

  useEffect(() => {
    if (params?.id) {
      fetchData();
    } else {
      setData({ name: '' });
    }
  }, [params?.id]);

  const handleOnChange = (e) => {
    let { name, value } = e.target;

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

    const { name } = data;

    if (name) {
      if (params?.id) {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMIN}/writer/${params.id}`,
          {
            method: 'PUT',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({ name }),
          }
        );

        const fetchRes = await fetchData.json();
        toast(fetchRes.message);
        setData({ name: fetchRes.writer.name });
      } else {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMIN}/writer`,
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

        setData({ name: '' });
      }
    } else {
      toast('Name is missing!');
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
        <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow'>
          {params?.id ? 'Update' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default NewWriter;
