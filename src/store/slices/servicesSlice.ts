import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Service } from '../../types';
import api from '../../utils/api';

interface ServicesState {
  services: Service[];
  currentService: Service | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    category: string;
    search: string;
  };
  pagination: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
  };
}

const initialState: ServicesState = {
  services: [],
  currentService: null,
  isLoading: false,
  error: null,
  filters: {
    category: 'all',
    search: '',
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 6,
  },
};

export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async () => {
    const response = await api.get('/services');
    return response.data;
  }
);

export const fetchServiceById = createAsyncThunk(
  'services/fetchServiceById',
  async (id: number) => {
    const response = await api.get(`/services/${id}`);
    return response.data;
  }
);

export const createService = createAsyncThunk(
  'services/createService',
  async (serviceData: Omit<Service, 'id' | 'createdAt'>) => {
    const response = await api.post('/services', {
      ...serviceData,
      createdAt: new Date().toISOString(),
    });
    return response.data;
  }
);

export const updateService = createAsyncThunk(
  'services/updateService',
  async ({ id, ...serviceData }: Partial<Service> & { id: number }) => {
    const response = await api.put(`/services/${id}`, serviceData);
    return response.data;
  }
);

export const deleteService = createAsyncThunk(
  'services/deleteService',
  async (id: number) => {
    await api.delete(`/services/${id}`);
    return id;
  }
);

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    clearCurrentService: (state) => {
      state.currentService = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch services';
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.currentService = action.payload;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.services.push(action.payload);
      })
      .addCase(updateService.fulfilled, (state, action) => {
        const index = state.services.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.services[index] = action.payload;
        }
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.services = state.services.filter(s => s.id !== action.payload);
      });
  },
});

export const { setFilters, setCurrentPage, clearCurrentService } = servicesSlice.actions;
export default servicesSlice.reducer;