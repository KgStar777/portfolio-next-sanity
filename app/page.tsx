import { useHeaders } from "./hooks/useHeaders";
import { redirect } from "next/navigation";

export default function Home() {
  const { priorityLanguage } = useHeaders();

  redirect(priorityLanguage);
}
