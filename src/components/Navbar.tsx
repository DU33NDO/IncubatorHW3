"use client";
import * as React from "react";
import Link from "next/link";
import { useAuth } from "../app/AuthContext";

export interface IAppProps {}

export default function Navbar(props: IAppProps) {
  const { isAuthenticated } = useAuth();

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
            {isAuthenticated ? (
              <>
                <Link href={"/CreatePost"}>
                  <p className="text-base cursor-pointer">Create post</p>
                </Link>
                <Link href="/MyFlow" className="text-base cursor-pointer">
                  My flow
                </Link>
                <Link href="/Logout" className="text-base cursor-pointer">
                  Log out
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/authentication"
                  className="text-base cursor-pointer"
                >
                  Registration
                </Link>
                <Link href="/Login" className="text-base cursor-pointer">
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
