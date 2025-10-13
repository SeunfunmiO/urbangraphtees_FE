import React from 'react'
import BackHome from '../components/BackHome'

const TermsPage = () => {
  return (
      <div className="container my-5">
      <h2>Terms and Conditions</h2>
      <p>
        Welcome to Urbangraphtees. By using our website, you agree to comply with
        the following terms and conditions. Please read them carefully before
        making a purchase.
      </p>

      <h4>1. Use of Website</h4>
      <p>
        This website is intended for personal use only. Unauthorized commercial
        use or reproduction of content is prohibited.
      </p>

      <h4>2. Product Information</h4>
      <p>
        We strive to provide accurate product details. However, slight variations
        in color, design, or size may occur.
      </p>

      <h4>3. Orders & Payments</h4>
      <p>
        All orders must be paid in full before processing. We reserve the right
        to cancel orders due to stock unavailability or payment issues.
      </p>

      <h4>4. Returns & Refunds</h4>
      <p>
        Returns are accepted within 7 days if the product is unused, unworn, and
        in its original packaging. Refunds will be processed to the original
        payment method.
      </p>

      <h4>5. Limitation of Liability</h4>
      <p>
        We are not liable for damages arising from misuse of products or
        third-party delays in delivery.
      </p>
     <BackHome/>
    </div>
  )
}

export default TermsPage