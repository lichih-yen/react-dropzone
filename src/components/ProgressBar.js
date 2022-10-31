import { useState, useEffect, memo } from 'react'

import './ProgressBar.css'

const ProgressBar = ({ fileSize }) => {
  const [filled, setFilled] = useState(0)
  const [isDone, setIsDone] = useState('UPLOADING...')

  useEffect(() => {
    const time = fileSize < 200000 ? 20 : fileSize > 500000 ? 200 : 100

    let timer = setTimeout(() => {
      setFilled(filled + 1)
    }, time)

    if (filled === 100) {
      setIsDone('DONE!')
      clearTimeout(timer)
    }

    return () => clearTimeout(timer)
  }, [filled, fileSize])

  return <div className="progress-bar" style={{ '--width': filled }} data-label={isDone}></div>
}

export default memo(ProgressBar)
