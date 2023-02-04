import { Order } from '../../types'
import { Link } from 'react-router-dom';


const getTinyDate = (date: Date) => {
  return new Date(date).toLocaleDateString() +
    "  -   " +
    [...new Date(date).toLocaleTimeString().split(":")][0] +
    ":" +
    [...new Date(date).toLocaleTimeString().split(":")][1] +
    " " +
    [...new Date(date).toLocaleTimeString().split(":")][2].slice(-2)
}

const OrderPreview: React.FC<Order> = ({ _id, date, isSpecial, items, orderMessage, status, rejectReson }) => {
  return (
    <Link to={`/order/${_id}`} state={{ _id, date, isSpecial, items, orderMessage, status, rejectReson }} className={`flex flex-col justify-between pr-8 py-4 my-4 w-[80vw] md:w-[40vw] mx-auto rounded-md
        ${status === "review" ? "bg-[#481852]" : ""}
        ${status === "approved" ? "bg-[#425e37]" : ""}
        ${status === "delivered" ? "bg-[#1f1e1e]" : ""}
        ${status === "rejected" ? "bg-[#ff1919]" : ""}

      `}>
      <div className='flex flex-wrap flex-row-reverse items-center gap-4 my-2'>
        <h4 className='text-lg m-0 mt-1 text-main-red font-medium border-b-2 pb-2 border-main-red w-fit'>:تاريخ الطلب</h4>
        <p className="w-full text-lg text-main-white font-bold text-end">{getTinyDate(date)}</p>
      </div>
      <div className='flex flex-wrap flex-row-reverse items-center gap-4 my-2'>
        <h4 className='text-lg rtl m-0 mt-1 text-main-red font-medium text-center border-b-2 pb-2 border-main-red w-fit'>حالة الطلب:</h4>
        <p className="w-full text-lg rtl text-main-white font-bold">{
          status === "approved" ? "تمّت الموافقة ويتم التوصيل الآن" :
            status === "delivered" ? "تم توصيل الطلب" :
              status === "review" ? "الطلب قيد المراجعة حالياً" :
                status === "rejected" ? "تم رفض الطلب, اضغط لمعرفة السبب" : ""
        }</p>
      </div>
      <>
        {
          status === "rejected" ? (
            <div className='flex flex-wrap flex-row-reverse items-center gap-4 my-2' >
              <h4 className='text-lg rtl m-0 mt-1 text-main-white font-medium text-center border-b-2 pb-2 border-main-red w-fit'> سبب الرفض:</h4>
              <p className="max-w-full text-md text-main-white font-bold text-ellipsis rtl">{rejectReson?.slice(20) + "..."}</p>
            </div>
          ) :
            isSpecial ? (
              <div className='flex flex-wrap flex-row-reverse items-center gap-4 my-2' >
                <h4 className='text-lg rtl m-0 mt-1 text-main-red font-medium text-center border-b-2 pb-2 border-main-red w-fit'>الطلب الخاص:</h4>
                <p className="max-w-full text-md text-main-white font-bold text-ellipsis rtl">{orderMessage.slice(20) + "..."}</p>
              </div>
            ) : (
              <div className='flex flex-wrap flex-row-reverse items-center gap-4 my-2'>
                <h4 className='text-lg rtl m-0 mt-1 text-main-red font-medium text-center border-b-2 pb-2 border-main-red w-fit'>السعر الكلي :</h4>
                <p className="w-full text-lg rtl text-main-white font-bold">{items.reduce((acc, el) => acc + (+el.product.price * el.quantity), 0)}  ل.س</p>
              </div>
            )
        }
      </>
    </Link >
  )
}

export default OrderPreview;