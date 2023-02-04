import { cartAtom, tokenAtom } from './../../store';
import { useAtom, useAtomValue } from 'jotai';
import { Link } from "react-router-dom";
import { Product } from "../../types";
import { useState } from 'react';
import PopUp from '../helpers/pop-up';

const ProductPreview: React.FC<Product> = ({ _id, name, imageUrl, price, category, description, owner }) => {
  const [cart, setCart] = useAtom(cartAtom);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const token = useAtomValue(tokenAtom);

  const addToCart = () => {
    if (!token) {
      setShowLoginPopup(true)
      return;
    }
    setCart([...cart, {
      product: {
        _id,
        category,
        description,
        imageUrl,
        name,
        owner,
        price
      },
      quantity: 1
    }])
  }
  const isCartContainProduct = () => {
    const _temp = cart.find(prod => prod.product._id == _id)
    return !!_temp;
  }
  return (
    <div className="min-w-[200px] flex flex-col mx-2 gap-1 items-center h-[250px] bg-[#fee2e2] rounded-xl overflow-hidden">
      <Link to={"/product/" + _id} className="rounded-xl overflow-hidden flex flex-col items-center">
        <div className="w-full h-[140px] overflow-hidden">
          <img src={import.meta.env.VITE_API_ROOT + imageUrl} className="w-full h-full" />
        </div>

        <div className="flex flex-col justify-start rtl self-end pr-2 pt-1">
          <p className="text-md rtl m-0 mt-1 text-main-black font-bold">{name}</p>
          <p className="text-md rtl m-0 mt-1 text-zinc-500 font-medium">{price}</p>
        </div>
      </Link>
      {
        !isCartContainProduct() ?
          (<button type="button"
            className="text-white mx-auto h-[30px] self-end bg-red-700 hover:bg-red-800 focus:outline-none text-md px-2.5 py-1 text-center"
            onClick={() => addToCart()}
          >اضافة الى السّلة</button>) : (
            <button disabled className="text-white mx-auto h-[30px] self-end bg-blue-700 hover:bg-blue-800 focus:outline-none text-md px-2.5 py-1 text-center">
              تمّت اضافة المنتج مسبقاً
            </button>
          )
      }
      <>
        {
          showLoginPopup ?
            <PopUp message='هذا الاجراء يتطلب تسجيل الدخول' link='/register' linkName='إنشاء حساب' close={setShowLoginPopup} />
            : null
        }
      </>
    </div>
  )
}

export default ProductPreview;