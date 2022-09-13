import { useState } from "react";
import { ErrorBoundary } from 'react-error-boundary';

import { AppWrap, MotionWrap } from './../../wrapper';
import { images } from "../../constants";
import { client } from "../../client";

import "./Footer.scss";

const Footer = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { name, phone, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setIsLoading(true);

    const contact = {
      _type: 'contact',
      name: name,
      phone: phone,
      email: email,
      message: message,
    }

    client.create(contact)
      .then(() => {
        setIsLoading(false);
        setIsFormSubmitted(true);
        setTimeout(() => {
          setIsFormSubmitted(false);
          setFormData({name: "", phone: "", email: "", message: ""} )
        }, 5000);
      })
    
  }

  function ErrorFallback({error, resetErrorBoundary}) {
    return (
      <div role="alert">
        <p className="head-text">Something went wrong:</p>
        <pre>{error.message}</pre>
        <button className="error___" onClick={resetErrorBoundary}><span className="p-text" style={{fontSize: 20, fontWeight: 'bold'}}>Try again</span></button>
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
        <h2 className="head-text">I'm at Your Service. Please, do not Hesitate to Chat With Me</h2>

        <div className="app__footer-cards">
          <div className="app__footer-card">
            <img src={images.email} alt="email" />
            <a href="mailto:garbakolameen@gmail.com" className="p-text">garbakolameen@gmail.com</a>
          </div>

          <div className="app__footer-card">
            <img src={images.mobile} alt="mobile" />
            <a href="tel:+2348161665061" className="p-text">+2348161665061</a>
          </div>
        </div>
      {!isFormSubmitted ?
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input className="p-text" type="text" placeholder="Your Full Name" name="name" value={name} required={true} onChange={ handleChangeInput } />
            </div>
            
          <div className="app__flex">
            <input className="p-text" type="tel" placeholder="Your Phone Number" name="phone" value={phone} onChange={ handleChangeInput } />
          </div>

          <div className="app__flex">
            <input className="p-text" type="email" placeholder="Your Email" name="email" value={email} required={true} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={ handleChangeInput } />
          </div>

          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>

          <div>
            <button className="p-text" type="button" onClick={handleSubmit}>{isLoading ? "Sending..." : "Send Message"}</button>
          </div>
        </div>
          :
          <div>
            <h3 className="head-text">Thank you for getting across to us 🙏</h3>
          </div>
      }
    </>
  </ErrorBoundary>
  )
}

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact me", "app__whitebg"
)
