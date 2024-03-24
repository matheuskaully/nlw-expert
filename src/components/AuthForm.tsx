import { Github, Linkedin } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { toast } from "sonner"

interface FormProps {
  email: string
  password: string
}

export function AuthForm() {
  const mailsType = '@gmail.com' || '@outlook.com' || '@yahoo.com' || '@icloud.com' || '@aol.com' || '@protonmail.com' || '@zoho.com' || '@gmx.com' || '@yandex.com' || '@mail.com' || '@hotmail.com' || '@live.com' || '@me.com' || '@rocketmail.com' || '@inbox.com' || '@fastmail.com' || '@yandex.ru' || '@qq.com' || '@163.com' || '@sina.com' || '@126.com' || '@163.net' || '@yeah.net' || '@sohu.com' || '@tutanota.com' || '@cock.li' || '@disroot.org' || '@riseup.net' || '@protonmail.ch' || '@posteo.de'
  const [formData, setFormData] = useState<FormProps>({
    email: '',
    password: ''
  })
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false)

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  function authorization() {
    if (formData.email.includes(mailsType) && formData.password) {
      setIsAuthorized(true)
      toast.success('Logado com sucesso!')
    } else (
      toast.error('Digite um e-mail válido e uma senha para testar')
    )
  }

  return (
    <div className="max-w-md w-full p-8 border border-slate-700 rounded-md shadow-md space-y-6 bg-slate-800">
      <h1 className="text-4xl font-bold pb-4 text-slate-200">Fazer log-in</h1>

      <form onSubmit={handleSubmit} className="text-slate-400 space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-slate-200">
            Seu e-mail
          </label>
          <input 
            type="email"
            name="email"
            onChange={handleInputChange} 
            value={formData.email}
            required 
            placeholder="nome@gmail.com"
            className="p-3 bg-slate-700 rounded-md outline-none text-slate-200 focus:ring-lime-400 focus:ring-2 border border-slate-600 placeholder:opacity-50"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-slate-200">Sua senha</label>
          <input 
            type="password" 
            name="password"
            onChange={handleInputChange}
            value={formData.password}
            maxLength={128}
            required 
            placeholder="••••••••••••"
            className="p-3 bg-slate-700 rounded-md text-slate-200 outline-none focus:ring-lime-400 focus:ring-2 border border-slate-600 placeholder:opacity-50"
          />
        </div>
        <div className="gap-4 flex flex-col pt-6">
          <button 
            type="submit"
            onClick={authorization}
            className="w-full p-3 border border-lime-400 text-slate-800 tracking-wide from-lime-400 to-lime-300 bg-gradient-to-r rounded-md outline-none focus:ring-lime-400 focus:ring-2"
          >
            <a href={isAuthorized ? '/notes' : ''} className="hover:text-slate-900">Fazer log-in no app</a>
          </button>
          
          <div className="flex">
            <a href="/comingsoon" className="mx-auto text-sm hover:underline duration-200">Esqueceu sua senha?</a>
          </div>

          <div className="text-sm space-y-2">
            <p>Fazer log-in com</p>
            <div className="flex gap-2">
              <a href="/comingsoon" className="hover:text-lime-400 duration-200"><Github size={24} /></a>
              <a href="/comingsoon" className="hover:text-lime-400 duration-200"><Linkedin size={24} /></a>
            </div>
            <p className="pt-4">Não tem conta? <a href="/comingsoon" className="underline text-slate-200 hover:text-lime-400 duration-200">Crie uma agora mesmo</a>!</p>
          </div>
        </div>
      </form>
    </div>
  )
}