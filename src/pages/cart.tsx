import React, { useState } from 'react'
import { cartAtom, tokenAtom, userAtom, workTime } from './../store';
import { useAtom, useAtomValue } from 'jotai';
import { useQuery, useMutation } from '@tanstack/react-query';

import { Link } from 'react-router-dom';
import CustomTitle from './../components/helpers/custom-title';
import CartItem from './../components/preview/cart-item';

import Loader from '../components/helpers/Loader';
import ErrorBoundary from '../components/helpers/error-boundary';
import PopUp from '../components/helpers/pop-up';

import emptyCart from '../assets/images/empty-cart.png'
import { CartItem as CartItemType, Order, Product } from '../types';
import { fetchApi } from '../helpers/api';

const Cart: React.FC = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const token = useAtomValue(tokenAtom);
  const userId = useAtomValue(userAtom);

  const [showPopup, setShowPopup] = useState(false);
  const [localCart, setLocalCart] = useState<CartItemType[]>(cart);

  const { isLoading, isError } = useQuery(["get-products"],
    () => fetchApi('product', "GET", {}), {
    onSuccess: (data) => {
      cart.map(prod => {
        const productInDb = data.data.products.find((el: Product) => el._id === prod.product._id);
        if (!!productInDb) {
          // check if the price updated
          prod.product.price = productInDb.price;
        } else {
          // product deleted by admin
          setLocalCart(localCart.filter((el) => el.product._id != prod.product._id))
        }
      })
    }
  })

  const { mutate, isLoading: isLoading2, isError: isError2 } = useMutation(
    (data: any) => fetchApi('order', "POST", data, token), {
    onSuccess: () => {
      setShowPopup(true)
      setLocalCart([]);
      setCart([]);
    }
  })
  const orderNow = () => {
    let orderLocation = "";
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        if (location) orderLocation = location.coords.latitude + "," + location.coords.longitude
      });
    }
    mutate({ items: cart, location: orderLocation})
  }
  const handleQuantityChange = (type: "increment" | "decrement", id: string) => {
    if (type === "increment") {
      let _temp = localCart;
      _temp.find((el) => el.product._id === id)!.quantity++;
      setCart([..._temp]);
      setLocalCart([..._temp]);
    } else if (type === "decrement") {
      let _temp = localCart;
      if (_temp.find((el) => el.product._id === id)?.quantity == 1) {
        handleDelete(id)
      } else {
        _temp.find((el) => el.product._id === id)!.quantity--;
        setCart([..._temp]);
        setLocalCart([..._temp]);
      }
    } else {
      return;
    }
  }
  const handleDelete = (id: string) => {
    const result = confirm('هل انت متأكد')
    if (result) {
      let _temp = localCart.filter((el) => el.product._id != id)
      setCart([..._temp]);
      setLocalCart([..._temp]);
    }
  }
  const handleWriteMessage = (id: string, message: string) => {
    let _temp = localCart;
    _temp.find((el) => el.product._id === id)!.message = message;
    setCart([..._temp]);
    setLocalCart([..._temp]);
  }
  if (isLoading || isLoading2) return <Loader />
  if (isError || isError2) return <ErrorBoundary errorMessage="حدث خطأ خلال تحميل الموارد, تأكد من اتصالك بالانترنت" />
  return (
    <section className='has-bg-image min-h-[100vh]'>
      <CustomTitle title='السّلة' isSpaceBetween />
      <p className='text-main-red text-2xl text-end font-medium px-4 mb-4'>{workTime}</p>
      {
        cart.length > 0 ?
          (
            <>
              <div className='container mx-auto flex flex-col lg:flex-row lg:justify-end lg:flex-wrap gap-4 lg:gap-0 h-[50vh] lg:max-h-[50vh] overflow-y-scroll px-2'>
                {
                  React.Children.toArray(
                    localCart.map((cartItem) => <CartItem handleQuantityChange={handleQuantityChange} handleWriteMessage={handleWriteMessage} handleDelete={handleDelete} {...cartItem} />)
                  )
                }
              </div>
              <div className='border-y-2 my-8 border-main-red py-2'>
                <p className='text-center font-md font-medium text-main-red'>الاجمالي (بدون حساب الطلبات الخاصة)</p>
                <p className='text-center pr-4 font-4xl font-bold flex items-center gap-2 justify-center'>
                  <span>ل.س</span>
                  <span className='text-2xl'>{localCart.reduce((acc, el) => acc + (+el.product.price * el.quantity), 0)}</span>
                </p>
              </div>
              <button
                className="text-white bg-main-red focus:outline-none font-bold text-xl px-5 py-2.5 text-center mx-auto block w-fit my-4"
                onClick={() => orderNow()}
              >اطلب الان</button>
            </>
          )
          : (
            <div className='flex flex-col justify-center items-center mt-[10vh]'>
              <img src={emptyCart} alt="empty cart" className='max-h-[100px] max-w-[100px] ' />
              <p className='text-center w-fit mx-auto mt-8 font-medium text-xl'>السلة فارغة.. اطلب بعض المنتجات اولاً</p>
              <Link to="/" className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg  px-5 py-2.5 text-center mt-8 mb-2 text-lg">
                عودة
              </Link>
            </div>
          )
      }
      <>
        {
          showPopup ?
            <PopUp close={setShowPopup} message={`تمّ ارسال الطلب بنجاح, سيتم الان مراجعة طلبك وابلاغك عند قبول الطلب
            ${workTime}`}
              linkName="مراجعة الطلب" link='/orders' />
            : null
        }
      </>
    </section>
  );
}

export default Cart;