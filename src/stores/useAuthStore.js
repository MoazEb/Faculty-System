import { create } from 'zustand';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import api from '../../API/axiosInstance';
import { toast } from 'react-hot-toast';

const useAuthStore = create((set, get) => ({
    isAuthenticated: !!Cookies.get('access_token'),
    role: Cookies.get('access_token') ? jwtDecode(Cookies.get('access_token')).role : null,
    fullId: Cookies.get('id') || null,
    isLoading: false,

    login: async (credentials) => {
        set({ isLoading: true });
        try {
            alert(1)
            const res = await api.post('/Authentications', credentials);
            const { token, refreshToken, refreshTokenExpireTime } = res.data;
            alert(2)

            if (!token || !refreshToken) {
                throw new Error('Invalid authentication response');
            }
            alert(3)

            const cookieOptions = {
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                expires: new Date(refreshTokenExpireTime)
            };

            Cookies.set('access_token', token, cookieOptions);
            Cookies.set('refresh_token', refreshToken, cookieOptions);

            const decoded_token = jwtDecode(token);
            const { role, nameid: fullId } = decoded_token;

            Cookies.set('id', fullId, cookieOptions);

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            set({
                isAuthenticated: true,
                role,
                fullId,
                isLoading: false,
            });

            window.location.href = '/';

        } catch (err) {
            const errorMessage = err.response?.data?.detail || 'Authentication failed';
            toast.error(errorMessage);
            console.error('Login error:', err);
            set({ isLoading: false });
        }
    },

    logout: async () => {
        set({ isLoading: true });
        try {
            Cookies.remove('access_token');
            Cookies.remove('refresh_token');
            Cookies.remove('id');

            delete api.defaults.headers.common['Authorization'];

            set({
                isAuthenticated: false,
                role: null,
                fullId: null,
                isLoading: false,
            });
            window.location.href = '/login';
            return true;
        } catch (error) {
            toast.error('Logout failed: ' + (error.response?.data?.detail || error.message || 'An unexpected error occurred.'));
            console.error('Logout error:', error);
            set({ isLoading: false });
        }
    },

    // initializeAuth: () => {
    //     const token = Cookies.get('access_token');
    //     if (token) {
    //         try {
    //             const decoded_token = jwtDecode(token);
    //             const { role, nameid: fullId } = decoded_token;
    //             api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //             set({ isAuthenticated: true, role });
    //         } catch (error) {
    //             console.error("Failed to initialize auth from token:", error);
    //             get().logout();
    //         }
    //     }
    // }
}));

export default useAuthStore;