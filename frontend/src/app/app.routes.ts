import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Cart } from './pages/cart/cart';
import { AddProduct } from './pages/add-product/add-product';
import { Signup } from './pages/signup/signup';
import { authGuard } from './guards/auth-guard';
import { Orders } from './pages/orders/orders';

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: Home
    },
    {
        path: "login",
        component: Login
    },
    {
        path: "cart",
        component: Cart
    },
    {
        path: "orders",
        component: Orders
    },
    {
        path: 'add-products',
        component: AddProduct,
        canActivate: [authGuard]
    },
    {
        path : 'signup',
        component: Signup
    }
];
