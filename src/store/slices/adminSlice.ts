import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ServiceRequest, User } from '../../types';
import api from '../../utils/api';

interface AdminState {
  requests: ServiceRequest[];
  users: User[];
  isLoading: boolean;
  error: string | null;
  stats: {
    totalServices: number;
    totalPosts: number;
    totalUsers: number;
    pendingRequests: number;
  };
}

const initialState: AdminState = {
  requests: [],
  users: [],
  isLoading: false,
  error: null,
  stats: {
    totalServices: 0,
    totalPosts: 0,
    totalUsers: 0,
    pendingRequests: 0,
  },
};

export const fetchRequests = createAsyncThunk(
  'admin/fetchRequests',
  async () => {
    const response = await api.get('/requests');
    return response.data;
  }
);

export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async () => {
    const response = await api.get('/users');
    return response.data;
  }
);

export const updateRequestStatus = createAsyncThunk(
  'admin/updateRequestStatus',
  async ({ id, status }: { id: number; status: string }) => {
    const response = await api.patch(`/requests/${id}`, { status });
    return response.data;
  }
);

export const fetchStats = createAsyncThunk(
  'admin/fetchStats',
  async () => {
    const [services, posts, users, requests] = await Promise.all([
      api.get('/services'),
      api.get('/posts'),
      api.get('/users'),
      api.get('/requests'),
    ]);
    
    return {
      totalServices: services.data.length,
      totalPosts: posts.data.length,
      totalUsers: users.data.length,
      pendingRequests: requests.data.filter((r: ServiceRequest) => r.status === 'pending').length,
    };
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.requests = action.payload;
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch requests';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(updateRequestStatus.fulfilled, (state, action) => {
        const index = state.requests.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  },
});

export default adminSlice.reducer;