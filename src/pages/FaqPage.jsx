import React from 'react'
import { Link } from 'react-router-dom'

const FaqPage = () => {
    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Frequently Asked Questions (FAQ)</h2>
            <div className="accordion" id="faqAccordion">

                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                        >
                            How long does delivery take?
                        </button>
                    </h2>
                    <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#faqAccordion"
                    >
                        <div className="accordion-body">
                            <ul>
                                <li><strong>Within Lagos:</strong> 2–3 working days</li>
                                <li><strong>Outside Lagos:</strong> 3–5 working days</li>
                                <li><strong>Outside Nigeria:</strong> 7–14 working days</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFive">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFive"
                            aria-expanded="false"
                            aria-controls="collapseFive"
                        >
                            Do you accept payments on delivery?
                        </button>
                    </h2>
                    <div
                        id="collapseFive"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingFive"
                        data-bs-parent="#faqAccordion"
                    >
                        <div className="accordion-body">
                            No, we do not accept payments on delivery.
                          <Link to={'/delivery-policy'} className='text-decoration-none'> Delivery Policy</Link> for more details.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                        >
                            Do you offer refunds or returns?
                        </button>
                    </h2>
                    <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#faqAccordion"
                    >
                        <div className="accordion-body">
                            Yes, returns are accepted within 7 days of delivery provided the item is
                            unused, undamaged, and in its original packaging. Please read our
                            <Link to={'/Terms'} className='text-decoration-none'> Terms & Conditions</Link> for more details.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                        >
                            How can I track my order?
                        </button>
                    </h2>
                    <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#faqAccordion"
                    >
                        <div className="accordion-body">
                            Once your order is shipped, you’ll receive an email or SMS with
                            tracking details. You can also log in to
                            <Link to={'/Profile'} className='text-decoration-none'> Your Profile</Link> to check order status.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFour"
                            aria-expanded="false"
                            aria-controls="collapseFour"
                        >
                            What payment methods do you accept?
                        </button>
                    </h2>
                    <div
                        id="collapseFour"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingFour"
                        data-bs-parent="#faqAccordion"
                    >
                        <div className="accordion-body">
                            We accept payments via bank transfer, debit/credit cards, and secure
                            payment gateways. 
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default FaqPage