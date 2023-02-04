import React from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import ProductPreview from './../components/preview/product-preview';

import Loader from './../components/helpers/Loader';
import CustomTitle from './../components/helpers/custom-title';
import ErrorBoundary from './../components/helpers/error-boundary';

import { Owner, Product } from './../types/index';
import { fetchApi } from './../helpers/api';

interface ownerWithItsProducts extends Owner {
  products: Product[];
}

const PlaseDetails: React.FC = () => {
  const [owner, setOwner] = useState<ownerWithItsProducts>()
  const routerId = useParams();
  const { isLoading, isError } = useQuery(
    ["get-place", routerId.id],
    () => fetchApi('owner/' + routerId.id, "GET", {}),
    {
      onSuccess: (data) => setOwner(data.data.owner)
    }
  )
  if (isLoading) return <Loader />
  if (isError) return <ErrorBoundary errorMessage="حدث خطأ خلال تحميل الموارد, تأكد من اتصالك بالانترنت" />
  return (
    <section className='has-bg-image'>
      <CustomTitle title="تفاصيل" isSpaceBetween/>
      <div className="flex flex-col mx-2 gap-1 items-center">
        <div className="w-full min-h-[140px] max-h-[200px] overflow-hidden">
          <img src={import.meta.env.VITE_API_ROOT + owner?.imageUrl} className="w-full h-full" />
        </div>


        <div className="flex flex-col justify-start rtl self-end pr-2 pt-1">
          <p className="text-md rtl m-0 mt-1 text-main-black font-bold">{owner?.name}</p>
          <p className="text-md rtl m-0 mt-1 text-zinc-500 font-medium">{owner?.description}</p>

        </div>
        <div className='text-right'>
          <h4 className='text-xl rtl m-0 my-4 text-main-red font-medium text-center border-b-2 pb-2 border-main-red w-[25vw] mx-auto'> العنوان</h4>
          <p className='text-right'>{owner?.address}</p>
        </div>
        <h4 className='text-xl rtl m-0 my-4 text-main-red font-medium text-center border-b-2 pb-2 border-main-red w-[25vw] mx-auto'> المنتجات</h4>
        <div className="w-full flex overflow-x-scroll pb-10 hide-scroll-bar rtl pt-5">
          {
            owner?.products.length ?
              owner.products.map((product: Product) => (
                <ProductPreview key={product._id} {...product} />
              )) : (<p className='text-center w-fit mx-auto font-medium text-xl'>لا يوجد منتجات لعرضها</p>)
          }
        </div>
      </div>
    </section>
  );
}

export default PlaseDetails;