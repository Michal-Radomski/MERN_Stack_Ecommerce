import React from "react";
import {History} from "history";

const Search = ({history}: {history: History}): JSX.Element => {
  const [keyword, setKeyword] = React.useState<string>("");

  const searchHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          onChange={(event) => setKeyword(event.target.value)}
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
