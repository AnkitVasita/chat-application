import { CircularProgress } from "@material-ui/core";
import React from "react";
import "./Loader.css";
function Loader() {
  return (
    <div class="lds-hourglass">
      <CircularProgress />
    </div>
  );
}

export default Loader;
