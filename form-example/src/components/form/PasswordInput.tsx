import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import TextInput from '../ui/TextInput'

interface PasswordInputProps {
  id: string
  name: string
  placeholder: string
  isVisible: boolean
  onToggle: () => void
}

const PasswordInput = ({
  id,
  name,
  placeholder,
  isVisible,
  onToggle,
}: PasswordInputProps) => (
  <div className='relative'>
    <TextInput
      id={id}
      name={name}
      type={isVisible ? 'text' : 'password'}
      placeholder={placeholder}
      className='pr-12'
    />
    <button
      type='button'
      className='absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-500 transition hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300'
      aria-label={isVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
      onClick={onToggle}
    >
      {isVisible ? <EyeClosedIcon width={22} height={22} /> : <EyeOpenIcon width={22} height={22} />}
    </button>
  </div>
)

export default PasswordInput
