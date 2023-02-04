import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAtom, useAtomValue } from 'jotai';

import Loader from './../components/helpers/Loader';
import ErrorBoundary from './../components/helpers/error-boundary';
import CustomTitle from './../components/helpers/custom-title';
import PopUp from '../components/helpers/pop-up';

import { fetchApi } from './../helpers/api';

import { Product } from '../types'
import { cartAtom, tokenAtom } from '../store';




const ProductDetails: React.FC = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const routerId = useParams();
  const [product, setProduct] = useState<Product>();
  const token = useAtomValue(tokenAtom);
  const [showPopup, setShowPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const { isLoading, isError } = useQuery(["get-product", routerId.id], () => fetchApi('product/' + routerId.id, "GET", {}), {
    onSuccess: (data) => setProduct(data.data.product)
  })

  const addToCart = () => {
    if (!token) {
      setShowLoginPopup(true)
      return;
    }
    if (product) {
      setCart([...cart, {
        product,
        quantity: 1
      }])
      setShowPopup(true)
    }
  }
  const isCartContainProduct = () => {
    const _temp = cart.find(prod => prod.product._id == product?._id)
    return !!_temp;
  }
  if (isLoading) return <Loader />
  if (isError) return <ErrorBoundary errorMessage="حدث خطأ خلال تحميل الموارد, تأكد من اتصالك بالانترنت" />
  return (
    <section className='has-bg-image min-h-screen'>
      <CustomTitle title="تفاصيل المنتج" />
      <div className="flex flex-col mx-2 gap-1 mt-12 md:w-3/5 md:mx-auto">
        <div className="w-full min-h-[140px] max-h-[200px] overflow-hidden lg:rounded-md lg:max-h-[400px]">
          <img src={import.meta.env.VITE_API_ROOT + product?.imageUrl} className="w-full h-full" />
        </div>
        <div className="flex flex-col justify-start rtl self-end pr-8 pt-1">
          <p className="text-2xl rtl m-0 mt-1 text-main-black font-bold">{product?.name}</p>
          <p className="text-lg rtl m-0 mt-1 text-main-black font-medium">{product?.price} ل.س</p>
        </div>
        <div className='text-right pr-8 h-[20vh] overflow-y-scroll hide-scroll-bar'>
          <h4 className='text-xl rtl m-0 mt-1 text-main-red font-medium text-center border-b-2 pb-2 border-main-red w-fit mx-auto'>وصف المنتج</h4>
          <p className='text-right'>{product?.description}</p>
        </div>
        <>
          {
            !isCartContainProduct() ?
              (<button type="button"
                className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={() => addToCart()}
              >اضافة الى السّلة</button>) : (
                <button disabled className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                  تمّت اضافة المنتج مسبقاً
                </button>
              )
          }
        </>
      </div>
      <>
        {
          showPopup ?
            <PopUp close={setShowPopup} message="تمّت اضافة المنتج بنجاح"
              linkName="تفقّد عربة التسوق" link='/cart' />
            : null
        }
      </>
      <>
        {
          showLoginPopup ?
            <PopUp message='هذا الاجراء يتطلب تسجيل الدخول' link='/register' linkName='إنشاء حساب' close={setShowLoginPopup} />
            : null
        }
      </>
    </section>
  );
}

export default ProductDetails;