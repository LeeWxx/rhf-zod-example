import type { InputHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

const TextInput = ({
  className,
  type = 'text',
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    type={type}
    className={cn(
      'h-14 w-full rounded-lg border border-slate-300 bg-white px-4 text-base text-slate-900 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-200 md:h-[60px] md:px-5 md:text-lg',
      className,
    )}
    {...props}
  />
)

export default TextInput
