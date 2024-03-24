import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner' 

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState<boolean>(true)
  const [content, setContent] = useState<string>('')
  const [isRecording, setIsRecording] = useState(false)

  function handleStartEditor() {
    setShouldShowOnBoarding(false)
  }

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)

    if (event.target.value === '') {
      setShouldShowOnBoarding(true)
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault()

    if (content === '') {
      return 
    }

    onNoteCreated(content)
    setContent('')
    toast.success('Nota criada com sucesso!')
    setShouldShowOnBoarding(true)
  }

  function handleStartRecording() {
    const isSpeechRecognitionAvailable = 'SpeechRecognition' in window
      || 'webkitSpeechRecognition' in window

    if (!isSpeechRecognitionAvailable) {
      toast.error('Infelizmente seu navegador não suporta essa funcionalidade!')
      return
    }

    setIsRecording(true)
    setShouldShowOnBoarding(false)

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

    speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setContent(transcription)
    }

    speechRecognition.onerror = (event) => {
      console.error(event)
    }

    speechRecognition.start()
    
  }

  function handleStopRecording() {
    setIsRecording(false)
    speechRecognition?.stop()
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className='rounded-md bg-slate-700 p-5 flex flex-col gap-3 text-left hover:ring-2 hover:ring-slate-600 outline-none focus-visible:ring-2 focus-visible:ring-lime-400'>
        <span className='font-medium text-sm text-slate-200'>Adicionar nota</span>
        <p className='text-sm text-slate-400 leading-6'>Grave uma nota em áudio que será convertida para texto automaticamente.</p>
      </Dialog.Trigger>

      <Dialog.Portal>
          <Dialog.Overlay className='inset-0 fixed bg-black/50' />

          <Dialog.Content className='fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:h-[60vh] w-full bg-slate-700 md:rounded-md flex flex-col overflow-hidden outline-none'>
            <Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
              <X className='size-5' />
            </Dialog.Close>

            <form className='flex flex-col flex-1'>
              <div className='flex flex-1 flex-col gap-3 p-5'>
                <span className='font-medium text-sm text-slate-300'>Adicionar nota</span>
                
                {shouldShowOnBoarding ? (
                  <p 
                  className='text-sm text-slate-400 leading-6'
                >
                  Começe gravando uma <button type='button' onClick={handleStartRecording} className='font-medium text-lime-400 hover:underline'>nota em áudio</button> ou se preferir <button type='button' onClick={handleStartEditor} className='font-medium text-lime-400 hover:underline'>utilize apenas texto</button>.
                </p>
                ): (
                  <textarea 
                    autoFocus 
                    className='text-sm leading-6 text-slate-400 resize-none bg-transparent flex-1 outline-none'
                    onChange={handleContentChanged}
                    value={content}
                  />
                
                )}
              </div>

              {isRecording ? (
                <button type='button' onClick={handleStopRecording} className='w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100 duration-300'>
                  <div className='size-3 bg-red-500 rounded-full animate-pulse' />
                  Gravando! (Clique para interromper)
                </button>
              ): (
                <button type='button' onClick={handleSaveNote} className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500 duration-300'>
                  Salvar nota
                </button>
              )}

              
            </form>

          </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
  )
}