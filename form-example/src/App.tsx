import { useState } from 'react'
import type { FormEvent } from 'react'
import { Theme, Card, Flex, Heading, Separator, Box } from '@radix-ui/themes'

import TextInput from './components/ui/TextInput'
import ActionButton from './components/ui/ActionButton'
import PrimaryButton from './components/ui/PrimaryButton'
import Field from './components/form/Field'
import AgreementRow from './components/form/AgreementRow'
import PasswordInput from './components/form/PasswordInput'

const FIELD_IDS = {
  name: 'companyName',
  email: 'email',
  verificationCode: 'verificationCode',
  password: 'password',
  confirmPassword: 'confirmPassword',
  phoneNumber: 'phoneNumber',
} as const

const AGREEMENT_ITEMS = [
  { name: 'terms', label: '서비스 이용약관 동의', badge: '필수' as const },
  { name: 'privacy', label: '개인정보 처리방침 동의', badge: '필수' as const },
  { name: 'marketing', label: '마케팅 정보 수신 동의', badge: '선택' as const },
]

function App() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <Theme accentColor='blue' grayColor='slate' radius='large' scaling='100%'>
      <Box className='min-h-screen bg-slate-100'>
        <Flex align='center' justify='center' className='min-h-screen px-4 py-10'>
          <Card
            size='5'
            className='w-full max-w-2xl border border-slate-200 shadow-[0_30px_80px_rgba(15,23,42,0.12)]'
          >
            <Flex direction='column' gap='7'>
              <Heading align='center' size='7'>
                이메일로 회원가입
              </Heading>

              <form className='space-y-7' onSubmit={handleSubmit}>
                <div className='space-y-6'>
                  <Field id={FIELD_IDS.name} label='업체명' required>
                    <TextInput
                      id={FIELD_IDS.name}
                      name='companyName'
                      placeholder='Ex) Crusia'
                    />
                  </Field>

                  <Field id={FIELD_IDS.email} label='이메일' required>
                    <div className='flex flex-col gap-3 md:flex-row md:items-stretch'>
                      <TextInput
                        id={FIELD_IDS.email}
                        name='email'
                        type='email'
                        placeholder='example@Crusia.kr'
                        className='flex-1 md:flex-[1.8]'
                      />
                      <ActionButton disabled type='button' className='w-full md:w-auto'>
                        전송
                      </ActionButton>
                    </div>
                  </Field>

                  <Field id={FIELD_IDS.verificationCode} label='인증번호' required>
                    <div className='flex flex-col gap-3 md:flex-row md:items-stretch'>
                      <TextInput
                        id={FIELD_IDS.verificationCode}
                        name='verificationCode'
                        inputMode='numeric'
                        placeholder='인증번호를 입력해 주세요'
                        className='flex-1 md:flex-[1.8]'
                      />
                      <ActionButton disabled type='button' className='w-full md:w-auto'>
                        완료
                      </ActionButton>
                    </div>
                  </Field>

                  <Field
                    id={FIELD_IDS.password}
                    label='비밀번호'
                    required
                    helperTone='amber'
                  >
                    <PasswordInput
                      id={FIELD_IDS.password}
                      name='password'
                      placeholder='영문, 숫자, 특수기호 포함 8자리 이상'
                      isVisible={passwordVisible}
                      onToggle={() => setPasswordVisible((prev) => !prev)}
                    />
                  </Field>

                  <Field
                    id={FIELD_IDS.confirmPassword}
                    label='비밀번호 확인'
                    required
                    helperTone='amber'
                  >
                    <PasswordInput
                      id={FIELD_IDS.confirmPassword}
                      name='confirmPassword'
                      placeholder='비밀번호를 한번 더 입력해 주세요'
                      isVisible={confirmPasswordVisible}
                      onToggle={() => setConfirmPasswordVisible((prev) => !prev)}
                    />
                  </Field>

                  <Field id={FIELD_IDS.phoneNumber} label='전화번호' required helperTone='gray'>
                    <TextInput
                      id={FIELD_IDS.phoneNumber}
                      name='phoneNumber'
                      inputMode='tel'
                      placeholder='010-1234-5678'
                      maxLength={13}
                    />
                  </Field>
                </div>

                <Separator size='4' />

                <div className='space-y-3'>
                  <AgreementRow
                    name='agreeAll'
                    label='약관 전체 동의'  
                    className='border border-slate-200 bg-slate-50'
                  />
                  {AGREEMENT_ITEMS.map(({ name, label, badge }) => (
                    <AgreementRow key={name} name={name} label={label} badge={badge} />
                  ))}
                </div>

                <PrimaryButton type='submit' disabled>회원가입</PrimaryButton>
              </form>
            </Flex>
          </Card>
        </Flex>
      </Box>
    </Theme>
  )
}

export default App
