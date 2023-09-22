import React from "react";
import Clock from "./Clock";

const Header = () => {
  return(
    <div className="Header">
      <Clock/>
    </div>
  )
}

export default React.memo(Header);