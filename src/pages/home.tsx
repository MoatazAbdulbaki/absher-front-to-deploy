import React from 'react'
import SearchBar from './../components/helpers/search-bar';

import { Link, useNavigate } from 'react-router-dom';
import Header from './../components/helpers/header';
import PlaceCategories from '../components/home/place-categories';
import cart from '../assets/images/cart-icon.png'
import Categories from './../components/home/categories';



interface Props {

}

const Home: React.FC<Props> = () => {
  const navigate = useNavigate();
  const handleSearch = (value: string) => {
    if (value.length > 0)
      navigate('/search/' + value)
  }
  return (
    <section className='w-screen min-h-screen has-bg-image pt-2 md:w-[98vw]'>
      <div className='container mx-auto'>
        <div className='px-6 w-screen md:w-4/5 md:mx-auto'>
          <Header />
          <div className='flex gap-4 items-center my-2'>
            <SearchBar handlePress={handleSearch} />
            <Link to="/cart">
              <div className='w-[40px] h-[40px]'>
                <img src={cart} />
              </div>
            </Link>
          </div>
        </div>
        <PlaceCategories />
        <Categories />
      </div>
    </section>
  );
}

export default Home;

