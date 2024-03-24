import logo from './assets/logo.svg'
import { AuthForm } from './components/AuthForm'

export function App() {
  return (
    <main className='mx-auto max-w-6xl py-12 h-screen px-5 grid grid-cols-2 gap-12'>
      <div className='flex flex-col justify-between h-full'>
        <img src={logo} alt='next level week expert' className='w-48' />
        <h1 className='text-slate-200 text-7xl font-bold tracking-tight leading-none'>
          Grave suas notas por <span className='text-transparent bg-clip-text bg-gradient-to-r to-lime-200 from-lime-400'>aúdio</span> ou <span className='text-transparent bg-clip-text bg-gradient-to-r to-lime-200 from-lime-400'>texto</span>!
        </h1>
        <p 
          className='text-slate-400 text-sm'
        >
          No <span className='font-bold'>expert notes</span> você pode gravar suas <span className='text-lime-400 font-bold'>notas</span> ou <span className='text-lime-400 font-bold'>lembretes</span> de forma totalmente gratuita!
        </p>
      </div>

      <div className='flex justify-center h-min my-auto'>
        <AuthForm />
      </div>
    </main>
  )
}