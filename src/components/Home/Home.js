import { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchReddits, fetchSearchReddits } from "../../store/redditSlice";
import Post from "../Post/Post";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(state =>state.reddit.searchTerm)
  const selectedSubReddit = useSelector(state => state.reddit.selectedSubReddit)
  const isLoading = useSelector(state => state.reddit.isLoadding)
  const hasError = useSelector(state => state.reddit.hasError)
  const reddits = useSelector(state => state.reddit.reddits)

  useEffect(() => {
    dispatch(fetchReddits(selectedSubReddit))
  }, [dispatch, selectedSubReddit]);

  useEffect(() => {
    dispatch(fetchSearchReddits(searchTerm))
  }, [dispatch, searchTerm])


 
  return (
    <div className="posts-content">
      <div className="status-content">
      <p className="subreddit-info">{selectedSubReddit}</p>
      {isLoading && (
        <TailSpin
          height="100"
          width="100"
          color="#00abb3"
          radius="1"
          visible={true}
        />
      )}

      {!isLoading && hasError && <p className="error_message">Something went wrong</p>}
      {!isLoading && reddits.length === 0 && <p className='error_message'>Please try again</p>}</div>
      {!isLoading && 
        reddits.map((post) => {
          return (
            <Post
                key={post.id}
                data-testid="test-item"
                author_name={post.author}
                date={post.created_utc}
                post={post.title}
                id={post.id}
                permalink={post.permalink}
                num_comments={post.num_comments}
                image={post.url}
             
          
            />
          );
        })}
    </div>
  );
};

export default Home;
