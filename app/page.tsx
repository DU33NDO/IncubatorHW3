import Image from "next/image";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import axios from "axios";
import ListOfPosts from "./components/ListOfPosts";

export default function Home() {
  return (
    <div>
      <ListOfPosts />
    </div>
  );
}
