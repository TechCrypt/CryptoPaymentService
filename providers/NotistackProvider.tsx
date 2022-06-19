import { FC, useEffect } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useSnackbar } from 'notistack'


export const NotistackProvider: FC = ({ children }) => {
  const { notifications } = useTypedSelector(state => state.notifications)
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    notifications.forEach(({ message, variant }, i) => {
      enqueueSnackbar(message, {
        variant: variant,
        key: message + i
      })
    })
  }, [notifications])

  return <>
    {children}
  </>
}
