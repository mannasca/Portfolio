import React from 'react';
import { Link } from 'react-router-dom';
export default function Layout() {
return (
<>
{/* Center aligned image */}
      <div style={{ textAlign: "center" }}>
        <img src="./images/img4.png" alt="logo" height="150" width="200" />
      </div>
<h1 style={{ textAlign: "center" }}>My Portfolio</h1>

      <nav style={{ textAlign: "center" }}>
        <Link to="/">Home</Link> &nbsp;| &nbsp;
        <Link to="/about">About</Link> &nbsp;| &nbsp;
        <Link to="/project">Project</Link> &nbsp;| &nbsp;
        <Link to="/services">Services</Link> &nbsp;| &nbsp;
        <Link to="/contact">Contact</Link>
      </nav>

      <br />
      <hr />
    </>
  );
}