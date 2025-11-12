import { useState } from 'react'
import { Theme, Card, Flex, Heading, Separator, Box } from '@radix-ui/themes'
import { z } from 'zod'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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

const requiredAgreement = (message: string) =>
  z.boolean().refine((value) => value, { message })

const agreementsSchema = z.object({
  agreeAll: z.boolean(),
  terms: requiredAgreement('서비스 이용약관에 동의해 주세요'),
  privacy: requiredAgreement('개인정보 처리방침에 동의해 주세요'),
  marketing: z.boolean(),
})

const signUpSchema = z
  .object({
    companyName: z.string().min(1, '업체명을 입력해 주세요'),
    email: z.string().email('유효한 이메일 주소를 입력해 주세요'),
    verificationCode: z
      .string()
      .min(6, '6자리 인증번호를 입력해 주세요')
      .max(6, '6자리 인증번호를 입력해 주세요'),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
        '영문, 숫자, 특수기호를 포함해 8자리 이상 입력해 주세요',
      ),
    confirmPassword: z.string(),
    phoneNumber: z
      .string()
      .regex(/^\d{3}-\d{4}-\d{4}$/, '010-1234-5678 형식으로 입력해 주세요'),
    agreements: agreementsSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다',
  })

type SignUpForm = z.infer<typeof signUpSchema>

function App() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  const methods = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    criteriaMode: 'all',
    shouldUseNativeValidation: false,
    defaultValues: {
      companyName: '',
      email: '',
      verificationCode: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      agreements: {
        agreeAll: false,
        terms: false,
        privacy: false,
        marketing: false,
      },
    },
  })

  const { handleSubmit } = methods

  const onSubmit = (data: SignUpForm) => {
    console.log('signUpForm data', data)
  }

  return (
    <Theme accentColor='blue' grayColor='slate' radius='large' scaling='100%'>
      <FormProvider {...methods}>
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

                <form className='space-y-7' onSubmit={handleSubmit(onSubmit)} noValidate>
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
      </FormProvider>
    </Theme>
  )
}

export default App
