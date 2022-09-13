import { useState, useEffect } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";
import { ErrorBoundary } from 'react-error-boundary';

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";

import "./Project.scss";

const Project = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [projects, setProjects] = useState([]);
  const [filterProject, setFilterProject] = useState([]);
  

  useEffect(() => {
    const query = '*[_type == "projects"]'

    client.fetch(query)
      .then((data) => {
        setProjects(data);
        setFilterProject(data);
    })
  }, [])

  const handleProjectFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);
    
    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);
      
      
      if (item !== 'All') {
        return setFilterProject(projects.filter((project) => project.tags.includes(item))) }
      else {
        return setFilterProject(projects)}
    }, 500);

  };

  function ErrorFallback({error, resetErrorBoundary}) {
    return (
      <div role="alert">
        <p className="head-text">Something went wrong:</p>
        <pre>{error.message}</pre>
        <button className="error__btn" onClick={resetErrorBoundary}><span className="p-text" style={{fontSize: 20, fontWeight: 'bold'}}>Try again</span></button>
      </div>
    )
  }
  
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
      // reset the state of your app so the error doesn't happen again
    }}
    >
      <>
        <h2 className="head-text">
          <span>Creativity</span> At It's 
          <span> Best</span>
        </h2>

        <div className="app__project-filter">
          {["Portfolio", "React.Js", "JavaScript", "Sass", "ChakraUI", "Tailwind CSS", "Express.js", "MySQL", "MongoDB", "PostgreSQL", "All"].map((item, index) => (
            <div
              key={index}
              onClick={() => handleProjectFilter(item)}
              className={`app__project-filter-item app__flex p-text ${activeFilter === item ? "item-active" : ""}`}
            >
              {item}
            </div>
          ))}
        </div>
        
        <motion.div
          animate={animateCard}
          transition={{ duration: 0.5, delayChildren: 0.5 }}
          className="app__project-portfolio"
        >
          {filterProject.map((project, index) => (
            <div className="app__project-item app__flex" key={index}>
              
              <div className="app__project-img app__flex">
                <img src={urlFor(project.imgUrl)} alt={project.name} />

                <motion.div
                  whileHover={{ opacity: [0, 1] }}
                  transition={{ duration: 0.25, ease: "easeInOut", staggerChildren: 0.5 }}
                  className="app__project-hover app__flex"
                >
                  <a href={project.projectLink}
                    target="_blank" 
                    rel="noreferrer"
                  >
                    <motion.div
                      whileHover={{ scale: [1, 0.9] }}
                      whileInView={{scale:[0, 1]}}
                      transition={{ duration: 0.25 }}
                      className="app__flex"
                    >
                      <AiFillEye />
                    </motion.div>
  
                  </a>

                  <a href={project.codeLink}
                    target="_blank" 
                    rel="noreferrer"
                  >
                    <motion.div
                      whileHover={{ scale: [1, 0.9] }}
                      whileInView={{scale:[0, 1]}}
                      transition={{ duration: 0.25 }}
                      className="app__flex"
                    >
                      <AiFillGithub />
                    </motion.div>
  
                  </a>
                </motion.div>
              </div>

              <div className="app__project-content app__flex">
                <h4 className="bold-text">{ project.title }</h4>
                <p className="p-text" style={{marginTop: 10}}>{ project.description }</p>

                <div className="app__project-tag app__flex">
                  <p className="p-text"> {project.tags[Math.floor(Math.random() * project.tags.length)]} </p>
                </div>

              </div>
            </div>
          ))
          }
          </motion.div>
          
          {/* <motion.div
            transition={{ duration: 0.5, delayChildren: 0.5 }}
          >
            <h2 className="head-text">No item can be found under this search</h2>
            <h3 className="head-text">Try other <span>Filters</span></h3>
            <p className="p-text">Thank you</p>
          </motion.div> */}
      </>
    </ErrorBoundary>
    
    
  )
}

export default AppWrap(
  MotionWrap(Project, "app__projects"),
  "project",
  "app__primarybg"
)
