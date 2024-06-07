"use client";

import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";

const Custom404 = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-lg text-gray-600">Page Not Found or Is Still Under Development...</p>
      <Button onClick={handleGoHome} className="mt-6">
        Go Home
      </Button>
    </div>
  );
};

export default Custom404;
