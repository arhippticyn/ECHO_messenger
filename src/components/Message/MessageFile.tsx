import { useForm } from 'react-hook-form'
import { useTypificatedDispatch } from '../../hooks/reduxHooks'
import { UploadFileMessage } from '../../redux/Message/MessageOperation'
import { useParams } from 'react-router-dom'

interface FormValues {
  file: FileList
}

const MessageFile = ({}) => {
  const dispatch = useTypificatedDispatch()
  const { chatId } = useParams<{ chatId: string }>()

  const { register, handleSubmit, reset } = useForm<FormValues>({
    mode: 'onSubmit',
  })

  const onSubmit = (data: FormValues) => {
    if (data.file && data.file.length > 0) {
      const fileToUpload = data.file[0] 

      const formData = new FormData()
      formData.append('file', fileToUpload) 
      
      dispatch(UploadFileMessage({ 
        chat_id: Number(chatId), 
        file: formData 
      }))
      
      reset() 
    }
  }
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <input {...register('file', {required: true})} type="file" accept="image/*" />
      <button type="submit">send</button>
    </form>
  )
}

export default MessageFile
