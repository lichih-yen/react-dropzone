import { useState, useEffect, memo } from 'react'

import './ProgressBar.css'

const ProgressBar = ({ fileSize }) => {
  const [filled, setFilled] = useState(0)
  const [isDone, setIsDone] = useState('Uploading...')

  useEffect(() => {
    const time = fileSize < 200000 ? 20 : fileSize > 1000000 ? 200 : 100

    let timer = setTimeout(() => {
      setFilled(filled + 1)
    }, time)

    if (filled === 100) {
      setIsDone('Done')
      clearTimeout(timer)
    }

    return () => clearTimeout(timer)
  }, [filled, fileSize])

  return <div className="progress-bar" style={{ '--width': filled }} data-label={isDone}></div>
}

export default memo(ProgressBar)
