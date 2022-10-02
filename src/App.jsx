import './App.scss';
import Footer from './Components/Footer/Footer';
import { useEffect, useState, useLayoutEffect } from 'react';
import Home from './pages/Home/Home';
import { BrowserRouter, Redirect, Routes, Route, useLocation } from 'react-router-dom';
import AboutUs from './pages/AboutUs/AboutUs';
import Reference from './pages/Reference/Reference';
import Bonuses from './pages/Bonuses/Bonuses';
import Catalog from './pages/Catalog/Catalog';
import Product from './pages/Product/Product';
import Contacts from './pages/Contacts/Contacts';
import { fetchCategories, fetchCategoriesList, fetchProducts } from './http/productsAPI';
import Adminpanel from './pages/Adminpanel/Adminpanel';
import { createContext } from 'react';

export const CatalogContext = createContext({});

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [thisCategories, setThisCategories] = useState([]);

  useEffect(() => {}, []);

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
    fetchCategories().then((data) => setCategories(data));
    fetchCategoriesList().then((data) => setCategoriesList(data));
  }, []);

  useEffect(() => {
    setThisCategories(
      categories.map((category) => ({
        ...category,
        styles: [...category.styles.map((item, index) => ({ ...item, styleID: index + 1 }))],
      })),
    );
  }, [categories]);

  const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
      window.scroll({
        top: 0,
        left: 0,
        // behavior: 'smooth',
      });
    }, [location.pathname]);
    return children;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Wrapper />
        <CatalogContext.Provider
          value={{
            categories,
            categoriesList,
            thisCategories,
            setThisCategories,
            products,
            setCategories,
            setProducts,
          }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
            <Route
              path="catalog"
              element={
                <Catalog
                  categories={categories}
                  // style={style}
                  products={products}
                />
              }
            />
            {products.map((elem) => (
              <Route path={'/catalog/product/' + elem.id} element={<Product item={elem} />} />
            ))}
            <Route path="about-us" element={<AboutUs />} />
            <Route path="reference" element={<Reference />} />
            <Route path="bonuses" element={<Bonuses />} />
            <Route path="contacts" element={<Contacts />} />

            <Route path="adminpanel" element={<Adminpanel />} />
          </Routes>
        </CatalogContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
