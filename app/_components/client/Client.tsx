'use client';
import { getCurrentRole } from '@/app/_services/localService';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

// Define your routes and permissions, including wildcards
const routes = [
  { path: '/', perm: ['ROLE_GUEST', 'ROLE_USER'] },
  { path: '/login', perm: ['ROLE_GUEST'] },
  { path: '/register', perm: ['ROLE_GUEST'] },
  { path: '/login-business', perm: ['ROLE_GUEST'] },
  { path: '/register-business', perm: ['ROLE_GUEST'] },
  { path: '/login-admin', perm: ['ROLE_GUEST'] },
  { path: '/about', perm: ['ROLE_GUEST', 'ROLE_USER'] },
  { path: '/business', perm: ['ROLE_GUEST'] },
  { path: '/contact', perm: ['ROLE_GUEST', 'ROLE_USER'] },
  { path: '/payment', perm: ['ROLE_USER'] },
  { path: '/profile', perm: ['ROLE_USER'] },
  { path: '/history', perm: ['ROLE_USER'] },
  { path: '/booking', perm: ['ROLE_USER'] },
  { path: '/security', perm: ['ROLE_USER'] },
  { path: '/shops', perm: ['ROLE_GUEST', 'ROLE_USER'] },
  { path: '/shops/*', perm: ['ROLE_GUEST', 'ROLE_USER'] },
  { path: '/business/profile', perm: ['ROLE_NAILER'] },
  { path: '/business/dashboard', perm: ['ROLE_NAILER'] },
  { path: '/business/chat', perm: ['ROLE_NAILER'] },
  { path: '/business/chat/*', perm: ['ROLE_NAILER'] },
  { path: '/business/services', perm: ['ROLE_NAILER'] },
  { path: '/business/customers', perm: ['ROLE_NAILER'] },
  { path: '/business/subscription', perm: ['ROLE_NAILER'] },
  { path: '/business/payment/*', perm: ['ROLE_NAILER'] },
  { path: '/business/payment', perm: ['ROLE_NAILER'] },
  { path: '/business/booking', perm: ['ROLE_NAILER'] },
  { path: '/admin/account', perm: ['ROLE_SYSTEM'] },
  { path: '/admin/business', perm: ['ROLE_SYSTEM'] },
  { path: '/admin/customer', perm: ['ROLE_SYSTEM'] },
  { path: '/admin/dashboard', perm: ['ROLE_SYSTEM'] },
  { path: '/admin/contact', perm: ['ROLE_SYSTEM'] },
];

// A function to check if the pathname matches a route pattern
const matchRoute = (routePath: string, currentPath: string) => {
  // Convert wildcard route (e.g., /admin/*) to a regular expression
  const regex = new RegExp(`^${routePath.replace('*', '.*')}$`);
  return regex.test(currentPath);
};

const Client = () => {
  const pathname = usePathname();
  const role = getCurrentRole();

  const CheckRole = () => {

    let isPermitted = false;

    routes.forEach((r) => {
      if (matchRoute(r.path, pathname)) {
        if (r.perm.includes(role)) {
          isPermitted = true;
        }
      }
    });

    if (!isPermitted) {
      // Redirect to appropriate dashboard or homepage based on the user's role
      if (role === 'ROLE_NAILER') {
        window.location.replace('/business/profile');
      } else if (role === 'ROLE_SYSTEM') {
        window.location.replace('/admin/dashboard');
      } else {
        window.location.replace('/');
      }
    }
  };

  useEffect(() => {
    CheckRole();
  }, [pathname]); // Re-run CheckRole when the pathname changes

  return <></>;
};

export default Client;
