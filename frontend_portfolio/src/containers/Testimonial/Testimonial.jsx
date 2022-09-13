import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import {ErrorBoundary} from 'react-error-boundary'
// import { useErrorHandler } from "react-error-boundary";


import { urlFor, client } from "../../client";
import { AppWrap, MotionWrap } from '../../wrapper';


import "./Testimonial.scss";

const Testimonial = () => {
  const [brands, setBrands] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState([0]);
  // const { testimonials, error } = useTestimonials([])
  // useErrorHandler(error)

  function ErrorFallback({error, resetErrorBoundary}) {
    return (
      <div role="alert">
        <p className="head-text">Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}><span className="p-text" style={{fontSize: 20, fontWeight: 'bold'}}>Try again</span></button>
      </div>
    )
  }

  const handleClick = (index) => {
    Number(index);
    // setTestimonials(index);
    setCurrentIndex(index);
  }

  useEffect(() => {
    const brandsQuery = '*[_type == "brands"]';
    const query = '*[_type == "testimonials"]';

    client.fetch(query)
      .then((data) => {
        setTestimonials(data);
      });
    
    client.fetch(brandsQuery)
      .then((data) => {
        setBrands(data);
    })
  }, []);

  // const test = testimonials[currentIndex];

  return (
    <ErrorBoundary
    FallbackComponent={ErrorFallback}
      onReset={(index) => {
        setTestimonials([0]);
        setBrands([...index]);
      // reset the state of your app so the error doesn't happen again
    }}
  >
    <>
      {testimonials.length && (
        <>
          <div className="app__testimonial-item app__flex">
            <img src={urlFor(testimonials[currentIndex]?.imgurl).url().toString()} alt="testimonial" />

            <div className="app__testimonial-content">
              <p className="p-text">{testimonials[currentIndex]?.feedback}</p>
              <div>  
                <h4 className="bold-text">{ testimonials[currentIndex]?.name }</h4>
                <h5 className="p-text">{ testimonials[currentIndex]?.company }</h5>
              </div>
            </div>
          </div>

          <div className="app__testimonial-btns app__flex">
            <div className="app__flex" onClick={() => handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}>
            <HiChevronLeft />
            </div>

            <div className="app__flex" onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}>
            <HiChevronRight />
            </div>
          </div>
        </>
      )}
      <div className="app__testimonial-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: 'tween' }}
            key={brand._id}
          >
            <img src={urlFor(brand.imgUrl)} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  </ErrorBoundary>  
  )
}

export default AppWrap(
  MotionWrap(Testimonial, "app__testimonial"),
  "testimonial",
  "app__primarybg"
)
