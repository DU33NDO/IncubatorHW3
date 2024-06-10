import * as React from "react";
import Link from "next/link";

export interface IAppProps {}

export default function navbar(props: IAppProps) {
  return (
    <div>
      <div className="px-64 pt-8">
        <div className="flex justify-between mb-5 items-center">
          <div>
            <Link href={"/"}>
              <h1 className="text-3xl font-bold">Medium</h1>
            </Link>
          </div>
          <div className="flex gap-9">
          <Link href={"/"}>
              <h1 className="text-base cursor-pointer">Home</h1>
            </Link>
            <Link href={"/CreatePost"}>
              <p className="text-base cursor-pointer">Create post</p>
            </Link>
            <Link href={"/PageForMyPosts"}>
              <p className="text-base cursor-pointer">My Posts</p>
            </Link>
            <Link href="/authentication" className="text-base cursor-pointer">
              Log in
            </Link>
            <Link href="/Logout" className="text-base cursor-pointer">
              Log out
            </Link>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
