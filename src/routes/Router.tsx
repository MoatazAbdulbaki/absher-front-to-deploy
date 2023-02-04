import { Routes, Route } from 'react-router-dom';
import Home from './../pages/home';
import Register from './../pages/register';
import Login from './../pages/login';
import Orders from './../pages/orders';
import Cart from './../pages/cart';
import Search from './../pages/search';
import ProductDetails from './../pages/product-details';
import PlaseDetails from './../pages/place-details';
import Prodocts from '../pages/products';
import Loader from './../components/helpers/Loader';
import ErrorBoundary from './../components/helpers/error-boundary';
import PrivateRoutes from './private-routes';
import PublicRoutes from './public-routes';
import Places from '../pages/places';
import SpecialOrder from '../pages/special-order';
import OrdersDetails from '../pages/order-details';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/search/:searchValue' element={<Search />} />
			<Route path='/product/:id' element={<ProductDetails />} />
			<Route path='/place/:id' element={<PlaseDetails />} />
			<Route path='/products/:id' element={<Prodocts />} />
			<Route path='/places/:id' element={<Places />} />

			<Route element={<PrivateRoutes />}>
				<Route path='/cart' element={<Cart />} />
				<Route path='/orders' element={<Orders />} />
				<Route path='/special-order' element={<SpecialOrder />} />
				<Route path='/order/:id' element={<OrdersDetails />} />
			</Route>

			<Route element={<PublicRoutes />}>
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
			</Route>


			{/* test */}
			<Route path='/error' element={<ErrorBoundary errorMessage='اتصال انترنت ضعيف' />} />
			<Route path='/loader' element={<Loader />} />
		</Routes>
	);
};

export default Router;
