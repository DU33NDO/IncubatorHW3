import React, { useEffect, useState } from "react";
import axios from "axios";
import Comment, { CommentProps } from "./Comment";

interface CommentSectionProps {
  postId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<CommentProps[]>([]);

  useEffect(() => {
    console.log(`POSTID = ${postId}`);
    axios
      .get(`http://127.0.0.1:8000/blog/comments?post=${postId}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [postId]);

  return (
    <div className="flex flex-col gap-14">
      {comments.map((comment) => (
        <Comment key={comment.author} {...comment} />
      ))}
      {comments.length === 0 && (
        <p className="text-4xl font-bold text-center py-8">No one(</p>
      )}
    </div>
  );
};

export default CommentSection;
