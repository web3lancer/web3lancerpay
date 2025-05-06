import React, { useState } from "react";

// create the sidebar component

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button onClick={toggleSidebar}>
        {isOpen ? "Close" : "Open"} Sidebar
      </button>
      <div className="sidebar-content">
        {/* Add your sidebar content here */}
        // we need five sidebar items (home, transfer, p2p, swap, settings) each linking using next linking
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/transfer">Transfer</a>
          </li>
          <li>
            <a href="/p2p">P2P</a>
          </li>
          <li>
            <a href="/swap">Swap</a>
          </li>
          <li>
            <a href="/settings">Settings</a>
          </li>
        </ul>
        {/* Add your sidebar content here */}
        <div className="sidebar-footer">
            <p>© {new Date().getFullYear()} web3lancer</p>
            <p>All rights reserved</p>
            <p>Privacy Policy</p>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
