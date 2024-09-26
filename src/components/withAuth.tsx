import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/AuthContext";

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/authentication");
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
