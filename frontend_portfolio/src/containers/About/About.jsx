import "./About.scss";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ErrorBoundary } from 'react-error-boundary';

import { urlFor, client } from "../../client.js"
import { AppWrap, MotionWrap } from "../../wrapper/index.js";

const About = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const aboutQuery = '*[_type == "abouts"]';

    client.fetch(aboutQuery)
      .then((data) => setAbouts(data))
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
        <h2 className="head-text">
          <span>Good Thinking</span> = 
          <span> Good Design</span>
        </h2>
        <h2 className="head-text">
          <span>Good Design</span> =
          <span> Good Product</span>
        </h2>

        <div className="app__profiles">
          {abouts.map((about, index) => (
            <motion.div
              whileInView={{opacity : 1}}
              whileHover={{ scale: 1.3 }}
              transition={{ duration: 0.5, type: "tween" }}
              className="app__profiles-item"
              key={about.title + index}>

              <img src={urlFor(about.imgUrl)} alt={about.title} />

              <h2 className="bold-text" style={{ marginTop: 20 }}>{ about.title }</h2>
              
              <p className="p-text" style={{ marginTop: 10 }}>{ about.description}</p>
            </motion.div>
          ))}
        </div>
      </>
    </ErrorBoundary>

  )
}

export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
)
