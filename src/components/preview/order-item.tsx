import { CartItem } from './../../types';

const OrderItem: React.FC<CartItem> = ({ quantity, product }) => {
  return (
    <div className="w-[300px] flex flex-col mx-2 gap-2 items-center h-[230px] bg-[#fee2e2] rounded-md">
      <div className='basis-2/3 flex flex-col items-end gap-2 pr-8'>
        <div className='flex flex-col justify-between'>
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
        </div>
      </div>
    </div>
  )
}

export default OrderItem;