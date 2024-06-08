import SignUpForm from "@/components/form/SignUpForm";

const Page = () => {
  return (
    <div className="bg-gray-50 flex min-h-screen flex-col items-center p-24">
      <h1 className="text-xl font-bold py-2">Sign Up</h1>
      <SignUpForm />
    </div>
  );
};

export default Page;
