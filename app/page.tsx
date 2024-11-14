import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard");
  return (
    <div>
      <h2>Home Page</h2>
    </div>
  );
}
