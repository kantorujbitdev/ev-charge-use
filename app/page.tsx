import { redirect } from "next/navigation";

export default function Home() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    redirect("/login");
  } else {
    redirect("/");
  }
}
