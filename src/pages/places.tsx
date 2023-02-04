import React from 'react'
import { useParams } from 'react-router-dom';
import CustomTitle from './../components/helpers/custom-title';
import { useQuery } from '@tanstack/react-query';
import { fetchApi } from './../helpers/api';
import Loader from './../components/helpers/Loader';
import ErrorBoundary from './../components/helpers/error-boundary';
import { Owner } from './../types/index';
import OwnerPreview from '../components/preview/owner-preview';

const Places: React.FC = () => {
  const routerId = useParams();
  const { data, isLoading, isError } = useQuery(["get-place", routerId.id], () => fetchApi('place/' + routerId.id, "GET", {}))
  if (isLoading) return <Loader />
  if (isError) return <ErrorBoundary errorMessage="حدث خطأ خلال تحميل الموارد, تأكد من اتصالك بالانترنت" />
  return (
    <section className='has-bg-image min-h-screen'>
      <CustomTitle title={data.data.placeCategory.name} isSpaceBetween/>
      <div className='px-8 md:flex md:flex-wrap md:justify-end md:items-center'>
        {data.data.placeCategory.owners.length ?
          (data.data.placeCategory.owners.map((owner: Owner) => <OwnerPreview key={owner._id} {...owner} />))
          : (<p className='text-center w-fit mx-auto font-medium text-xl'>لا يوجد أماكن لعرضها</p>)
        }
      </div>
    </section>
  );
}

export default Places;