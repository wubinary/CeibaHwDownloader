import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import * as fs from 'fs';

const App = () => {

  return (
    <div className="App" style={{minWidth: "300px", textAlign: "left", padding: "5px"}}>
      <h1 style={{textAlign: "center", color: "#82C400"}} > Ceiba HW Downloader </h1>
      <hr/>

      {/*<!-- Features -->*/}
      <h3>Features</h3>
      <ul>
          <li>Download All HW in one-click. </li>
          <li>Option select with e.g.(OnTime, Delayed). </li>
          <li>Produce HW Meta csv.</li>
      </ul>
      
      {/*<!-- about -->*/}
      <h3>About</h3>
      <ul>
          <li>OpenSource: <strong><a href="https://github.com/wubinary/CeibaHwDownloader" target="_blank">[Github]</a></strong> </li>
          <li>Version: 1.1.0 </li>
      </ul>
      <hr/>

    </div>
  );
};

export default App;
