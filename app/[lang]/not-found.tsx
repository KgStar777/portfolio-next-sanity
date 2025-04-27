import { NotFound } from "@/components/NotFound"

export default function NotFoundPage({ params }: {
  params?: { lang?: string }
}) {
  return <NotFound />
}