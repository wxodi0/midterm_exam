import React from "react";

const Header = () => {
  return(
    <div className="Header">
      <h3>오늘은</h3>
      <h1>{new Date().toString()}</h1>
    </div>
  )
}

export default React.memo(Header);