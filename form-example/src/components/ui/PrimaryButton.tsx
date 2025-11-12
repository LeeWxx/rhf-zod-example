import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

const PrimaryButton = ({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={cn(
      'flex h-[60px] w-full items-center justify-center rounded-lg bg-slate-900 text-lg font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:text-slate-200 disabled:hover:bg-slate-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-300 disabled:focus-visible:ring-0',
      className,
    )}
    {...props}
  />
)

export default PrimaryButton
