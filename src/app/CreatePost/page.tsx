"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Bold, Italic, List, Image as ImageIcon, X } from "lucide-react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { now } from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreatePost() {
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { userId } = useAuth();

  useEffect(() => {
    const fetchUserName = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/blog/user/${userId}`
          );
          setUserName(response.data.username);
        } catch (error) {
          console.log(`ERROR while fetching username: ${error}`);
        }
      }
    };
    fetchUserName();
  }, [userId]);

  const addTag = (tag: string) => {
    if (tags.length < 5 && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const tagOptions = [
    "Technology",
    "Programming",
    "Design",
    "Writing",
    "Productivity",
    "Comedy",
    "Horror",
  ];

  const handlePublish = async () => {
    if (!title || !content) {
      toast.error("Please fill in the title and content.");
      return;
    }

    const postData = {
      title: title,
      body: content,
      tags: tags,
      date: now,
      author: userId,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/blog/posts/",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Post published:", response.data);
      toast.success("Вы добавили пост!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTitle("");
      setContent("");
      setTags([]);
    } catch (error) {
      console.error("Error publishing post:", error);
      toast.error("Failed to publish the post.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 flex justify-end items-center">
        <div className="flex items-center space-x-4">
          <Button onClick={handlePublish}>Publish</Button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 flex flex-col lg:flex-row">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="w-full lg:w-3/4 lg:pr-8">
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-4xl font-bold mb-4 border-none shadow-none focus-visible:ring-0"
          />

          <div className="mb-4 flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <ImageIcon className="h-4 w-4" />
            </Button>
          </div>

          <Textarea
            placeholder="Tell your story..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[300px] text-lg border-none shadow-none focus-visible:ring-0"
          />

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Button
                  key={tag}
                  variant="secondary"
                  size="sm"
                  onClick={() => removeTag(tag)}
                >
                  {tag}
                  <X className="ml-1 h-3 w-3" />
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {tagOptions.map((tag) => (
                <Button
                  key={tag}
                  variant="outline"
                  size="sm"
                  onClick={() => addTag(tag)}
                  disabled={tags.includes(tag) || tags.length >= 5}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <aside className="w-full lg:w-1/4 mt-8 lg:mt-0">
          <Card className="mt-4">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Publishing to</h3>
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback>{userName.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <span>{userName}</span>
              </div>
            </CardContent>
          </Card>
        </aside>
      </main>
    </div>
  );
}
