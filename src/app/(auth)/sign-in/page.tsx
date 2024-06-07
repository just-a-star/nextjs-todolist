import SignInForm from "@/components/form/SignInForm";

const page = () => {
  return (
    <main className="bg-gray-50 flex min-h-screen flex-col items-center p-24">
      <h1 className="text-xl font-bold py-2">Sign In</h1>
      <SignInForm />
    </main>
  );
};

export default page;
