import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import {GiHamburgerMenu } from "react-icons/gi";
import {TiDelete} from 'react-icons/ti'
import "./Subreddits.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubReddits } from "../../store/subRedditSlice";
import { setSelectedSubReddit } from "../../store/redditSlice";

const Subreddits = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.subReddit.isLoading);
  const hasError = useSelector((state) => state.subReddit.hasError);
  const subReddits = useSelector((state) => state.subReddit.subReddits);
  const [isVissible, setIsVissible]= useState(false)

  // let media_class='sub-container-remove';
  useEffect(() => {
    dispatch(fetchSubReddits());
  }, [dispatch]);

  const mediaMenuHandler = () => {
    
    setIsVissible(!isVissible)
    // if(!isVissible){
    //   media_class='sub-container'

    // }else media_class='sub-container'
    console.log(isVissible)
  }


  return (
    <div className='sub-section'>
      <p className="sub-title">Subreddits</p>
      <p className="burger-menu" onClick={mediaMenuHandler}>
        {!isVissible && <GiHamburgerMenu/>}
        {isVissible && <TiDelete/>}</p>

      <div className={'sub-container' + (isVissible ? '' : '-remove' )}>
        {isLoading && (
          <TailSpin
            className="tailspin"
            height="50"
            width="50"
            color="#00abb3"
            radius="1"
            visible={true}
            margin="2px"
          />
        )}

        {!isLoading && hasError && <p>Something went wrong</p>}
        {!isLoading && (
          <ul>
            {subReddits.map((sub) => (
              <li
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
