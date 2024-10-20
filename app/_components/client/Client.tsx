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
  { path: '/shops', perm: ['ROLE_GUEST', 'ROLE_USER'] },
  { path: '/shops/*', perm: ['ROLE_GUEST', 'ROLE_USER'] },
  { path: '/business/profile', perm: ['ROLE_NAILER'] },
  { path: '/business/dashboard', perm: ['ROLE_NAILER'] },
  { path: '/business/chat', perm: ['ROLE_NAILER'] },
  { path: '/business/services', perm: ['ROLE_NAILER'] },
  { path: '/business/customers', perm: ['ROLE_NAILER'] },
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
    console.log(role);
    console.log(pathname);

    let isPermitted = false;

    routes.forEach((r) => {
      // Match current path with the route, including wildcard support
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
      } else if (role === 'ROLE_ADMIN') {
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
