import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAtomValue } from 'jotai';
import { tokenAtom } from './../store';
import PopUp from './../components/helpers/pop-up';

const PrivateRoutes = () => {
  const token = useAtomValue(tokenAtom);
  const navigate = useNavigate();
  return (
    // token  ? <Outlet /> : <Navigate to='/login' />
    token ? <Outlet /> : <PopUp message='هذا الاجراء يتطلب تسجيل الدخول' link='/register' linkName='إنشاء حساب' close={()=>{navigate(-1)}} />
  )
}

export default PrivateRoutes;