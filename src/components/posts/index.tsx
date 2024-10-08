import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setPage } from "../../slices/postsSlice";
import { fetchPosts } from "../../actions/posts";
import styles from "./Posts.module.css";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { items, currentPage, totalItems } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, items.length]);

  const handleLoadMore = () => {
    dispatch(setPage(currentPage + 1));
    dispatch(fetchPosts());
  };

  const handleNavigate = (id: string) => {
    navigate(`/posts/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className={styles.postsContainer}>
        {items.length > 0 &&
          items.map((post, index) => {
            const postClass = styles.post;
            const linkClass = index === 0 ? styles.whiteLink : styles.blackLink;

            return (
              <div key={post._id} className={postClass}>
                <img src={post.imageUrl} alt={post.title} />
                <h2>
                  {post.title}
                  <br />
                  <h4
                    onClick={() => handleNavigate(post._id!)}
                    className={linkClass}
                  >
                    Read <span className={styles.arrow}>→</span>
                  </h4>
                </h2>
              </div>
            );
          })}
      </div>
      {items.length < totalItems && (
        <div className={styles.loadMoreContainer}>
          <button onClick={handleLoadMore} className={styles.loadMoreButton}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Posts;
