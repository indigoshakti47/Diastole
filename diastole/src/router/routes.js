import Login from '../pages/Login';
import Map from '../pages/Map';
import RegisterProduct from '../pages/RegisterProduct';
import Products from '../pages/Products';

// Este es un arreglo donde irán todas las rutas de nuestra App ;)
const ROUTES = [
  {
    path: ['/', '/login', '/sign-up'], // could be an array or a string
    key: 'LOGIN',
    exact: true,
    component: Login,
    auth: false,
  },
  {
    path: '/register-product',
    key: 'REGISTER_PRODUCT',
    exact: true,
    component: RegisterProduct,
    auth: false,
  },
  {
    path: '/products',
    key: 'PRODUCTS',
    exact: true,
    component: Products,
    auth: false,
  }
];

export default ROUTES;
