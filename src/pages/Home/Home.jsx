import React from 'react';
import CallForm from '../.././Business/CallForm/CallForm';
import Categories from '../.././Components/Categories/Categories';
import AboutUsShort from '../.././Components/AboutUsShort/AboutUsShort';
import SpecialOffer from '../.././Components/SpecialOffer/SpecialOffer';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

function Home() {
  return (
    <>
      <Header imgHome={true} />
      <main>
        <Categories />
        <CallForm />
        <AboutUsShort />
        <SpecialOffer />
      </main>
      <Footer />
    </>
  );
}

export default Home;
