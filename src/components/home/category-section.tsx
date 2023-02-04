import { Category, Product } from '../../types';
import ProductPreview from '../preview/product-preview';
import { Link } from 'react-router-dom';


const CategorySection: React.FC<Category> = ({ _id, name, products }) => {
  return (
    <div className='w-screen md:w-[90%] md:mx-auto'>
      <div className='rtl flex justify-between items-center px-6'>
        <h1 className='text-xl rtl m-0 font-bold text-main-black'>{name}</h1>
        <Link to={"/products/" + _id} className="text-main-orange font-medium">
          مشاهدة الكل
        </Link>
      </div>
      <div className="w-full flex overflow-x-scroll pb-10 hide-scroll-bar rtl pt-5">
        {
          products.length ?
          products.filter((_, idx) => idx < 5).map((product: Product) => (
            <ProductPreview key={product._id} {...product} />
          )) : (<p className='text-center w-fit mx-auto font-medium text-xl'>لا يوجد منتجات لعرضها</p>)
        }
      </div>
    </div>
  )
}

export default CategorySection;