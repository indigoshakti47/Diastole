import Login from '../pages/Login';
import Map from '../pages/Map';
import RegisterProduct from '../pages/RegisterProduct';
import Products from '../pages/Products';
import ListBeneficiaries from '../pages/ListBeneficiaries';
import DetailedBeneficiarie from '../pages/DetailedBeneficiare';
import RequestCodeBeneficiarie from '../pages/RequestCodeBeneficiarie';

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
    auth: true,
  },
  {
    path: '/products',
    key: 'PRODUCTS',
    exact: true,
    component: ListBeneficiaries,
    auth: true,
  },
  {
    path: '/map',
    key: 'MAPS',
    exact: true,
    component: Map,
    auth: true,
  },
  {
    path: '/lista-beneficiarios',
    key: 'LISTA_BENEFICIARIOS',
    exact: true,
    component: ListBeneficiaries,
    auth:true
  },
  {
    path: '/detalles-beneficiarios/:idBeneficiario',
    key: 'DETALLES_BENEFICIARIOS',
    exact: true,
    component: DetailedBeneficiarie,
    auth:true
  },
  {
    path: '/verificar-beneficiario/:idBeneficiario',
    key: 'VERIFICAR_BENEFICIARIO',
    exact: true,
    component: RequestCodeBeneficiarie,
    auth:true
  },
  {
    path: '/register-product',
    key: 'REGISTER_PRODUCT',
    exact: true,
    component: RegisterProduct,
    auth: true,
  },
  {
    path: '/products',
    key: 'PRODUCTS',
    exact: true,
    component: ListBeneficiaries,
    auth: true,
  },
];

export default ROUTES;
