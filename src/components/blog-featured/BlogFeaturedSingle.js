import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BlogFeaturedSingle = ({ singlePost }) => {
  return (
    <div className="blog-wrap mb-30 scroll-zoom">
      <div className="blog-img">
        <Link to={singlePost.url} target="_blank" rel="noopener noreferrer">
          <img src={process.env.PUBLIC_URL + singlePost.image} alt="" />
        </Link>
      </div>
      <div className="blog-content-wrap">
        <div className="blog-content text-center">
          <h3>
            <Link to={singlePost.url} target="_blank" rel="noopener noreferrer">
              {singlePost.title}
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

BlogFeaturedSingle.propTypes = {
  singlePost: PropTypes.shape({})
};

export default BlogFeaturedSingle;
