import { ArrowLeft } from "lucide-react";

export function ComingSoon() {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col gap-2">
      <h1 className="text-3xl tracking-tight">Em breve...</h1>
      <a href="/" className="text-sm hover:underline hover:text-lime-400 duration-200 flex gap-2 items-center">
        <ArrowLeft size={16} />
        voltar para home page
      </a>
    </div>
  )
}