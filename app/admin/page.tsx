import Hero from "@/components/Hero";
import Link from "next/link";

type Props = {};

const Admin = (props: Props) => {
  return (
    <div className="container flex h-screen flex-col items-center gap-6 border pb-8 pt-6 md:py-10">
      <div className="flex items-center justify-center">Admin</div>
      <Hero />
    </div>
  );
};

export default Admin;
