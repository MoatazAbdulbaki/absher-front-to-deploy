import React from 'react'
import { useParams } from 'react-router-dom';
import { Product } from '../types';
import CustomTitle from './../components/helpers/custom-title';
import ProductPreview from './../components/preview/product-preview';
import { useQuery } from '@tanstack/react-query';
import { fetchApi } from './../helpers/api';
import Loader from './../components/helpers/Loader';
import ErrorBoundary from './../components/helpers/error-boundary';

const Products: React.FC = () => {
  const routerId = useParams();
  const { data, isLoading, isError } = useQuery(["get-category", routerId.id], () => fetchApi('category/' + routerId.id, "GET", {}))
  if (isLoading) return <Loader />
  if (isError) return <ErrorBoundary errorMessage="حدث خطأ خلال تحميل الموارد, تأكد من اتصالك بالانترنت" />
  return (
    <section className='has-bg-image min-h-screen'>
      <CustomTitle title={data.data.category.name} />
      <div className='px-8 md:flex md:flex-wrap md:justify-end md:items-center'>
        {
          data.data.category.products.length ?
          React.Children.toArray(
            data.data.category.products.map((product: Product) => <div className='py-4 md:w-1/3'><ProductPreview {...product} /></div>)
            ) : (<p className='text-center w-fit mx-auto font-medium text-xl'>لا يوجد منتجات لعرضها</p>)
        }
      </div>
    </section>
  );
}

export default Products;