// import React, { Fragment, useEffect} from "react";
// import { connect } from 'react-redux';
// import {getPosts} from '../actions/post'
// import PropTypes from 'prop-types';
// import PostItem from './PostItem';
// import post from "../reducers/post";


// const Posts = ({getPosts, post: {posts, loading}}) => {



//   useEffect(() => {
//     getPosts();
//   },[getPosts]);


//   return loading ? <span>Loading...</span>:(
//     <>
//         <h1>Posts..</h1>
//         <div className="posts">
//           {posts.map(post => (
//             <PostItem key={post._id} post={post} />
//           ))}
//         </div>
//     </>
//   )
    

// }
// Posts.propTypes = {
//   getPosts:PropTypes.func.isRequired,
//   post:PropTypes.object.isRequired
// }
// const mapStateToProps = state =>({
//   post: state.post
// });
// export default connect(mapStateToProps, {getPosts})(Posts);
