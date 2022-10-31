import { useState } from 'react'
import './DropZone.css'
import { useDropzone } from 'react-dropzone'
import ProgressBar from './ProgressBar'

function DropZone() {
  const [isFiles, setIsFiles] = useState(false)
  const [openProgress, setOpenProgress] = useState(false)
  const [text, setText] = useState('')
  const [changeFile, setChangeFile] = useState(false)

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: () => {
      setIsFiles(true)
      setChangeFile(true)
    },
  })

  const onSubmit = () => {
    setOpenProgress(true)
    setChangeFile(false)
    setText('')
  }

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
          <ul>
            {acceptedFiles.map((file) => (
              <li key={file.path}>
                {file.path} - {file.size} bytes
                <br />
                {!changeFile && openProgress && <ProgressBar fileSize={file.size} />}
              </li>
            ))}
          </ul>
          <div className="input-section">
            {isFiles && (
              <input type="text" placeholder="Custodian" value={text} onChange={(e) => setText(e.target.value)}></input>
            )}
            {isFiles && <button onClick={onSubmit}>Submit</button>}
          </div>
        </aside>
      </section>
    </div>
  )
}

export default DropZone
