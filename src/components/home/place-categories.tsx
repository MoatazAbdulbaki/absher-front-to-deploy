import { useQuery } from "@tanstack/react-query";
import Loader from "../helpers/Loader";
import { fetchApi } from '../../helpers/api';
import ErrorBoundary from '../helpers/error-boundary';
import PlacePreview from './../preview/place-preview';


const PlaceCategories: React.FC = () => {

  const { data, isLoading, isError } = useQuery(["get-places"], () => fetchApi('place', "GET", {}))

  if (isLoading) return <Loader />
  if (isError) return <ErrorBoundary errorMessage="حدث خطأ خلال تحميل الموارد, تأكد من اتصالك بالانترنت" />
  return (
    <section className="my-2">
      <div className="w-screen md:w-3/4 md:mx-auto flex overflow-x-scroll pb-10 hide-scroll-bar rtl pt-5">
        {
          data?.data.placeCategories.map((item: any) => (
            <PlacePreview key={item._id} {...item} />
          ))
        }
      </div>

    </section>
  );
};

export default PlaceCategories;
