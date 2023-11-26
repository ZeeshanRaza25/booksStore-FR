import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDataPublishers } from '../redux/productSlide';
import toast from 'react-hot-toast';

export default function PublishersListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { publishers } = useSelector((state) => state.product);

  const fetchPublishers = async () => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/publisher`);
    const resData = await res.json();
    dispatch(setDataPublishers(resData));
  };

  useEffect(() => {
    fetchPublishers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/publisher/${id}`,
        {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
          },
        }
      );
      const resData = await res.json();
      toast(resData.message);
      fetchPublishers();
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  const handleAddNew = () => navigate('/publisher');

  return (
    <div className='flex flex-col px-20 py-10'>
      <div className='text-center'>
        <button
          onClick={handleAddNew}
          type='button'
          class='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
        >
          Add New Publisher
        </button>
      </div>
      <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
          <div className='overflow-hidden'>
            <table className='min-w-full text-left text-sm font-light'>
              <thead className='border-b font-medium dark:border-neutral-500'>
                <tr>
                  <th scope='col' className='px-6 py-4'>
                    #
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    Name
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    City
                  </th>
                  <th scope='col' className='px-6 py-4'></th>
                </tr>
              </thead>
              <tbody>
                {publishers.map((el, i) => {
                  return (
                    <tr className='border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-[#9b9b9b]'>
                      <td className='whitespace-nowrap px-6 py-4 font-medium'>
                        {i + 1}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4'>
                        {el?.name}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4'>
                        {el?.city?.name}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4'>
                        <div className='whitespace-nowrap justify-center px-2 py-4 flex gap-3'>
                          <div>
                            <button
                              onClick={() => navigate(`/publisher/${el._id}`)}
                              type='button'
                              class='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
                            >
                              Edit
                            </button>
                          </div>
                          <div>
                            <button
                              onClick={() => handleDelete(el._id)}
                              type='button'
                              class='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
