import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchPostById } from "../../actions/posts";
import { AppDispatch, RootState } from "../../store";
import { Post as PostType } from "../../interfaces";
import styles from "./Post.module.css";
import RelatedPosts from "../relatedPosts";

const isPost = (post: any): post is PostType => {
  return post && typeof post === "object" && "_id" in post;
};

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const post = useSelector((state: RootState) => state.posts.item);

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id));
    }
  }, [id, dispatch]);

  return isPost(post) ? (
    <div className={styles.postContainer}>
      <div className={styles.imageContainer}>
        <img src={post.imageUrl} alt={post.title} />
        <h2 className={styles.title}>{post.title}</h2>
      </div>
      <p style={{ whiteSpace: 'pre-wrap', marginTop: '20px' }}>{post.article}</p>
      {post?._id && <RelatedPosts actualPostId={post._id} />}
    </div>
  ) : null;
};

export default Post;
