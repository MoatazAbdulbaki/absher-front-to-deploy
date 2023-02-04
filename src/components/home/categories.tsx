import { useQuery } from "@tanstack/react-query";
import Loader from "../helpers/Loader";
import { fetchApi } from '../../helpers/api';
import ErrorBoundary from '../helpers/error-boundary';
import CategorySection from './category-section';

const Categories: React.FC = () => {

  const { data, isLoading, isError } = useQuery(["get-categories"], () => fetchApi('category', "GET", {}))
  if (isLoading) return <Loader />
  if (isError) return <ErrorBoundary errorMessage="حدث خطأ خلال تحميل الموارد, تأكد من اتصالك بالانترنت" />
  return (
    <section className="my-2 md:w-full md:mx-auto">
      {
        data.data.categories.map((category: any) =>
          <CategorySection key={category._id} {...category}
          />)
      }
    </section>
  );
};

export default Categories;
