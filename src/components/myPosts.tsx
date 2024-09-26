"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import MyPost, { IMyPost } from "./MyPostPage";
import withAuth from "./withAuth";

const myPosts = () => {
  const [posts, setPosts] = useState<IMyPost[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get("http://localhost:3001/posts");
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("There was an error fetching the posts:", error);
      }
    }

    fetchPosts();
  }, []);

  if (posts.length === 0) {
    return <div className="mt-20 px-64 pt-8">Loading...</div>;
  }

  return (
    <div>
      <h1 className="mt-20 px-64 pt-8 text-4xl font-bold text-center">
        My Posts
      </h1>
      {posts.map((post: IPost) => (
        <MyPost key={post.id} post={post} />
      ))}
    </div>
  );
};
export default withAuth(myPosts);
