import "./Navbar.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiX } from "react-icons/hi";
import { motion } from "framer-motion";

import { images } from "../../constants";
import { useState } from 'react';

const Navbar = () => {
  const [toggle, setToggle] = useState(false)
  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src= { images.logo3 } alt="my_logo" />
      </div>

      <div />

      <ul className="app__navbar-links">
        {["home", "about", "project", "skills", "contact me"].map((items) => (
          <li className="app__flex p-text" key={`link-${items}`}>
            <div />
            <a href={`#${items}`}>{ items }</a>
          </li>
        ))}
      </ul>

      <div className="app__navbar-menu">
        <GiHamburgerMenu onClick={() => setToggle(true)} />

        {toggle && 
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: "easeOut" }} >
            
            <HiX onClick={() => setToggle(false)} />
            
            <ul>
              {["home", "about", "project", "skills", "contact me"].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} onClick={() => setToggle(false)}>{ item }</a>
                </li>
              ))}
            </ul>
          </motion.div>
        }
      </div>
    </nav>
  )
}

export default Navbar