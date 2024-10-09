import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Posts from "./components/posts";
import Post from "./components/post";
import Header from "./components/header";
import Loader from "./components/loader";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { useEffect } from "react";
import Footer from "./components/footer";

const App = () => {
  const isLoading = useSelector((state: RootState) => state.posts.loading);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/posts/") {
      document.body.style.backgroundColor = "var(--black-color)";
    } else {
      document.body.style.backgroundColor = "var(--white-color)";
    }
  }, [location]);

  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/posts/" replace />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<Post />} />
        </Routes>
      </div>
      <Footer />
      {isLoading && <Loader />}
    </div>
  );
};

export default App;
