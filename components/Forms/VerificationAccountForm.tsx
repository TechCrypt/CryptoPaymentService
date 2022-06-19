/** @jsxRuntime classic /
 /* @jsx jsx */
import { FC, Fragment, useCallback, useRef, useState } from 'react'
import { css, jsx } from '@emotion/react'
import { CInput } from '../UI/CInput/CInput'
import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { DesktopDatePicker } from '@mui/lab'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IUpdateUserBody } from '../../types/system.types'
import { CFileUpload } from '../UI/CFileUpload/CFileUpload'
import { Swiper as SwiperClass } from 'swiper/types'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { updateUserThunk } from '../../store/slices/system/system.thunks'
import { CSelect } from '../UI/CCountrySelect/CSelect'
import ReactInputMask from 'react-input-mask'


interface IProps {
  isTokenValid: boolean;
  code: string;
  token: string;
}

const validationSchema = yup.object().shape({
  country: yup.string().required('Citizenship is required!'),
  name: yup.string().required('First name is required!'),
  surname: yup.string().required('Second name is required!'),
  middle: yup.string().required('Middle name ID is required!'),
  birthDate: yup.date().required('Date of Birth is required!'),
  street: yup.string().required('street is required!'),
  index: yup.number(),
  city: yup.string().required('street is required!'),
  phone: yup.number().required('Phone Number is Required!'),
  photo: yup.mixed().required('Upload Your Passport Photo')
})

const initialValues: IUpdateUserBody = {
  country: '',
  name: '',
  surname: '',
  middle: '',
  birthDate: '',
  street: '',
  index: '',
  city: '',
  phone: '',
  photo: ''
}


const firstPersonalInformationFields: string[] = ['country', 'name', 'surname', 'middle', 'birthDate']
const secondPersonalInformationFields: string[] = ['street', 'city', 'phone']

export const VerificationAccountForm: FC<IProps> = ({ isTokenValid, token, code }) => {

  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      dispatch(updateUserThunk(
        {
          ...values,
          token: token,
          code: code,
          passportId: '1223423'
        }
      ))
    }
  })

  const {
    handleChange,
    handleBlur,
    values,
    setFieldValue,
    setFieldTouched,
    submitForm
  } = formik

  const handleSelectChange = useCallback((value: string) => {
    setFieldValue('country', value)
  }, [])

  const [formStep, setFormStep] = useState<number>(0)
  const swiperRef = useRef(null)
  const handleProceedButton = useCallback(() => {
    if (formStep === 0) {
      Promise.all(firstPersonalInformationFields.map(fieldName => setFieldTouched(fieldName)) as Array<Promise<never>>).then(res => {
        const isValid = firstPersonalInformationFields.every(fieldName => !res[4][fieldName])
        if (isValid && swiperRef) {
          swiperRef?.current.swiper?.slideNext()
          setFormStep(1)
        }
      })
    } else if (formStep === 1) {
      Promise.all(secondPersonalInformationFields.map(fieldName => setFieldTouched(fieldName)) as Array<Promise<never>>).then(res => {
        const isValid = secondPersonalInformationFields.every(fieldName => !res[2][fieldName])
        if (isValid && swiperRef) {
          swiperRef.current.swiper!.slideNext()
          setFormStep(2)
        }
      })
    } else {
      submitForm()
    }
  }, [formStep])

  const handleFormBackButton = useCallback(() => {
    setFormStep(formStep => formStep - 1)
    if (swiperRef) swiperRef?.current.swiper?.slidePrev()
  }, [formStep])

  return <Box css={css`max-width: 410px`}>
    {
      isTokenValid ?
        <Fragment>
          <Box mb={5} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}
               css={css`
                 position: relative;

                 &::after {
                   content: '';
                   display: block;
                   width: 100%;
                   height: 1px;
                   background: #2C4152;
                   margin-top: 18px;
                 }
               `}>
            {
              formStep !== 0 && <IconButton onClick={handleFormBackButton} css={css`
                position: absolute;
                width: 40px;
                height: 40px;
                left: 0;
                top: -5px;
              `}>
                <ArrowBackIcon />
              </IconButton>
            }
            <Typography variant={'h5'}>
              Personal information
            </Typography>
          </Box>
          <form action="" css={css`
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
            <Grid container>

              <Swiper
                onInit={(core: SwiperClass) => {
                  swiperRef.current = core.el
                }}
                preventInteractionOnTransition={true}>
                <SwiperSlide>
                  <Fragment>
                    <Grid item sm={12} md={12} lg={12} xl={12} css={css`margin-bottom: 30px;`}>
                      {
                        values.country
                      }
                      <CSelect value={values.country} onChange={handleSelectChange}
                               id={'country'} name={'country'}
                               error={formik.touched.country && Boolean(formik.errors.country)}
                               helperText={formik.touched.country && formik.errors.country}
                               selectType={'country'} label={'Citizenship'} />
                    </Grid>
                    <Grid container item spacing={4}>
                      <Grid item sm={12} md={12} lg={6} xl={6}>
                        <CInput value={values.name} onBlur={handleBlur}
                                onChange={handleChange} id={'name'}
                                name={'name'} label={'First Name'}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                        />
                      </Grid>
                      <Grid item sm={12} md={12} lg={4} xl={6}>
                        <CInput value={values.surname} onBlur={handleBlur}
                                onChange={handleChange} id={'surname'}
                                name={'surname'} label={'Second Name'}
                                error={formik.touched.surname && Boolean(formik.errors.surname)}
                                helperText={formik.touched.surname && formik.errors.surname}
                        />
                      </Grid>

                      <Grid item sm={12} md={12} lg={6} xl={6}>
                        <CInput value={values.middle} onBlur={handleBlur}
                                onChange={handleChange} id={'middle'}
                                name={'middle'} label={'Middle'}
                                error={formik.touched.middle && Boolean(formik.errors.middle)}
                                helperText={formik.touched.middle && formik.errors.middle}
                        />
                      </Grid>
                      <Grid item sm={12} md={12} lg={4} xl={6}>
                        <Box>
                          <Typography component={'label'}>
                            Date Birth
                          </Typography>
                          <Box css={css`margin-top: 15px;`}>
                            <DesktopDatePicker
                              onChange={value => setFieldValue('birthDate', value)}
                              value={values.birthDate}
                              inputFormat="MM/DD/YYYY"
                              renderInput={(params) =>
                                <TextField id={'birthDate'} name={'birthDate'}
                                           value={values.birthDate} {...params}
                                           error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
                                           helperText={formik.touched.birthDate && formik.errors.birthDate}
                                />}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Fragment>

                </SwiperSlide>
                <SwiperSlide>
                  <Fragment>
                    <Grid item sm={12} md={12} lg={12} xl={12}>
                      <CInput value={values.street} onBlur={handleBlur}
                              onChange={handleChange} id={'street'}
                              name={'street'} label={'Street'}
                              error={formik.touched.street && Boolean(formik.errors.street)}
                              helperText={formik.touched.street && formik.errors.street}
                      />
                    </Grid>
                    <Grid css={css`margin-top: 0;
                      margin-bottom: 30px`} container item spacing={4}>
                      <Grid item sm={12} md={12} lg={6} xl={6}>
                        <CInput value={values.index} onBlur={handleBlur}
                                onChange={handleChange} id={'index'}
                                name={'index'} label={'Index'}
                                error={formik.touched.index && Boolean(formik.errors.index)}
                                helperText={formik.touched.index && formik.errors.index}
                        />
                      </Grid>
                      <Grid item sm={12} md={12} lg={4} xl={6}>
                        <CInput value={values.city} onBlur={handleBlur}
                                onChange={handleChange} id={'city'}
                                name={'city'} label={'City'}
                                error={formik.touched.city && Boolean(formik.errors.city)}
                                helperText={formik.touched.city && formik.errors.city}
                        />
                      </Grid>
                    </Grid>
                    <Grid item sm={12} md={12} lg={12} xl={12}>

                      <ReactInputMask mask="+7 (999) 999 99 99"
                                      value={values.phone}
                                      disabled={false}
                                      onChange={(e) => setFieldValue('phone', e.target.value)}
                      >
                        {() => <TextField
                          error={formik.touched.phone && Boolean(formik.errors.phone)}
                          helperText={formik.touched.phone && formik.errors.phone}
                        />}
                      </ReactInputMask>
                    </Grid>
                  </Fragment>
                </SwiperSlide>

                <SwiperSlide>
                  <h1>Photo input</h1>
                  <CFileUpload label={'Take a photo of your ID'} placeholder={'Passport or ID card'}
                               name={'photo'} value={values.photo} onChange={(file) => setFieldValue('photo', file)} />
                </SwiperSlide>

              </Swiper>
            </Grid>
            <div className="d-flex justify-center align-center">
              <Button onClick={handleProceedButton}>proceed</Button>
            </div>
          </form>
          <Box display={'flex'} justifyContent={'center'}>
            <Typography css={css`
              display: flex;

              &::before {
                content: '';
                display: inline-block;
                height: 20px;
                width: 20px;
                background: url("/assets/img/lock.svg") no-repeat center;
                margin-right: 10px;
              }
            `} component={'span'}>
              This information is only used for personal verification only, and confidentional by Conglomerate
            </Typography>
          </Box>
        </Fragment>
        : <Box>
          <Typography my={3} variant={'h2'} css={css`white-space: pre-line;
            text-align: center`}>
            Token Is Invalid!
          </Typography>
        </Box>
    }
  </Box>
}
