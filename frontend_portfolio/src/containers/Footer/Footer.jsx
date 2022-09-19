import { ErrorBoundary } from 'react-error-boundary';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { AppWrap, MotionWrap } from './../../wrapper';
import { images } from "../../constants";
import { client } from "../../client";

import "./Footer.scss";

const Footer = () => {

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

      <Formik
        initialValues={{ name: '', phone: '', email: '', message: '' }}
       validate={values => {
         const errors = {};

        if (!values.name) {
          errors.name = 'Required';
        } else if (values.name.length > 30) {
          errors.name = 'Must be 30 characters or less';
         }

        if (!values.phone) {
          errors.phone = 'Required';
        } else if (values.phone.length > 18) {
          errors.phone = 'Must be 18 characters or less';
        } else if (!/[0-9+]/.test(values.phone)) {
          errors.phone = "Phone number must be in Number or International Format"
         }
         
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }

        if (!values.message) {
          errors.message = 'Required';
        } else if (values.message.length > 200) {
          errors.message = 'Must be 200 characters or less, use Email instead';
         }

         return errors;
       }}
        onSubmit={(values, { setSubmitting }) => {
         const contact = {
          _type: 'contact',
          name: values.name,
          phone: values.phone,
          email: values.email,
          message: values.message,
          }

          client.create(contact)
            .then(async () => {
              setTimeout(() => {

              });
                setSubmitting(false);
              }, 400);
       }}
      >
       {({ isSubmitting }) => (
            <Form className="app__footer-form app__flex">
              <div className="app__flex">
                <Field className="p-text" type="text" name="name" placeholder="Full Name" />
                <ErrorMessage name="name" component="div" />
              </div>
              
              <div className="app__flex">
                <Field className="p-text" type="tel" name="phone" placeholder="Phone Number" />
                <ErrorMessage name="phone" component="div" />
              </div>
              
              <div className="app__flex">
                <Field className="p-text" type="email" name="email" placeholder="Email Address" />
                <ErrorMessage name="email" component="div" />
              </div>
              
              <div className="app__flex">
                <Field className="text-area p-text" type="text" name="message" placeholder="Subject And Message" />
                <ErrorMessage name="message" component="div" />
              </div>
              
              <div>
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending Message" : "Send Message"}
                </button>
              </div>
          </Form>
       )}
     </Formik>
    </>
  </ErrorBoundary>
  )
}

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact me", "app__whitebg"
)
