import React from 'react'
import CustomTitle from '../components/helpers/custom-title';
import SearchBar from '../components/helpers/search-bar';
import ProductPreview from './../components/preview/product-preview';
import { useState } from 'react';
import { Owner, Product } from '../types';
import OwnerPreview from '../components/preview/owner-preview';
import { useParams } from 'react-router-dom';
import { fetchApi } from './../helpers/api';
import { useQuery } from '@tanstack/react-query';
import Loader from './../components/helpers/Loader';
import ErrorBoundary from './../components/helpers/error-boundary';

type filterOptions = "all" | "places" | "products"
type searchItem = Owner | Product

const searchAndFilterItems = (items: searchItem[], searchValue: string, currentFilter: filterOptions) => {
  if (currentFilter === "all")
    return items.filter(item => item.name.includes(searchValue))
  if (currentFilter === "places")
    // @ts-ignore
    return items.filter(item => item?.address).filter(item => item.name.includes(searchValue))
  if (currentFilter === "products")
    // @ts-ignore
    return items.filter(item => item?.price).filter(item => item.name.includes(searchValue))
}
// @ts-ignore
const getProducts: (items: searchItem[]) => Product[] = (items: searchItem[]) => items.filter(item => item?.price)
// @ts-ignore
const getPlaces: (items: searchItem[]) => Owner[] = (items: searchItem[]) => items.filter(item => item?.address)

const Search: React.FC = () => {
  const preSearchValue = useParams();
  const [currentFilter, setCurrentFilter] = useState<filterOptions>("all");
  const [searchValue, setSearchValue] = useState<string>(preSearchValue?.searchValue || "")
  const [filteredItems, setFilteredItems] = useState<searchItem[]>([]);
  const { isLoading, isError } = useQuery(["get-owners"], () => fetchApi('owner', "GET", {}), {
    onSuccess: (data) => setFilteredItems((pre: searchItem[]) => [...pre, ...data.data.owners])
  })
  const { isLoading: isLoading2, isError: isError2 } = useQuery(["get-products"], () => fetchApi('product', "GET", {}), {
    onSuccess: (data) => setFilteredItems((pre: searchItem[]) => [...pre, ...data.data.products])
  })
  if (isLoading || isLoading2) return <Loader />
  if (isError || isError2) return <ErrorBoundary errorMessage="حدث خطأ خلال تحميل الموارد, تأكد من اتصالك بالانترنت" />
  return (
    <section className='has-bg-image w-screen h-screen overflow-y-scroll'>
      <CustomTitle title='البحث' isSpaceBetween />
      <div className='flex justify-evenly items-center mx-2 md:w-1/2 md:mx-auto'>
        <div className="relative h-[50px] w-full  flex flex-row-reverse">
          <input type="search" placeholder=" ابحث..."
            className="block p-2.5 w-full text-xl text-main-black bg-gray-50 border-l-gray-50 border-l-2 border border-blue-400 focus:ring-blue-500 focus:outline-none focus:border-blue-500 rtl placeholder:text-black"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button disabled className="p-2.5 text-sm font-medium text-white bg-blue-700 rounded-l-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 block">
            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </div>

        <select
          className='font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 h-[50px] px-2'
          // @ts-ignore
          name="" id="" defaultValue="all" onChange={(e) => setCurrentFilter(e.target.value)}>
          <option value="all">الكل</option>
          <option value="products">منتجات</option>
          <option value="places">متاجر</option>
        </select>
      </div>
      <div className='px-8 md:w-3/4 md:flex md:flex-wrap md:justify-evenly md:mx-auto'>
        {
          getProducts(searchAndFilterItems(filteredItems, searchValue, currentFilter) || []).length ||
            getPlaces(searchAndFilterItems(filteredItems, searchValue, currentFilter) || []).length ?
          <>
          {
            React.Children.toArray(
              getProducts(searchAndFilterItems(filteredItems, searchValue, currentFilter) || [])
                .map(item => <div className='py-4'><ProductPreview {...item} /></div>)
            )
          }
          {
            React.Children.toArray(
              getPlaces(searchAndFilterItems(filteredItems, searchValue, currentFilter) || [])
                .map(item => <div className='py-4'><OwnerPreview {...item} /></div>)
            )
            }
            </> : <p className='text-center w-fit mx-auto font-medium text-4xl mt-[20vh]'>لا يوجد ما يطابق هذا البحث</p>
        }
      </div>
    </section>
  );
}

export default Search;