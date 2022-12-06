import Card from "../../UI/Card";
import Comments from "../comments/Comments";
import "./Post.css";
import moment from "moment";

import { TailSpin } from "react-loader-spinner";
import React, { useState } from "react";

const Post = (props) => {
  const [bringComments, setBringComments] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [loadError, setLoadError] = useState();

  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const response = await fetch(
        `https://www.reddit.com${props.permalink}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }

      const json = await response.json();

      const commentData = json[1].data.children.map((comment) => {
        return {
          id: comment.data.id,
          comment: comment.data.body,
          author: comment.data.author,
          date: comment.data.created_utc,
        };
      });

      setCommentsList(commentData);
      setLoadingComments(false);
    } catch (error) {
      setLoadingComments(false);
      setLoadError(error.message);
    }
  };

  const bringCommentsHandler = () => {
    if (bringComments) {
      setBringComments(false);
      setLoadError(null);
    } else {
      fetchComments();
      setBringComments(true);
    }
  };

  return (
    <Card>
      <article className="post-container">
        <div className="info-container">
          <div className="author-info">
            <img
              className="avatar"
              alt="avatar"
              src="https://www.redditinc.com/assets/images/site/reddit-logo.png"
            />
            <p className="author-name">{props.author_name}</p>
          </div>
          <p className="time-info">{moment.unix(props.date).fromNow()}</p>
        </div>
        <div className="reddit-container">
          {props.image !== null && (
            <img className="post_image" src={props.image} alt="" />
          )}
          {props.post_hint}
          <p>{props.post}</p>

          <button className="btn-comment" onClick={bringCommentsHandler}>
            {bringComments ? "Hide" : "Show"} Comments |{" "}
            <span>{props.num_comments}</span>
          </button>
          {loadingComments && (
            <TailSpin
              height="80"
              width="80"
              color="#00abb3"
              radius="1"
              visible={true}
            />
          )}
          {!loadingComments && <p>{loadError}</p>}
          {!loadingComments &&
            bringComments &&
            !loadError &&
            commentsList.map((comment) => {
              return (
                <Comments
                  key={comment.id}
                  author={comment.author}
                  date={comment.date}
                  comment={comment.comment}
                />
              );
            })}
        </div>
      </article>
    </Card>
  );
};

export default Post;
