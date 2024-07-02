import { readFiles, updateFile, uploadFiles } from '@directus/sdk'
import { filesize } from 'filesize'

type FileInputOptions = {
  userId: string
  fileTitle: string
  maxFileSize: number
  acceptedFileTypes: string[]
  onFileUploaded: (fileId: string) => void
}

export const useFileInput = (options: FileInputOptions) => {
  const fileError = ref<string>()

  async function onFileChanged(files: FileList) {
    fileError.value = undefined // reset the error when file changed

    if (files.length == 0) return

    const file = files[0] // only handle one file

    if (file.size > options.maxFileSize) {
      fileError.value = `File size is too large: ${filesize(file.size, { round: 0 })}`
      return
    }

    if (!options.acceptedFileTypes.includes(file.type)) {
      fileError.value = `File type is not supported: ${file.type}`
      return
    }

    try {
      const userFiles = await directus.request(readFiles({
        filter: { _and: [
          { title: { _eq: options.fileTitle } },
          { uploaded_by: { _eq: options.userId } },
        ] },
      }))

      const formData = new FormData()
      formData.append('title', options.fileTitle)
      formData.append('file', file)

      let fileData
      if (userFiles.length > 0) {
        fileData = await directus.request(updateFile(userFiles[0].id, formData))
      }
      else {
        fileData = await directus.request(uploadFiles(formData))
      }

      options.onFileUploaded(fileData.id)
    }
    catch (error) {
      fileError.value = directusErrorMessage(error)
    }
  }

  return { fileError, onFileChanged }
}
