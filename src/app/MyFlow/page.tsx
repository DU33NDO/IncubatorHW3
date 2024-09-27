"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { BookOpen, Users, Star } from "lucide-react";
import { useAuth } from "../AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyFlow() {
  const { userId } = useAuth();
  const [userName, setUserName] = useState<string>("");
  const [userBio, setUserBio] = useState<string>("");
  const [newUserBio, setNewUserBio] = useState<string>("");
  const [articles, setArticles] = useState<any[]>([]);
  const [articleCount, setArticleCount] = useState<number>(0);

  const userStats = [
    {
      icon: <BookOpen className="h-4 w-4" />,
      label: "Articles",
      value: articleCount.toString(),
    },
    { icon: <Users className="h-4 w-4" />, label: "Followers", value: "1.2k" },
    { icon: <Star className="h-4 w-4" />, label: "Likes", value: "4.5k" },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const userResponse = await axios.get(
            `http://127.0.0.1:8000/blog/user/${userId}`
          );
          setUserName(userResponse.data.username);
          setUserBio(userResponse.data.bio);

          const postsResponse = await axios.get(
            `http://127.0.0.1:8000/blog/posts/?author=${userId}`
          );
          setArticles(postsResponse.data.results);
          setArticleCount(postsResponse.data.count);
        } catch (error) {
          console.log(`ERROR while fetching user data: ${error}`);
        }
      }
    };
    fetchUserData();
  }, [userId]);

  async function handleEditProfile() {
    try {
      const postsResponse = await axios.put(
        `http://127.0.0.1:8000/blog/user/${userId}`,
        {
          bio: newUserBio,
        }
      );
      setNewUserBio("");
      setUserBio(newUserBio);
      toast.success("Вы изменили био!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      console.log("Profile updated:", postsResponse.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src="/placeholder-user.jpg"
              alt={userName.slice(0, 1)}
            />
            <AvatarFallback>{userName.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold mb-2">{userName}</h1>
            <p className="text-muted-foreground mb-4">{userBio}</p>
            <Input
              className="text-black text-xl"
              onChange={(e) => setNewUserBio(e.target.value)}
              value={newUserBio}
              placeholder="Write new bio"
            />
            <Button className="mt-8" onClick={handleEditProfile}>
              Edit Profile
            </Button>
            <ToastContainer />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {userStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="articles" className="space-y-4">
          <TabsList>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          <TabsContent value="articles" className="space-y-4">
            {articles.map((article, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{article.body.slice(0, 50)}...</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="about">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">About {userName}</h3>
                <p className="text-muted-foreground">{userBio}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
