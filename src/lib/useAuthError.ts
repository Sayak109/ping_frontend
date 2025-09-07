// import { useRouter, usePathname } from 'next/navigation';
// import { useAuth } from '../context/AuthContext';

// export const useAuthError = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { handleAuthError } = useAuth();

//   const handleError = (error: any) => {
//     const status = error.response?.status;

//     // Handle authentication errors (401, 402)
//     if (status === 401 || status === 402) {
//       // Only redirect if not already on sign-in page to prevent loops
//       if (pathname !== '/sign-in' && pathname !== '/signin') {
//         console.log('Authentication error detected, redirecting to sign-in page');
//         router.push('/sign-in');
//       }
//     }

//     // You can add more error handling here
//     return error;
//   };

//   return { handleError };
// };
