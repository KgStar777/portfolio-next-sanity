import { useHeaders } from "./hooks/useHeaders";
import { redirect } from "next/navigation";

export default async function Home() {
  const { priorityLanguage } = useHeaders();

  redirect(priorityLanguage);
}
