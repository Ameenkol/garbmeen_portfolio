import { motion } from "framer-motion";
import { ErrorBoundary } from 'react-error-boundary';

import { images } from "../../constants";
import { AppWrap, MotionWrap } from './../../wrapper/index.js';
import "./Header.scss";

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: "easeInOut"
    }
  }
}
const Header = () => {
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
      <div className="app__header app__flex">
        <motion.div
          whileInView={{ x: [-100, 0], opacity: [0, 1] }}
          transition={{ duration: 0.8 }}
          className="app__header-info">

          <div className="app__header-badge">
            <div className="badge-cmp app__flex">
              <span>👋</span>
              <div style={{marginLeft: 20}}>
                <p className="p-text"> Hello, I am</p>
                <h1 className="head-text">Ameen</h1>
              </div>
            </div>

            <div className="tag-cmp app__flex">
              <p className="p-text">Front End Developer</p>
            </div>

            <div className="tag-cmp app__flex">
              <p className="p-text">Back End Developer</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 0.5, delayChildren: 0.5 }}
          className="app__header-img">

          <motion.img
            whileInView={{ opacity: [0, 1] }}
            whileHover={{ scale: [1, 1.5], y: [0, 100] }}
            transition={{duration: 0.8, ease: "easeIn"}}
            src={images.profile}
            alt="profile_bg"
          />

          {/* <img src={images.profile} alt="profile_bg" /> */}

          <motion.img
            whileInView={{ scale: [0, 1] }}
            transition={{ duration: 1, ease: "easeInOut" }}
            src={images.circle}
            alt="profile_circle"
            className="overlay_circle" />
        
        </motion.div>

        <motion.div
          variants={scaleVariants}
          whileInView= {scaleVariants.whileInView}
          className="app__header-circles">

          {[images.javascript, images.react, images.node, images.sass].map((circle, index) => (
            <div className="circle-cmp app__flex" key={`circle-${index}`}>
              <img src={ circle } alt="circle" />
            </div>
          ))}
        </motion.div>
      </div>
    </ErrorBoundary>
  )

}

export default AppWrap(
  MotionWrap(Header, "app__header"),
  "home",
  "app__primarybg"
)
