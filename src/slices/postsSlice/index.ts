import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../interfaces"; // Importa tu interfaz Post

interface PostsInitialState {
  item: Post | {};
  items: Post[];
  relatedItems: Post[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

const initialState: PostsInitialState = {
  item: {},
  items: [],
  relatedItems: [],
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 4,
  totalItems: 0,
};
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    fetchPostsSuccess: (
      state,
      action: PayloadAction<{ posts: Post[]; totalItems: number }>
    ) => {
      state.items = [...state.items, ...action.payload.posts];
      state.totalItems = action.payload.totalItems;
    },
    fetchPostsFail(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
    fetchPostSuccess(state, action) {
      return {
        ...state,
        item: action.payload,
      };
    },
    fetchPostFail(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
    fetchRelatedPostSuccess(state, action) {
      return {
        ...state,
        relatedItems: action.payload,
      };
    },
    fetchRelatedPostFail(state, action) {
      return {
        ...state,
        error: action.payload.posts,
      };
    },
    createPostSuccess(state, action) {
      return {
        ...state,
        items: action.payload.posts,
      };
    },
    createPostFail(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    setItemsPerPage(state, action) {
      state.itemsPerPage = action.payload;
    },
  },
});

export const {
  fetchPostSuccess,
  fetchPostFail,
  fetchRelatedPostSuccess,
  fetchRelatedPostFail,
  fetchPostsSuccess,
  fetchPostsFail,
  createPostSuccess,
  createPostFail,
  setLoading,
  setPage,
  setItemsPerPage,
} = postsSlice.actions;
export default postsSlice.reducer;
