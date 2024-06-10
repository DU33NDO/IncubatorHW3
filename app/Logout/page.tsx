// app/logout/page.tsx
"use client";

import { useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation";

const Logout = () => {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    logout();
    router.push("/authentication"); // Проверьте, что путь верный
  }, [logout, router]);

  return <div>Logging out...</div>;
};

export default Logout;
