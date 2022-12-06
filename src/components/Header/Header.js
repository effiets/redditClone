import "./Header.css";
import { FaReddit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchReddits} from "../../store/redditSlice";
import { useState } from "react";
import { useEffect } from "react";

const Header = (props) => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.reddit.searchTerm);

  const [searchTermLocal, setSearchTermLocal] = useState('');

  const onChangeSerchTermHandler = (e) =>{
    setSearchTermLocal(e.target.value);
  }
  


  useEffect(()=> {
    setSearchTermLocal(searchTerm)
  },[searchTerm])

  const onSubmitHandler = (e) => {
    setSearchTermLocal('')
   
    e.preventDefault();
    dispatch(fetchSearchReddits(searchTermLocal));
  };




  return (
    <header>
      <div className="logo">
        <FaReddit className="logo-icon" />
        <p>
          Reddit<span>Clone</span>
        </p>
      </div>
      <form className="search" onSubmit={onSubmitHandler}>
        <input
          className="search-input"
          type="text"
          value={searchTermLocal}
          placeholder="Search Reddit"
          onChange={onChangeSerchTermHandler}
        />
      </form>
      <div className="burger-menu" onClick={() =>props.setVisibility()}>
        <span class='bar'></span>
        <span class='bar'></span>
        <span class='bar'></span>
      </div>

    </header>
  );
};

export default Header;
