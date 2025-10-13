import React from "react";
import { useParams, Link } from "react-router-dom";
import blogPosts from "../data/BlogPost";

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    return <h2 className="text-center mt-5">Post not found
      <div><Link to="/blog" className="btn btn-outline-dark mt-4">
        ← Back to Blog
      </Link></div>
    </h2>;
  }

  return (
    <div className="container py-4">
      <img
        src={post.image}
        alt={post.title}
        className="img-fluid rounded mb-4"
      />
      <h1 className="fw-bold">{post.title}</h1>
      <p className="text-muted">{post.date}</p>
      <p style={{ whiteSpace: "pre-line" }}>{post.content}</p>

      <Link to="/blog" className="btn btn-outline-dark mt-4">
        ← Back to Blog
      </Link>
    </div>
  );
};

export default BlogPost;
