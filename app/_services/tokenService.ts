"use server"
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    iss?: string;
    sub?: string;
    aud?: string[] | string;
    exp?: number;
    nbf?: number;
    iat?: number;
    jti?: string;
    user?: {
        username: string; 
        role: string;
        tokenType: string;
    };
}

  export const checkUserRole = async (token: string | undefined | null): Promise<{role: string} > => {
    if (!token) {
      return { role: 'ROLE_GUEST' };
    }
    try {
      // Decode the token
      const decoded = jwtDecode<JwtPayload>(token);
      const { role } = decoded.user || { role: 'ROLE_GUEST' };
      return {role};
    } catch (error) {
      console.error('Error decoding token:', error);
      return { role: 'ROLE_GUEST' };
    }
  }