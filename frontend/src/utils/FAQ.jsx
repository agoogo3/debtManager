import React from 'react'
import Faq_Accordion from './Faq_Accordion';

const FAQ = () => {
  return (
    <div className="container position-relative" style={{ height: "500px",overflowX:'hidden' }}>
      <div
        className="faq-pinkie bg-danger-subtle position-absolute"
       
      ></div>
      <div className="row row-cols-1 row-cols-md-2 mt-5">
        <div className="col display-flex">
            <h5 className='my-auto mb-3' style={{fontWeight:'800'}}>FAQs</h5>
           
        </div>
        <div className="col">
          <Faq_Accordion/>
        </div>
      </div>
    </div>
  );
}

export default FAQ
