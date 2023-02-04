import React from 'react'
import { useLocation } from 'react-router-dom';

import OrderItem from '../components/preview/order-item';
import CustomTitle from '../components/helpers/custom-title';
import Loader from '../components/helpers/Loader';

import { CartItem } from '../types';

interface Props {

}

const getTinyDate = (date: Date) => {
  return new Date(date).toLocaleDateString() +
    "  -   " +
    [...new Date(date).toLocaleTimeString().split(":")][0] +
    ":" +
    [...new Date(date).toLocaleTimeString().split(":")][1] +
    " " +
    [...new Date(date).toLocaleTimeString().split(":")][2].slice(-2)
}

const OrdersDetails: React.FC<Props> = () => {
  const { state } = useLocation();
  if (!state) return <Loader />
  return (
    <section className='has-bg-image min-h-screen'>
      <CustomTitle title='تفاصيل الطلب' />
      <div>
        <div className='flex flex-wrap flex-row-reverse pr-10 items-center gap-4 my-2'>
          <h4 className='text-lg m-0 mt-1 text-main-red font-medium border-b-2 pb-2 border-main-red w-fit'>:تاريخ الطلب</h4>
          <p className="w-full text-lg text-main-black font-bold text-end">{getTinyDate(state.date)}</p>
        </div>
        <div className='flex flex-wrap flex-row-reverse pr-10 items-center gap-4 my-2'>
          <h4 className='text-lg rtl m-0 mt-1 text-main-red font-medium text-center border-b-2 pb-2 border-main-red w-fit'>حالة الطلب:</h4>
          <p className="w-full text-lg rtl text-main-black font-bold">{
            state.status === "approved" ? "تمّت الموافقة ويتم التوصيل الآن" :
              state.status === "delivered" ? "تم توصيل الطلب" : "الطلب قيد المراجعة حالياً"
          }</p>
        </div>
        <div className='flex flex-wrap flex-row-reverse pr-10 items-center gap-4 my-2'>
          <h4 className='text-lg m-0 mt-1 text-main-red font-medium border-b-2 pb-2 border-main-red w-fit'>:السعر الكلي</h4>
          <p className="w-full text-lg text-main-black font-bold text-end">{state.items.reduce((acc: number, el: CartItem) => acc + (+el.product.price * el.quantity), 0)}  ل.س</p>
        </div>
      </div>
      <>
        {
          status === "rejected" ? (
            <div className='flex flex-wrap flex-row-reverse items-center gap-4 my-2' >
              <h4 className='text-lg rtl m-0 mt-1 text-main-white font-medium text-center border-b-2 pb-2 border-main-red w-fit'> سبب الرفض:</h4>
              <p className="max-w-full text-md text-main-white font-bold text-ellipsis rtl">{state.rejectReson}</p>
            </div>
          ) :
            state.isSpecial ? (
              <div className='flex flex-wrap flex-row-reverse items-center gap-4 my-2 pr-10'>
                <h4 className='text-lg rtl m-0 mt-1 text-main-red font-medium text-center border-b-2 pb-2 border-main-red w-fit'>الطلب الخاص:</h4>
                <p className="w-full text-md text-main-black font-bold  rtl">{state.orderMessage}</p>
              </div>
            ) : (
              <div className='container pt-10 items-center mx-auto flex flex-col lg:flex-row lg:justify-end lg:flex-wrap gap-4 lg:gap-0 h-[50vh] lg:max-h-[50vh] overflow-y-scroll px-2'>
                {
                  React.Children.toArray(
                    state.items.map((cartItem: CartItem) => <OrderItem {...cartItem} />)
                  )
                }
              </div>
            )
        }
      </>
    </section>
  );
}

export default OrdersDetails;