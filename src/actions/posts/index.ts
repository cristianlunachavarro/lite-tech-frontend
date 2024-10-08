import axiosInstance from "../axiosInstance";
import { Dispatch } from "redux";

import { Post } from "../../interfaces";
import { RootState } from "../../store";

import {
  createPostSuccess,
  createPostFail,
  setLoading,
  fetchPostsFail,
  fetchPostsSuccess,
  fetchPostFail,
  fetchPostSuccess,
  fetchRelatedPostFail,
  fetchRelatedPostSuccess,
} from "../../slices/postsSlice";

export const fetchPosts = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { currentPage, itemsPerPage } = getState().posts;
    dispatch(setLoading(true));
    try {
      const { data } = await axiosInstance.get(
        `/posts/?page=${currentPage}&limit=${itemsPerPage}`
      );
      if (data.error) {
        dispatch(fetchPostsFail(data.error));
      } else {
        dispatch(fetchPostsSuccess(data.data));
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(fetchPostsFail(error));
      console.error("Error fetching posts:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const fetchPostById = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axiosInstance.get(`/posts/${id}`);
      if (data.error) {
        dispatch(fetchPostFail(data.error));
      } else {
        dispatch(fetchPostSuccess(data.data));
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(fetchPostFail(error));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const fetchPostsRelated = (currentPostsIds: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axiosInstance.get(
        `/posts/related?excludeId=${currentPostsIds}`
      );
      if (data.error) {
        dispatch(fetchRelatedPostFail(data.error));
      } else {
        dispatch(fetchRelatedPostSuccess(data.data));
      }
      dispatch(setLoading(false));
    } catch (error) {
      fetchRelatedPostFail(error);
      console.error("Error fetching related posts:", error);
      dispatch(setLoading(false));
    }
  };
};

export const createPostRelated = (
  { title, article, imageUrl }: Post,
  setPostSuccess: (value: boolean) => void
) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axiosInstance.post("/posts/related", {
        title,
        imageUrl,
        article,
      });
      if (data.error) {
        dispatch(createPostFail(data.error));
      } else {
        dispatch(createPostSuccess(data.data));
        setPostSuccess(true);
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(createPostFail(error)); //check this
      console.error("Error creating a post:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const uploadImage = async (
  file: File
  // onUploadProgress: (progress: number) => void
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const { data } = await axiosInstance.post("/posts/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      // onUploadProgress: (progressEvent) => {
      //   const total = progressEvent.total || 0;
      //   const current = progressEvent.loaded;

      //   if (total > 0) {
      //     const progress = (current / total) * 100;

      //     // Simular un delay de 100 ms antes de actualizar el progreso
      //     setTimeout(() => {
      //       console.log(`Upload Progress: ${progress}`);
      //       onUploadProgress(progress);
      //     }, 1000); // Ajusta el tiempo según sea necesario
      //   }
      // },
    });
    return data.data.imageUrl;
  } catch (error) {
    console.error("Error uploading image", error);
    return ""; // Ajusta según la respuesta de error que desees
  }
};
