/** @jsxRuntime classic /
 /* @jsx jsx */
import { css, jsx } from '@emotion/react'
import { FC, SyntheticEvent, useMemo, useState, Fragment, useEffect, useCallback } from 'react'
import { CInput } from '../UI/CInput/CInput'
import {
  Box,
  Button,
  Tabs,
  Tab,
  Checkbox,
  Typography,
  FormControlLabel,
  FormControl,
  FormHelperText
} from '@mui/material'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { CLink } from '../UI/CLink/CLink'
import { ICreateUserBody } from '../../types/system.types'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { createUserThunk, resendEmailMessageThunk } from '../../store/slices/system/system.thunks'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useRouter } from 'next/router'
import { useConnected } from '../../hooks/useConnected'
import { CSelect } from '../UI/CCountrySelect/CSelect'
import { useEthers } from '@usedapp/core'


export const CreateFreeAccountForm: FC = () => {
  const [value, setValue] = useState(0)
  const [isUserCreated, setIsUserCreated] = useState<boolean>(false)
  const { isUserLogIn, isError, createUserCode } = useTypedSelector(state => state.system)
  const { connected } = useConnected()
  const { address } = useTypedSelector(state => state.blockchain)

  const router = useRouter()

  useEffect(() => {
    if (isUserLogIn) {
      router.push('/transactions')
    }
    if (connected && address) {
      setFieldValue('address', address)
    }
  }, [isUserLogIn, connected, address])

  const initialValues: ICreateUserBody = useMemo(() => {
    const baseUserCreate: ICreateUserBody = {
      address: '',
      password: '',
      referralId: '',
      termsCheckbox: false
    }
    if (value) {
      baseUserCreate.phone = ''
      baseUserCreate.phoneCode = ''
    } else {
      baseUserCreate.email = ''
    }
    return baseUserCreate
  }, [value])

  const validationSchema = useMemo(() => {
    const yupShape: any = {
      address: yup.string().required('Address is required!'),
      password: yup.string().required('Password is required!').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),
      referralId: yup.number(),
      termsCheckbox: yup.bool().oneOf([true], 'Field must be checked')
    }
    if (value) {
      yupShape.phone = yup.string().required('Phone is required')
      yupShape.phoneCode = yup.string().required('Phone Code is required')
    } else {
      yupShape.email = yup.string().email('Fill correct email address').required('Email is required')
    }
    return yup.object().shape(yupShape)
  }, [value])

  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const createUserBody = {
        ...values
      }
      if (value) {
        createUserBody.phone = `${values.phoneCode}${values.phone}`
        delete createUserBody.phoneCode
        delete createUserBody.email
      }
      delete createUserBody.termsCheckbox

      dispatch(createUserThunk(createUserBody))
      setIsUserCreated(true)
    }
  })
  const { handleChange, handleSubmit, handleBlur, values, setFieldValue, touched, errors, setFieldTouched } = formik


  const handleTabChange = useCallback((event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }, [])


  const handleChangePhoneCode = useCallback((value: string) => {
    setFieldValue('phoneCode', value)
  }, [])

  const handleSubmitForm = useCallback((event) => {
    handleSubmit(event)
    if (value) {
      setFieldTouched('phone')
      setFieldTouched('phoneCode')
    }
  }, [value])


  const { activateBrowserWallet } = useEthers()

  const computedShowCodeToSendEmail = useMemo(() => createUserCode === 409 || (isUserCreated && !isError), [isUserCreated, isError, createUserCode])

  const handleClickResend = useCallback(() => {
    dispatch(resendEmailMessageThunk({ address: values.address, email: values.email }))
  }, [values.address, values.email])

  return <Box>
    {
      computedShowCodeToSendEmail ? <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} mb={2}>
          <Typography my={3} variant={'h4'} css={css`white-space: pre-line;
            text-align: center`}>
            We Sent code to your Email address.
            {'\n'} Please confirm it
          </Typography>
          <Button onClick={handleClickResend}>
            Resend Code to Email
          </Button>
        </Box>
        :
        <Fragment>
          <Box mb={5}>
            <Tabs value={value} onChange={handleTabChange} aria-label="tabs">
              <Tab label="Email" sx={{ width: '50%' }} />
              <Tab label="Telephone" sx={{ width: '50%' }} />
            </Tabs>
          </Box>
          <form onSubmit={handleSubmitForm} action="" css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;

            & > * {
              margin-bottom: 30px;
            }

            &:last-child {
              margin-bottom: 0;
            }
          `}>
            {
              value ?
                <Box display={'flex'} maxWidth={316}>
                  <CSelect selectType={'phone'} value={values.phoneCode} onChange={handleChangePhoneCode}
                           id={'phoneCode'}
                           name={'phoneCode'}
                           label={'Phone Code'}
                           error={touched.phoneCode && !!errors.phoneCode}
                           helperText={touched.phoneCode && errors.phoneCode}
                           sx={{
                                    mr: 1.2
                                  }} />
                  <CInput value={values.phone} onBlur={handleBlur}
                          error={touched.phone && !!errors.phone}
                          helperText={touched.phone && errors.phone}
                          onChange={handleChange} id={'phone'}
                          name={'phone'}
                          label={'Phone'} />
                </Box>
                :
                <CInput value={values.email} onBlur={handleBlur}
                        error={touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                        onChange={handleChange} id={'email'} name={'email'}
                        label={'Email address'} />
            }
            <CInput readonly value={values.address} onBlur={handleBlur}
                    error={touched.address && !!errors.address}
                    helperText={touched.address && errors.address}
                    onChange={handleChange} id={'address'}
                    name={'address'}
                    label={'Address'} />
            <CInput value={values.password} onBlur={handleBlur}
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    onChange={handleChange} id={'password'}
                    type={'password'}
                    name={'password'}
                    label={'Password'} />
            <CInput value={values.referralId} onBlur={handleBlur}
                    error={touched.referralId && !!errors.referralId}
                    helperText={touched.referralId && errors.referralId}
                    onChange={handleChange} id={'referralId'}
                    name={'referralId'} label={'Referral ID (optional)'} />
            <Box>

              <FormControl>
                <FormControlLabel
                  id={'termsCheckbox'} name={'termsCheckbox'}
                  onChange={handleChange} value={values.termsCheckbox}
                  control={<Checkbox />}
                  label={<Typography maxWidth={257} component={'span'}>
                    I have read and agree to {<CLink to={'/'}>Conglomerate terms and conditions</CLink>}
                  </Typography>} />
                {
                  touched.termsCheckbox && <FormHelperText>
                    {
                      errors.termsCheckbox
                    }
                  </FormHelperText>
                }

              </FormControl>

            </Box>

            <div className="d-flex justify-center align-center">
              <Button type={'submit'} css={css`
                transition: all 0.4s;

                &:hover {
                  background: linear-gradient(281.05deg, #A400E1 41.83%, #32EEFF 100%);

                }
              `}>Create an account</Button>
            </div>
          </form>
        </Fragment>

    }
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '&:hover': {
        cursor: 'pointer'
      }
    }}
         onClick={activateBrowserWallet}
    >
      <Typography component={'span'}>
        {'Аlready registered? '}
      </Typography>
      <Typography variant={'subtitle1'} sx={{ color: '#32EEFF', ml: 1 }}>
        Log in
      </Typography>
    </Box>
  </Box>
}
