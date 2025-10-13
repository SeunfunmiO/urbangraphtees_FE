import React from "react";
import Footer from "../components/Footer";

const About = () => {
  return (
    <section className="about-page pt-5">
      <div className="container">
        <div className="mb-5">
          <h2 className="text-uppercase fw-bold mb-3">Our Story</h2>
          <p className="text-muted">
            UrbanGraphTees(UGT) was born from the streets — a creative intersection of fashion,
            culture, and self-expression. We believe every tee tells a story,
            and ours is rooted in authenticity, boldness, and the everyday voices
            of the community. What started as a passion project has grown into a
            streetwear movement with global reach.
          </p>
        </div>

        <div className="mb-5">
          <h2 className="text-uppercase fw-bold mb-3">Our Mission</h2>
          <p className="text-muted">
            To craft streetwear that blends comfort, luxury, and culture —
            empowering individuals to embrace their identity and
            express themselves without limits.
          </p>
        </div>

        <div className="mb-5">
          <h2 className="text-uppercase fw-bold mb-3">Our Vision</h2>
          <p className="text-muted">
            To redefine African streetwear on the global stage, becoming
            a symbol of authenticity, innovation, and inclusivity while
            building a community where style meets purpose.
          </p>
        </div>

        <div>
          <h2 className="text-uppercase fw-bold mb-3">Our Values</h2>
          <ul className="list-unstyled">
            <li className="mb-2">
              <strong>Community:</strong> We are more than a brand; we are a family bound by
              culture, art, and collaboration.
            </li>
            <li className="mb-2">
              <strong>Street Culture:</strong> Inspired by the energy, rhythm, and raw truth of the streets.
            </li>
            <li className="mb-2">
              <strong>Authenticity:</strong> Staying true to who we are, from our designs to our message.
            </li>
            <li className="mb-5">
              <strong>Innovation:</strong> Pushing boundaries of streetwear with unique, luxury-inspired designs.
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default About;
