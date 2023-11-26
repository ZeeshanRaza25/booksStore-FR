// import logo from "./logo.svg";
import './App.css';
import Header from './component/Header';
import { Outlet, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import {
  setDataCategories,
  setDataCities,
  setDataProduct,
  setDataPublishers,
  setDataWriters,
} from './redux/productSlide';
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from './redux/userSlice';

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  // const productData = useSelector((state) => state.product)

  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`);
      const resData = await res.json();
      dispatch(setDataProduct(resData));

      const writersRes = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/writer`
      );
      const writersData = await writersRes.json();
      dispatch(setDataWriters(writersData));

      const cities = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/city`);
      const citiesData = await cities.json();
      dispatch(setDataCities(citiesData));

      const cat = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/category`);
      const catData = await cat.json();
      dispatch(setDataCategories(catData));

      const pub = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/publisher`
      );
      const pubData = await pub.json();
      dispatch(setDataPublishers(pubData));
    })();
  }, [pathname]);

  const user = localStorage.getItem('user');

  useEffect(() => {
    if (user) {
      dispatch(loginRedux(JSON.parse(user)));
    }
  }, [user]);

  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
          <Outlet />
        </main>{' '}
      </div>{' '}
    </>
  );
}

export default App;
