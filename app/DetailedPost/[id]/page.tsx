"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

interface IPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  date: string;
}

const DetailedPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://dummyjson.com/posts/${id}`)
        .then((response) => {
          setPost(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-20 px-64 pt-8">
      <div className="flex gap-4 items-center">
        <img
          src="https://www.turkguven.com/old/assets/img/people/img2-large.jpg"
          alt="user photo"
          className="w-28 rounded-[80px]"
        />
        <div className="flex flex-col gap-4">
          <p className="text-xl font-bold">Author's name</p>
          <div className="flex gap-3">
            <p className="text-gray-500">7 July</p>
            <p className="text-gray-500">12 min read</p>
            <p className="text-gray-500">Member-only</p>
          </div>
        </div>
      </div>
      <div className="mt-20 flex flex-col gap-36">
        <h1 className="font-bold text-4xl text-left">{post.title}</h1>
        <div className="flex justify-center">
          <img
            className="w-max"
            src="https://w.forfun.com/fetch/42/42fc46d67b66488fa911e03118585cba.jpeg?w=1470&r=0.5625"
            alt=""
          />
        </div>
      </div>
      <p className="text-2xl leading-10 mt-20 mb-40">{post.body}</p>
      <div className="flex justify-between mb-20">
        <p className="text-black font-bold text-xl">{post.tags.join(", ")}</p>
        <div className="flex gap-8">
          <div className="flex gap-1">
            <p className="font-bold text-xl">{post.reactions.likes}</p>
            <p className="font-bold text-blue-500 text-xl">Likes</p>
          </div>
          <div className="flex gap-1">
            <p className="font-bold text-xl">{post.reactions.dislikes}</p>
            <p className="font-bold text-red-500 text-xl">Dislikes</p>
          </div>
          <div className="flex gap-1">
            <p className="font-bold text-xl">{post.views}</p>
            <p className="font-bold text-green-500 text-xl">Views</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedPost;
