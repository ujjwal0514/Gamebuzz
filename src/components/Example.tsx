import React, { useEffect, useState } from "react";
import { getPosts, createPost, updatePost, deletePost } from "./api";
import type { Post } from "./api";

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetch posts when component mounts
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const res = await getPosts();
      setPosts(res.data);
      console.log("==>>",res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

//   const addPost = async () => {
//     try {
//       await createPost({ title: "New Post", author: "Guest" });
//       loadPosts();
//     } catch (err) {
//       console.error("Error creating post:", err);
//     }
//   };

//   const editPost = async (id: number) => {
//     try {
//       await updatePost(id, { title: "Updated Title", author: "Ujjwal" });
//       loadPosts();
//     } catch (err) {
//       console.error("Error updating post:", err);
//     }
//   };

//   const removePost = async (id: number) => {
//     try {
//       await deletePost(id);
//       loadPosts();
//     } catch (err) {
//       console.error("Error deleting post:", err);
//     }
//   };

  return (
    <div>
      {/* <h1>Posts</h1>
      <button onClick={addPost}>Add Post</button>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>
            {post.title} - {post.author}
          </h3>
          <button onClick={() => editPost(post.id!)}>Edit</button>
          <button onClick={() => removePost(post.id!)}>Delete</button>
        </div>
      ))} */}
    </div>
  );
};

export default PostList;
