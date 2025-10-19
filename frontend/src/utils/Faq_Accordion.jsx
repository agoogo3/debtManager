import React from 'react'

const Faq_Accordion = () => {
    const faqs = [
        {
            title:"What is this platform?",
            body:"It's a tool for individuals and small lenders to manage debts and track payments from their debtors"
        },
        {
            title:"Can I use for multiple debtors?",
            body:"Yes. Add and manage unlimited debtors for ease"
        },
        {
            title:"Do debtors need to sign up?",
            body:"No. Only you need an account. You control everything"
        },
    ]
  return (
    <div className="accordion" id="accordionExample">
      {faqs.map((faq, index) => (
        <div className="accordion-item border-0">
          <h2 className="accordion-header" id={`heading${index}`}>
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${index}`}
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <strong>{faq.title}</strong>
            </button>
          </h2>
          <div
            id={`collapse${index}`}
            className={`accordion-collapse collapse ${index==0?'show' :''}`}
            aria-labelledby={`heading${index}`}
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">{faq.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Faq_Accordion
