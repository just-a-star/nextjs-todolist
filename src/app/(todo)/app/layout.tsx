import React from "react";

export const metadata = {
  title: "Todo",
  description: "Todo list",
};

const TodoLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-gray-50 flex min-h-screen flex-col items-center ">{children}</div>;
};

export default TodoLayout;
