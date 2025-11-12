import { Flex, Text, Checkbox, Badge } from '@radix-ui/themes'
import { cn } from '../../utils/cn'

interface AgreementRowProps {
  name: string
  label: string
  badge?: '필수' | '선택'
  className?: string
}

const AgreementRow = ({ name, label, badge, className }: AgreementRowProps) => (
  <Flex
    align='center'
    justify='between'
    gap='4'
    className={cn('rounded-2xl px-3 py-3', className)}
  >
    <Flex asChild align='center' gap='3'>
      <label>
        <Checkbox
          name={name}
          size='3'
          defaultChecked={false}
          className='!h-9 !w-9 md:!h-10 md:!w-10'
        />
        <Flex align='center' gap='2'>
          <Text>{label}</Text>
          {badge && (
            <Badge color={badge === '필수' ? 'blue' : 'gray'}>{badge}</Badge>
          )}
        </Flex>
      </label>
    </Flex>
  </Flex>
)

export default AgreementRow
