import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export interface CommentProps {
  post: number;
  author: number;
  main_text: string;
  likes: number;
  dislikes: number;
  created_at: string;
}

const Comment: React.FC<CommentProps> = ({ author, created_at, main_text }) => {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/blog/user/${author}`)
      .then((response) => {
        setUsername(response.data.username);
      })
      .catch((error) => {
        console.error("Error fetching username:", error);
      });
  }, [author]);

  const formattedTime = moment(created_at).format("HH:MM:SS");
  return (
    <div>
      <div className="flex gap-6">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder-user.jpg" alt="User" />
          <AvatarFallback>{username.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-center">
            <p className="text-xl text-black font-bold">{username}</p>
            <p className="text-lg text-black">.</p>
            <p className="text-[10px] text-black">{formattedTime}</p>
          </div>
          <p className="text-lg text-black">{main_text}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
