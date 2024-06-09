import { Component } from '@angular/core';
import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component'),
    title: 'Home',
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component'),

    title: 'about',
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component'),

    title: 'cart',
  },
  {
    path: 'single-product/:id',
    loadComponent: () =>
      import('./shared/ui/single-product/single-product.component'),
    title: 'Single product',
  },
  {
    path: 'category/:category',
    loadComponent: () =>
      import('./features/productsort-filter/productsort-filter.component'),
    title: 'Products by category',
  },
  {
    path: 'user/login',
    loadComponent: () => import('./features/register/register.component'),
    title: 'user/login',
  },
  {
    path: 'singup',
    loadComponent: () => import('./shared/ui/signup/signup.component'),
    title: 'Sing up',
  },

  
  {
    path: '404',
    loadComponent: () => import('./features/notfound/notfound.component'),
    title: 'Not found',
  },

  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404',
  },
];
