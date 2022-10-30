import './DropZone.css'
import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

function DropZone() {
  const [isFiles, setIsFiles] = useState(false)
  const [openProgress, setOpenProgress] = useState(false)
  const [text, setText] = useState('')
  const [changeFile, setChangeFile] = useState(false)
  // const [isUploading, setIsUploading] = useState(false)

  const [filled, setFilled] = useState(0)

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: () => {
      setIsFiles(true)
      setChangeFile(true)
      setFilled(0)
    },
  })

  const handleChange = (e) => {
    const value = e.target.value
    setText(value)
  }

  const Progress = () => {
    setOpenProgress(true)
    setChangeFile(false)
    setText('')
    return <div className="progress-bar" style={{ '--width': filled }} data-label="Uploading..."></div>
  }

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <br />
      {!changeFile && openProgress && <Progress />}
    </li>
  ))

  useEffect(() => {
    let timer = setTimeout(() => {
      setFilled(filled + 1)
    }, 100)

    if (filled === 100) {
      return () => clearTimeout(timer)
    }
    return () => clearTimeout(timer)
  }, [filled])

  return (
    <div className="container">
      <section className="drop-area">
        <h1>Dropzone</h1>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag or drop files here, or click to select files</p>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
          <div className="input-section">
            {isFiles && <input type="text" placeholder="Custodian" value={text} onChange={handleChange}></input>}
            {isFiles && <button onClick={Progress}>Submit</button>}
          </div>
        </aside>
      </section>
    </div>
  )
}

export default DropZone
