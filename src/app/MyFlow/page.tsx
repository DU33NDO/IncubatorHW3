import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, Star } from "lucide-react";

export default function MyFlow() {
  const userStats = [
    { icon: <BookOpen className="h-4 w-4" />, label: "Articles", value: "23" },
    { icon: <Users className="h-4 w-4" />, label: "Followers", value: "1.2k" },
    { icon: <Star className="h-4 w-4" />, label: "Likes", value: "4.5k" },
  ];

  const articles = [
    {
      title: "The Future of AI in Web Development",
      date: "May 15, 2023",
      readTime: "5 min read",
    },
    {
      title: "Understanding React Server Components",
      date: "Apr 22, 2023",
      readTime: "7 min read",
    },
    {
      title: "CSS Grid: A Complete Guide",
      date: "Mar 10, 2023",
      readTime: "10 min read",
    },
    {
      title: "JavaScript Performance Optimization Tips",
      date: "Feb 5, 2023",
      readTime: "6 min read",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/placeholder-user.jpg" alt="John Doe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold mb-2">John Doe</h1>
            <p className="text-muted-foreground mb-4">
              Software developer passionate about web technologies and writing.
            </p>
            <Button>Edit Profile</Button>
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
                    <span>{article.date}</span>
                    <span className="mx-2">•</span>
                    <span>{article.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="about">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">About John Doe</h3>
                <p className="text-muted-foreground">
                  John is a software developer with over 5 years of experience
                  in web technologies. He specializes in React, Node.js, and
                  modern JavaScript. When not coding, John enjoys writing about
                  tech, hiking, and playing the guitar.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
