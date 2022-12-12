import React, { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";

import "./Subreddits.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubReddits } from "../../store/subRedditSlice";
import { setSelectedSubReddit } from "../../store/redditSlice";

const Subreddits = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.subReddit.isLoading);
  const hasError = useSelector((state) => state.subReddit.hasError);
  const subReddits = useSelector((state) => state.subReddit.subReddits);

  useEffect(() => {
    dispatch(fetchSubReddits());
  }, [dispatch]);

  return (
    <div className="sub-section">
      <p className="sub-title">Subreddits</p>

      <div className="sub-container">
        {isLoading && (
          <TailSpin
            className="tailspin"
            height="50"
            width="50"
            color="#00abb3"
            radius="4"
            visible={true}
          />
        )}

        {!isLoading && hasError && (
          <p className="error-message">Something went wrong</p>
        )}
        {!isLoading && (
          <ul>
            {subReddits.map((sub) => (
              <li
                role="list"
                className="subreddit"
                key={sub.id}
                onClick={() => dispatch(setSelectedSubReddit(sub.url))}
              >
                <img
                  className="sub-icon"
                  alt="subicon"
                  src={
                    sub.banner_img === ""
                      ? "https://www.redditinc.com/assets/images/site/reddit-logo.png"
                      : sub.banner_img
                  }
                />
                {sub.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Subreddits;
