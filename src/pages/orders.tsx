import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import Loader from './../components/helpers/Loader';
import ErrorBoundary from './../components/helpers/error-boundary';
import CustomTitle from './../components/helpers/custom-title';
import OrderPreview from './../components/preview/order-preview';

import { tokenAtom } from '../store';
import { Order } from '../types';
import { fetchApi } from './../helpers/api';

interface Props {

}

const Orders: React.FC<Props> = () => {
  const token = useAtomValue(tokenAtom)
  const { data, isLoading, isError } = useQuery(["get-my-orders"],
    () => fetchApi('order/my-orders', "GET", {}, token))
  if (isLoading) return <Loader />
  if (isError) return <ErrorBoundary errorMessage="حدث خطأ خلال تحميل الموارد, تأكد من اتصالك بالانترنت" />
  return (
    <section className='has-bg-image min-h-screen'>
      <CustomTitle title='الطلبات' isSpaceBetween />
      <div className='md:flex md:flex-wrap md:container md:mx-auto'>
        {
          data.data.orders.length ?
            React.Children.toArray(
              data.data.orders
                .sort((a: Order, b: Order) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
                .map((order: Order) => <OrderPreview {...order} />)
            ) : (<p className='text-center w-fit mx-auto font-medium text-xl'>لا يوجد طلبات لعرضها</p>)
        }
      </div>
    </section>
  );
}

export default Orders;