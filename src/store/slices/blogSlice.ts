import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BlogPost } from '../../types';
import api from '../../utils/api';

interface BlogState {
  posts: BlogPost[];
  currentPost: BlogPost | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  posts: [],
  currentPost: null,
  isLoading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk(
  'blog/fetchPosts',
  async () => {
    const response = await api.get('/posts');
    return response.data;
  }
);

export const fetchPostById = createAsyncThunk(
  'blog/fetchPostById',
  async (id: number) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  }
);

export const createPost = createAsyncThunk(
  'blog/createPost',
  async (postData: Omit<BlogPost, 'id' | 'publishedAt'>) => {
    const response = await api.post('/posts', {
      ...postData,
      publishedAt: new Date().toISOString(),
    });
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  'blog/updatePost',
  async ({ id, ...postData }: Partial<BlogPost> & { id: number }) => {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  'blog/deletePost',
  async (id: number) => {
    await api.delete(`/posts/${id}`);
    return id;
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.currentPost = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(p => p.id !== action.payload);
      });
  },
});

export const { clearCurrentPost } = blogSlice.actions;
export default blogSlice.reducer;