import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Home from './page/Home';
import Menu from './page/Menu';
import About from './page/About';
import Contact from './page/Contact';
import Login from './page/login';
import Product from './page/Newproduct';
import Signup from './page/Signup';
import { store } from './redux/index';
import { Provider } from 'react-redux';
import Cart from './page/Cart';
import Success from './page/Success';
import Cancel from './page/Cancel';
import NewWriter from './page/newWriter';
import BookListing from './page/BooksListing';
import AuthorsListing from './page/authorsList';
import CategoriesListing from './page/categoriesListing';
import Category from './page/category';
import CitiesListing from './page/citiesListing';
import City from './page/city';
import PublishersListing from './page/publishersListing';
import Publisher from './page/publisher';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      {/* <Route path="menu" element={<Menu />} /> */}
      <Route path='menu/:filterby' element={<Menu />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='login' element={<Login />} />
      <Route path='product' element={<Product />} />
      <Route path='product/:id' element={<Product />} />
      <Route path='writer' element={<NewWriter />} />
      <Route path='writer/:id' element={<NewWriter />} />
      <Route path='signup' element={<Signup />} />
      <Route path='cart' element={<Cart />} />
      <Route path='success' element={<Success />} />
      <Route path='cancel' element={<Cancel />} />
      <Route path='all-books' element={<BookListing />} />
      <Route path='all-authors' element={<AuthorsListing />} />
      <Route path='all-categories' element={<CategoriesListing />} />
      <Route path='category/:id' element={<Category />} />
      <Route path='category' element={<Category />} />
      <Route path='all-cities' element={<CitiesListing />} />
      <Route path='City/:id' element={<City />} />
      <Route path='City' element={<City />} />
      <Route path='all-publishers' element={<PublishersListing />} />
      <Route path='publisher/:id' element={<Publisher />} />
      <Route path='publisher' element={<Publisher />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
