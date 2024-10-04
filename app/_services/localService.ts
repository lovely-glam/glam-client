import { jwtDecode } from 'jwt-decode';

var token: string | null = '';
var decodedToken: { user: any } = {
  user: undefined,
};

if (typeof window !== 'undefined') {
  token = localStorage?.getItem('accessToken');

  if (token !== null && token !== undefined)
    decodedToken = jwtDecode(token as any);
}

var user = decodedToken.user;

const username = user.username;
const role = user.role;
const tokenType = user.tokenType;

export const getCurrentUsername = () => {
  return username;
};

export const getCurrentRole = () => {
  return role;
};
