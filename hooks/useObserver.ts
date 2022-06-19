import { MutableRefObject, useEffect, useRef, useState } from 'react'

interface IUseObserver {
  ref: MutableRefObject<undefined>
  isVisible: boolean
}

export const useObserver = (): IUseObserver => {
  const ref = useRef()

  const [isVisible, setIsVisible] = useState<boolean>(false)
  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting) setIsVisible(true)
    }
    const observer = new IntersectionObserver(callback)
    if (ref.current) observer.observe(ref.current)
  }, [])
  return {
    ref,
    isVisible
  }
}
