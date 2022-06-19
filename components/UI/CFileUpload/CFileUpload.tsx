/** @jsxRuntime classic /
 /** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { FC, useState, DragEvent, useLayoutEffect, useRef, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Theme } from '../../../styles/theme/theme'
import classNames from 'classnames'

interface IProps {
  label: string,
  placeholder: string,
  name: string,
  value: any,
  onChange: (file: any) => any
}

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    ...theme.mixins['size']('100%'),
    ...theme.mixins['flexCenter'],
    border: '1px solid #2C4152',
    borderRadius: 4,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  active: {
    border: '4px dashed #32eeff'
  },
  hidden: {
    display: 'none !important'
  }
}))

export const CFileUpload: FC<IProps> = ({ label, placeholder, name, value, onChange }) => {
  const classes = useStyles()
  const [isDragEnter, setIsDragEnter] = useState<boolean>(false)

  const imgRef = useRef<HTMLImageElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (event: DragEvent<HTMLInputElement>) => {
    setIsDragEnter(true)
    event.preventDefault()
  }

  const handleDragLeave = (event: DragEvent<HTMLInputElement>) => {
    setIsDragEnter(false)
    event.preventDefault()
  }
  const handleInputClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener('change', (event) => {
        onChange(event.target!['files'][0]!)
      })
    }
  }, [inputRef])

  const handleDrop = (event: DragEvent<HTMLInputElement>) => {
    event.preventDefault()
    setIsDragEnter(false)
    if (event.dataTransfer.files[0]) {
      onChange(event.dataTransfer.files[0])
    }
  }

  useLayoutEffect(() => {
    if (value) {
      const fr = new FileReader()
      fr.onload = () => {
        if (imgRef.current) {
          imgRef.current.src = fr.result as string
        }
      }
      fr.readAsDataURL(value)
    }
  }, [value])

  return <Box
    onClick={handleInputClick}
    css={css`
      width: 200px;
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
    `}
  >
    <Box
      className={classNames(classes.input, {
        [classes.active]: isDragEnter,
        [classes.hidden]: value
      })}
      onDragEnter={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}>
      <label style={{ color: '#758B9D' }} htmlFor={name}>{label}</label>
      <input style={{ display: 'none' }}
             name={name} id={name}
             placeholder={placeholder}
             ref={inputRef}
             type={'file'}>
      </input>
    </Box>
    <Box hidden={!value}>
      <img css={css`width: 100%; height: 100%`} ref={imgRef} alt={name} />
      <Button css={css`width: 130px; height: 100%`} onClick={handleInputClick}>
        Change Photo
      </Button>
    </Box>
  </Box>
}
