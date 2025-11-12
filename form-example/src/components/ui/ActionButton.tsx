import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

const ActionButton = ({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
  className={cn(
      'h-14 min-w-[4rem] rounded-lg border border-slate-300 bg-white px-3 text-base font-medium text-slate-900 transition hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-300 disabled:hover:bg-white md:h-[60px] md:min-w-[4.5rem] md:px-4 md:text-lg',
      'focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-200 disabled:focus-visible:ring-0',
      className,
    )}
    {...props}
  />
)

export default ActionButton
