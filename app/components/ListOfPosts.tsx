"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import { IPost } from "./Post";

export interface IAppProps {}

export default function ListOfPosts(props: IAppProps) {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await axios.get("https://dummyjson.com/posts");
        console.log(response.data.posts);
        setPosts(response.data.posts);
      } catch (error) {
        console.error(error);
      }
    }
    getPosts();
  }, []);

  if (posts.length === 0) {
    return <div className="mt-20 px-64 pt-8">Loading...</div>;
  }

  return (
    <div>
      {posts.map((post: IPost) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
