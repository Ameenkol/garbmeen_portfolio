import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import ReactTooltip from 'react-tooltip';
import { ErrorBoundary } from 'react-error-boundary';

import { AppWrap, MotionWrap } from './../../wrapper';
import { urlFor, client } from "../../client";

import "./Skills.scss";

const Skills = () => {
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const skillsQuery = '*[_type == "skills"]'
    const query = '*[_type == "experiences"]'

    client.fetch(query)
      .then((data) => {
        setExperience(data);
      });
    
    client.fetch(skillsQuery)
      .then((data) => {
        setSkills(data);
    })
  }, []);

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
        <h2 className="head-text"> Skills & Experience</h2>

        <div className="app__skills-container">
          <motion.div className="app__skills-list">
            {skills.map((skill) => (
              <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5 }}
                className="app__skills-item app__flex"
                key={`${skill.name}${skill._id}`}
              >
                <div className="app__flex" style={{ backgroundColor: skill.backgroundColor }}>
                  <img src={urlFor(skill.icon).url()} alt={skill.name} />
                </div>

                <p className="p-text">{ skill.name }</p>

              </motion.div>

            ))}
          </motion.div>

          <motion.div className="app__skills-exp">
            {experience.map((experience) => (
              <motion.div
                className="app__skills-exp-item"
                key={`${experience._id}` + experience.name + experience.year.toString()}
              >
                <div className="app__skills-exp-year">
                  <p className="bold-text">{experience.year}</p>
                </div>
                <motion.div className="app__skills-exp-projects">
                  {experience.projects.map((project) => (
                    <>
                      <motion.div
                        whileInView={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5 }}
                        className="app__skills-exp-project"
                        data-tip
                        data-for={project.name}
                        key={project.name + `${project._id}`}
                      >
                        <h4 className="bold-text">{project.name}</h4>
                        <p className="p-text">{project.company}</p>
                      </motion.div>

                      <ReactTooltip
                        id={project.name}
                        effect="solid"
                        arrowColor="#fff"
                        className="skills-tooltip"
                      >
                        {project.description}
                      </ReactTooltip>
                    </>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </>
    </ErrorBoundary>
  )
}

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
)
