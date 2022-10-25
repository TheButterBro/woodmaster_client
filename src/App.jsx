import './App.scss';
import { Helmet } from 'react-helmet';
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
import Agreement from './pages/Agreement/Agreement';
import SocialList from './Components/SocialList/SocialList';

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
      <Helmet>
        <meta name="robots" content="all" />
        <title>WoodMaster - Мебельная фабрика в Ульяновске</title>
        <meta
          name="description"
          content="Наша компания «WoodMaster» уже долгое время специализируется на продаже качественной мебели и теперь мы можем с уверенностью заявить о том, что достигли высокой эффективности в нашей работе."
        />
        <meta name="keywords" content="Мебельная фабрика, купить мебель, продажа мебели" />
      </Helmet>
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
            {products.map((elem, index) => (
              <Route
                key={`product card ${elem.id}`}
                path={'/catalog/product/' + elem.id}
                element={<Product item={elem} />}
              />
            ))}
            <Route path="about-us" element={<AboutUs />} />
            <Route path="reference" element={<Reference />} />
            <Route path="bonuses" element={<Bonuses />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="agreement" element={<Agreement />} />
            <Route path="adminpanel" element={<Adminpanel />} />
          </Routes>
        </CatalogContext.Provider>
        <SocialList />
      </BrowserRouter>
    </div>
  );
}

export default App;
