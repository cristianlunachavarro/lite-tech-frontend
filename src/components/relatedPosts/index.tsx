import { FC, useEffect, useState } from "react";
import { fetchPostsRelated } from "../../actions/posts";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import styles from "./RelatedPosts.module.css";

interface RelatedPostsProps {
  actualPostId: string;
}

const RelatedPosts: FC<RelatedPostsProps> = ({ actualPostId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const relatedPosts = useSelector(
    (state: RootState) => state.posts.relatedItems
  );

  const handleNavigate = (id: string) => {
    navigate(`/posts/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewRelatedPosts = () => {
    const relatedPostsIds = relatedPosts.map((p) => p._id);
    const currentPostsIds = [...relatedPostsIds, actualPostId].join(",");
    dispatch(fetchPostsRelated(currentPostsIds));
  };

  useEffect(() => {
    dispatch(fetchPostsRelated(actualPostId));
  }, [dispatch, actualPostId]);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2>Relates posts</h2>
        <h5 onClick={handleNewRelatedPosts}>
          New post <span className={styles.arrow}>→</span>
        </h5>
      </div>
      <div className={styles.relatedPostsContainer}>
        {relatedPosts.length > 0 &&
          relatedPosts.map((post) => (
            <div key={post._id} className={styles.relatedPost}>
              <img src={post.imageUrl} alt={post.title} />
              <h3>
                {post.title.length > 60
                  ? `${post.title.slice(0, 60)}...`
                  : post.title}
                <br />
                <p onClick={() => handleNavigate(post._id!)}>
                  Read <span className={styles.arrow}>→</span>
                </p>
              </h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
