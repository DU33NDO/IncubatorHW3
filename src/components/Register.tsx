"use client";
import axios from "axios";
import * as React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../app/AuthContext";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export interface IAppProps {}

export default function Register(props: IAppProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, setUserId, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username && password) {
      await login();
      alert("Вы вошли в аккаунт!!");
      setUsername("");
      setPassword("");
    } else {
      console.error("Пожалуйста, заполните оба поля!!!!!!");
    }
  };

  async function login() {
    if (username && password) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/blog/auth/register/",
          {
            username: username,
            password: password,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log(response.data);
        const accessToken = response.data.access;
        const refreshToken = response.data.refresh;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        const decodedToken: any = jwtDecode(accessToken);
        const userId = decodedToken.user_id;
        console.log("User ID from token:", userId);

        setIsAuthenticated(true);

        setUserId(userId);
      } catch (error) {
        console.log("Ошибка при входе:", error);
      }
    }
  }

  return (
    <div>
      <div className="px-64 pt-8">
        <div className="bg-gray-500 px-4 py-4 rounded-3xl ">
          <p className="text-4xl font-bold text-center mb-40">REGISTER</p>
          <form onSubmit={handleFormSubmit}>
            <div className="flex gap-8 justify-center">
              <input
                type="text"
                placeholder="emilys"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="px-3 py-3 rounded-2xl w-60 h-15"
              />
              <input
                type="password"
                placeholder="emilyspass"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="px-3 py-3 rounded-2xl w-60 h-15"
              />
              <button
                type="submit"
                className="px-3 py-3 rounded-2xl w-60 h-15 border-gray-700 border-2"
              >
                SEND
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
