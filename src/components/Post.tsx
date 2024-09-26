"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "../app/AuthContext"; // If you have AuthContext

interface IPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  likes: number;
  dislikes: number;
  views: number;
  date: string;
  author: number;
}

export default function Post({ post }: { post: IPost }) {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchUserName = async () => {
      if (post.author) {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/blog/user/${post.author}`
          );
          setUserName(response.data.username);
        } catch (error) {
          console.log(`ERROR while fetching username: ${error}`);
        }
      }
    };
    fetchUserName();
  }, [post.author]);

  return (
    <div>
      <div className="mt-20 px-64 pt-8">
        <div key={post.id}>
          <div className="flex justify-between items-center mt-20">
            <div className="flex flex-col gap-14">
              <div className="flex gap-2 items-center">
                <img
                  className="w-8 h-8 rounded-3xl"
                  src="https://www.turkguven.com/old/assets/img/people/img2-large.jpg"
                  alt="user's photo"
                />
                <p className="font-bold text-sm">{userName}</p>{" "}
                <p className="text-gray-500 text-sm">in</p>
                <p className="font-bold text-sm">{post.tags.join(", ")}</p>
              </div>
              <Link href={`/DetailedPost/${post.id}`}>
                <div className="flex flex-col gap-7 mb-4">
                  <h1 className="text-4xl font-bold max-w-[35ch]">
                    {post.title}
                  </h1>
                  <p className="text-xl leading-9 max-w-[65ch]">
                    {post.body.slice(0, 50)}...
                  </p>
                </div>
              </Link>
              <div className="flex items-center gap-44">
                <div className="flex gap-3 items-center">
                  <div className="bg-gray-200 rounded-2xl">
                    <p className="text-black px-5 py-1.5">Java Script</p>
                  </div>
                  <p className="text-gray-500">12 min read</p>
                  <p className="text-black font-bold align-top ">.</p>
                  <p className="text-gray-500">Selected for you</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm ">{post.likes} Likes</p>
                  <p className="text-sm ">{post.dislikes} Dislikes</p>
                  <p className="text-sm "> {post.views} View</p>
                </div>
              </div>
            </div>
            <img
              className="w-[400px] h-auto rounded-xl object-cover bg-cover"
              src="https://img.goodfon.com/original/4500x2971/c/1b/ozero-gory-les-zakat-derevya.jpg"
              alt="post photo"
            />
          </div>
          <hr className="mt-12 border-gray-400" />
        </div>
      </div>
    </div>
  );
}
