import { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import MiniLoader from "./MiniLoader";
import LoadMoreButton from "./LoadMoreButton";

function BlogSection() {
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      const res = await axios.get(`/posts?skip=${skip}`);
      setPosts((prevPosts) => [...prevPosts, ...res.data]);
      setHasMore(res.data.length > 0);
      setIsLoading(false);
    };
    getPosts();
  }, [skip]);

  const loadMore = () => {
    setSkip((prevSkip) => prevSkip + 7);
  };

  return (
    <div className="mt-20 blog_section">
      {posts.map((post, idx) => (
        <Post key={post._id} {...post} idx={idx} />
      ))}
      {isLoading && <MiniLoader />}
      {hasMore && !isLoading && <LoadMoreButton onClick={loadMore} />}
    </div>
  );
}

export default BlogSection;
