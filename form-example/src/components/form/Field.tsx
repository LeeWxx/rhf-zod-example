import { Flex, Text } from '@radix-ui/themes'
import type { ReactNode } from 'react'

type HelperTone = 'gray' | 'amber' | 'green'

interface FieldProps {
  id: string
  label: string
  required?: boolean
  helperText?: string
  helperTone?: HelperTone
  children: ReactNode
}

const Field = ({
  id,
  label,
  required,
  helperText,
  helperTone = 'gray',
  children,
}: FieldProps) => (
  <Flex direction='column' gap='2'>
    <Text asChild weight='medium'>
      <label htmlFor={id} className='inline-flex items-center gap-1'>
        {label}
        {required && (
          <Text asChild size='2' color='ruby'>
            <span>*</span>
          </Text>
        )}
      </label>
    </Text>

    {children}

    {helperText && (
      <Text size='2' color={helperTone}>
        {helperText}
      </Text>
    )}
  </Flex>
)

export type { FieldProps, HelperTone }
export default Field
