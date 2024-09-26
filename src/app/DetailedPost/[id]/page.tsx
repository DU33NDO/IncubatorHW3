"use client";

import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import CommentSection from "@/src/components/CommentSection";

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

const DetailedPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<IPost | null>(null);
  const [authorName, setAuthorName] = useState("");
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [disLikeCount, setDisLikeCount] = useState(0);
  // const [likeTimer, setLikeTimer] = useState<NodeJS.Timeout | null>(null);
  // const [dislikeTimer, setDislikeTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:8000/blog/post/${id}`)
        .then((response) => {
          setPost(response.data);
          setLikeCount(response.data.likes);
          setDisLikeCount(response.data.dislikes);

          return axios.get(
            `http://127.0.0.1:8000/blog/user/${response.data.author}`
          );
        })
        .then((authorResponse) => {
          setAuthorName(authorResponse.data.username);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function handleLike() {
    if (!hasLiked) {
      setLikeCount(likeCount + 1);
      setHasLiked(true);

      if (hasDisliked) {
        setDisLikeCount(disLikeCount - 1);
        setHasDisliked(false);
      }
    } else {
      setLikeCount(likeCount - 1);
      setHasLiked(false);
    }
  }

  function handleDislike() {
    if (!hasDisliked) {
      setDisLikeCount(disLikeCount + 1);
      setHasDisliked(true);

      if (hasLiked) {
        setLikeCount(likeCount - 1);
        setHasLiked(false);
      }
    } else {
      setDisLikeCount(disLikeCount - 1);
      setHasDisliked(false);
    }
  }

  const formattedDate = moment(post?.date).format("D MMMM YYYY");

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
          <p className="text-xl font-bold">{authorName}</p>
          <div className="flex gap-3">
            <p className="text-gray-500">{formattedDate}</p>
            <p className="text-gray-500 font-black">12 min read</p>
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
      <div className="flex justify-end gap-12">
        {!hasLiked && (
          <img
            src="/photos/black_heart.png"
            alt=""
            className="w-[80px] h-[80px]"
            onClick={handleLike}
          />
        )}
        {hasLiked && (
          <img
            src="/photos/red_heart.png"
            alt=""
            className="w-[80px] h-[80px]"
            onClick={handleLike}
          />
        )}
        {!hasDisliked && (
          <img
            src="/photos/dislike_white.png"
            alt=""
            className="w-[80px] h-[80px]"
            onClick={handleDislike}
          />
        )}
        {hasDisliked && (
          <img
            src="/photos/dislike_blue.png"
            alt=""
            className="w-[80px] h-[80px]"
            onClick={handleDislike}
          />
        )}
      </div>
      <div className="flex justify-between mb-20 mt-8">
        <p className="text-black font-bold text-xl">{post.tags.join(", ")}</p>
        <div className="flex gap-8">
          <div className="flex gap-1">
            <p className="font-bold text-xl">{likeCount}</p>
            <p className="font-bold text-red-500 text-xl">Likes</p>
          </div>
          <div className="flex gap-1">
            <p className="font-bold text-xl">{disLikeCount}</p>
            <p className="font-bold text-blue-500 text-xl">Dislikes</p>
          </div>
          <div className="flex gap-1">
            <p className="font-bold text-xl">{post.views}</p>
            <p className="font-bold text-green-500 text-xl">Views</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <p className="text-3xl font-superbold">COMMENTS</p>
      </div>
      <CommentSection postId={post.id} />
    </div>
  );
};

export default DetailedPost;
