"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import { IPost } from "./Post";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface IAppProps {}

export default function ListOfPosts(props: IAppProps) {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/blog/posts/?page=${page}`
        );
        setPosts(response.data.results);
        setTotalPages(response.data.count);
      } catch (error) {
        console.error(error);
      }
    }
    getPosts();
  }, [page]);

  if (posts.length === 0) {
    return <div className="mt-20 px-64 pt-8">Loading...</div>;
  }

  return (
    <div>
      {posts.map((post: IPost) => (
        <Post key={post.id} post={post} />
      ))}
      <div className="flex justify-between items-center mt-8 px-40 py-6">
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          variant="outline"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <span className="text-muted-foreground">
          Page {page} of {totalPages}
        </span>
        <Button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          variant="outline"
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
