import {FC, useEffect, useState} from 'react'
import {createPortal} from 'react-dom'

interface IProps {
}


export const Portal = ({children}) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        return () => setMounted(false)
    }, [])

    return mounted
        ? createPortal(children,
            document.querySelector('#my-portal'))
        : null
}
