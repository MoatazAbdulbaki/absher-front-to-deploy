import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '../../types';

interface Props extends CartItemType {
  handleQuantityChange: (type: "increment" | "decrement", id: string) => void
  handleDelete: (id: string) => void
  handleWriteMessage: (id: string, message: string) => void
}
const CartItem: React.FC<Props> = ({ quantity, product, message, handleQuantityChange, handleDelete, handleWriteMessage }) => {
  return (
    <div className="mx-2 gap-2 min-h-[400px] max-h-[450px] bg-[#ffecc7] rounded-md  lg:w-[24vw] lg:my-4">
      <div className='justify-evenly flex'>
        <div className='basis-1/3 flex flex-col justify-center items-center self-center'>
          <button type="button" onClick={() => handleQuantityChange("increment", product._id)} className="text-main-red hover:text-white border border-main-red hover:bg-main-red focus:outline-none font-bold rounded-lg text-2xl duration-300 px-4 py-2 flex justify-center items-center mb-8">+</button>
          <p className="text-lg rtl text-black font-medium">{quantity}</p>
          <button type="button" onClick={() => handleQuantityChange("decrement", product._id)} className="text-main-red hover:text-white border border-main-red hover:bg-main-red focus:outline-none font-bold rounded-lg text-2xl duration-300 px-4 py-2 flex justify-center items-center mt-8">-</button>
        </div>
        <div className='basis-2/3 flex flex-col items-end gap-2 pr-8 relative'>
          <div className='flex flex-wrap flex-row-reverse items-center gap-4 my-2'>
            <h4 className='text-lg m-0 mt-1 text-main-red font-medium border-b-2 pb-2 border-main-red w-fit'>:اسم المنتج</h4>
            <p className="text-lg text-main-black font-bold">{product.name}</p>
          </div>
          <div className='flex flex-wrap flex-row-reverse items-center gap-4 my-2'>
            <h4 className='text-lg rtl m-0 mt-1 text-main-red font-medium text-center border-b-2 pb-2 border-main-red w-fit'>سعر المنتج:</h4>
            <p className="text-lg rtl text-main-black font-bold">{product.price}  ل.س</p>
          </div>
          <div className='flex flex-wrap flex-row-reverse items-center gap-4 my-2'>
            <h4 className='text-lg rtl m-0 mt-1 text-main-red font-medium text-center border-b-2 pb-2 border-main-red w-fit'>السعر الكلي:</h4>
            <p className="text-lg rtl text-main-black font-bold">{+product.price * quantity}  ل.س</p>
          </div>
          <div className='flex justify-between flex-nowrap items-center mt-4'>
            <button onClick={() => handleDelete(product._id)}
              className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2  ">
              حذف
            </button>
            <Link to={"/product/" + product._id} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2  ">
              التفاصيل
            </Link>
          </div>
        </div>
      </div>
      <div className='px-6 flex flex-col gap-2 items-end'>
        <label htmlFor="note" className="text-lg m-0 my-2 text-main-red font-medium border-b-2 border-main-red w-fit text-start">إضافة ملاحظة</label>
        <input
          className="bg-white h-16 border border-md border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rtl placeholder:text-black placeholder:text-lg"
          type="text"
          placeholder="مثل:بدون مخلل, مع حد...."
          id="note"
          aria-describedby="note"
          name="note"
          onChange={(e) => handleWriteMessage(product._id, e.target.value)}
          value={message || ""}
        />
      </div>
    </div>
  )
}

export default CartItem;