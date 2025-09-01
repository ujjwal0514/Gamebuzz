import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { type Post } from "./components/api"; // adjust path

// ✅ Fetch all posts
export const fetchPosts = createAsyncThunk<Post[]>(
  "posts/fetchPosts",
  async () => {
    const res = await fetch("http://localhost:5000/posts");
    if (!res.ok) throw new Error("Failed to fetch posts");
    return await res.json();
  }
);

// ✅ Add a new post
export const addPost = createAsyncThunk<Post, Post>(
  "posts/addPost",
  async (newPost) => {
    const res = await fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });
    if (!res.ok) throw new Error("Failed to add post");
    return await res.json();
  }
);

// ✅ Update a post
export const updatePost = createAsyncThunk<Post, { id: number; updated: Post }>(
  "posts/updatePost",
  async ({ id, updated }) => {
    const res = await fetch(`http://localhost:5000/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if (!res.ok) throw new Error("Failed to update post");
    return await res.json();
  }
);

// ✅ Delete a post
export const deletePost = createAsyncThunk<number, number>(
  "posts/deletePost",
  async (id) => {
    const res = await fetch(`http://localhost:5000/posts/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete post");
    return id;
  }
);

interface PostsState {
  posts: Post[];
  filteredPosts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  filteredPosts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
      state.filteredPosts = action.payload; // duplicate copy
    },
    filterPosts: (state, action: PayloadAction<string>) => {
      const query = action.payload.toLowerCase();
      if (!query) {
        state.filteredPosts = state.posts;
      } else {
        state.filteredPosts = state.posts.filter((post) =>
          post.name.toLowerCase().includes(query)
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.filteredPosts = action.payload; // keep duplicate in sync
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      })

      // ✅ Add
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
        state.filteredPosts.unshift(action.payload); // update duplicate
      })

      // ✅ Update
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        const fIndex = state.filteredPosts.findIndex((p) => p.id === action.payload.id);
        if (fIndex !== -1) {
          state.filteredPosts[fIndex] = action.payload;
        }
      })

      // ✅ Delete
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p.id !== action.payload);
        state.filteredPosts = state.filteredPosts.filter((p) => p.id !== action.payload);
      });
  },
});

export const { setPosts, filterPosts } = postSlice.actions;
export default postSlice.reducer;
