import { useRef } from 'react';
import { useAtom } from 'jotai';
import { Link, useNavigate } from 'react-router-dom';

import { cartAtom, tokenAtom, userAtom } from './../../store';
import order from '../../assets/images/order-history-icon.png'


interface Props {
  isOpen: boolean;
  setIsOpen: Function;
}

const SideBar: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement | null>(null);
  const [token, setToken] = useAtom(tokenAtom);
  const [_1, setCart] = useAtom(cartAtom);
  const [_2, setUser] = useAtom(userAtom);
  const logout = () => {
    setToken("")
    setCart([])
    setUser("")
    navigate('/login')
  }
  const handleClickOutside = (e: React.MouseEvent) => {
    // @ts-ignore
    if (!ref.current?.contains(e.target)) {
      setIsOpen(false)
    }
  }
  return (
    <aside
      onClick={handleClickOutside}
      className={`w-screen fixed inset-0 h-screen flex justify-end bg-[#eeeeee75]  p-0 m-0 z-50 overflow-hidden
      ${isOpen ? "right-0" : "left-full duration-300"}`}
    >
      <div className={`${isOpen ? "w-2/3 sm:w-1/3 lg:w-1/5" : "w-1/3 sm:w-0"} h-full bg-slate-800 pt-32 duration-500`} ref={ref}>
        <div className="flex flex-col">
          <Link to="special-order" className="text-white flex justify-between items-center font-bold cursor-pointer text-xl border-y-2 border-white w-full text-end p-8">
            <div className='w-[40px] h-[40px]'>
              <svg width="36" height="36" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
              </svg>
            </div>
            <span>طلب خاص</span>
          </Link>
          <Link to="/orders" className="text-white flex justify-between items-center font-bold cursor-pointer text-xl border-b-2 border-white w-full text-end p-8">
            <div className='w-[40px] h-[40px]'>
              <img src={order} />
            </div>
            <span>الطلبات</span>
          </Link>
          <Link to="/news" className="text-white flex justify-between items-center font-bold cursor-pointer text-xl border-b-2 border-white w-full text-end p-8">
            <div className='w-[40px] h-[40px]'>
              <svg width="36" height="36" fill="currentColor" className="bi bi-fire" viewBox="0 0 16 16">
                <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
              </svg>
            </div>
            <span>جديدنا</span>
          </Link>
          {
            token ? (
              <button className="text-white flex justify-between items-center font-bold cursor-pointer text-xl border-b-2 border-white w-full text-end p-8" onClick={() => logout()}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="#fff"><path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path><path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"></path></svg>
                <span>تسجيل الخروج</span>
              </button>
            ): (
                <Link to="/register" className="text-white flex justify-between items-center font-bold cursor-pointer text-xl border-b-2 border-white w-full text-end p-8">
                  <div className='w-[40px] h-[40px]'>
                    <svg width="36" height="36" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
                      <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                    </svg>
                  </div>
                  <span>إنشاء حساب</span>
                </Link>
            )
          }

        </div>
        <button className="text-white font-bold cursor-pointer text-lg block w-full pt-10 pr-5" onClick={() => setIsOpen(false)}>
          <span className='flex justify-between items-center w-24 ml-auto border-2 border-white p-3'>
            <span className='text-main-red pt-2'>
              <svg width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </span>
            <span>إغلاق</span>
          </span>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
