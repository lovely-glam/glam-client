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

let username = null;
let role = null;
let tokenType = null;

var user = decodedToken.user;
if (user !== undefined) {
  username = user.username;
  role = user.role;
  tokenType = user.tokenType;
}

export const getCurrentUsername = () => {
  return username;
};

export const getCurrentRole = () => {
  if (role === undefined || role === null || role === '') {
    return 'ROLE_GUEST';
  } else {
    return role;
  }
};
