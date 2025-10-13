import React from 'react'
import { Link } from "react-router-dom";
import blogPosts from "../data/BlogPost";

const BlogPage = () => {
  return (
    <div className="container prodGrid py-4">
      <h2 className="mb-4 text-center">Our Blog</h2>
      <div className="row">
        {blogPosts.map((post) => (
          <div className="col-md-4 mb-4" key={post.id}>
            <div className="card h-100 shadow-sm">
              <img src={post.image} className="card-img-top" alt={post.title} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="btn border-0 text-decoration-underline mt-auto">
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogPage
