import { Navigate, Outlet } from 'react-router-dom'
import { useAtomValue } from 'jotai';
import { tokenAtom } from './../store';

const PublicRoutes = () => {
  const token = useAtomValue(tokenAtom);
  return (
    !token ? <Outlet /> : <Navigate to='/' />
  )
}

export default PublicRoutes;