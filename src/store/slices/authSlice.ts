import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User, AuthState } from '../../types';
import api from '../../utils/api';

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    const response = await api.get('/users');
    const user = response.data.find(
      (u: User & { password: string }) => 
        u.email === credentials.email && u.password === credentials.password
    );
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const token = btoa(JSON.stringify({ id: user.id, email: user.email }));
    localStorage.setItem('token', token);
    
    return { user: { ...user, password: undefined }, token };
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: { name: string; email: string; password: string; role: string }) => {
    const response = await api.post('/users', {
      ...userData,
      avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1`,
      createdAt: new Date().toISOString(),
    });
    
    const token = btoa(JSON.stringify({ id: response.data.id, email: response.data.email }));
    localStorage.setItem('token', token);
    
    return { user: response.data, token };
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateProfile',
  async (userData: { id: number; name: string; email: string }) => {
    const response = await api.patch(`/users/${userData.id}`, {
      name: userData.name,
      email: userData.email,
    });
    
    // Update token with new email if it changed
    const token = btoa(JSON.stringify({ id: response.data.id, email: response.data.email }));
    localStorage.setItem('token', token);
    
    return { user: response.data, token };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Registration failed';
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Profile update failed';
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;