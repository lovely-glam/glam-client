export type ApplicationConfig = {
    AUTH_API: string;
    PAYMENT_API: string;
    PORT: number // Use for vite server only
}

const Config: ApplicationConfig = {
   AUTH_API: '',
   PAYMENT_API: '',
   PORT: 3000
}

export default Config;