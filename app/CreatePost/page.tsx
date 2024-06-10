"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthContext";
import { useState, useEffect } from "react";
import withAuth from "../components/withAuth";

const CreatePost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postTag, setPostTag] = useState("comedy");
  const { userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Initialize the counter in localStorage if it doesn't exist
    if (localStorage.getItem("postCounter") === null) {
      localStorage.setItem("postCounter", "0");
    }
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    if (postTitle && postDescription) {
      try {
        console.log("Attempting to add new post");
        await addNewPost();
        setPostTitle("");
        setPostDescription("");
        setPostTag("comedy");
        alert("Вы добавили пост!");
        router.push("/");
      } catch (error) {
        console.error("There was an error making the request:", error);
      }
    } else {
      console.error("Пожалуйста, заполните оба поля!");
    }
  };

  async function addNewPost() {
    if (postTitle && postDescription && userId) {
      try {
        const currentCounter = localStorage.getItem("postCounter");
        const newCounter = currentCounter
          ? parseInt(currentCounter, 10) + 1
          : 1;
        localStorage.setItem("postCounter", newCounter.toString());

        const currentDate = new Date().toISOString();
        const response = await axios.post(
          "http://localhost:3001/posts",
          {
            id: newCounter,
            idAuth: userId,
            title: postTitle,
            body: postDescription,
            tag: postTag,
            date: currentDate,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("There was an error making the request:", error);
      }
    } else {
      console.error("Missing title, description, or userId.");
    }
  }

  return (
    <div>
      <div className="px-64 pt-8">
        <p className="text-3xl font-bold text-center mt-20">Create your post</p>
        <form action="post" onSubmit={handleFormSubmit}>
          <div className="mt-20 flex gap-10 justify-center">
            <input
              type="text"
              placeholder="Write your title"
              value={postTitle}
              onChange={(event) => setPostTitle(event.target.value)}
              className="border-black border-2 rounded-3xl px-8 py-3"
            />
            <input
              type="text"
              placeholder="Write your description"
              value={postDescription}
              onChange={(event) => setPostDescription(event.target.value)}
              className="border-black border-2 rounded-3xl px-8 py-3"
            />
            <select
              name="types"
              id="types"
              value={postTag}
              onChange={(event) => setPostTag(event.target.value)}
              className="border-black border-2 rounded-3xl px-8 py-3"
            >
              <option value="comedy">Comedy</option>
              <option value="horror">Horror</option>
              <option value="adventure">Adventure</option>
              <option value="history">History</option>
            </select>
          </div>
          <div className="flex justify-center mt-20">
            <button
              type="submit"
              className="border-black border-2 rounded-3xl px-8 py-3 "
            >
              ADD POST
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default withAuth(CreatePost);
