import { useForm } from 'react-hook-form'
import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../../hooks/reduxHooks'
import { selectPatchMessageId } from '../../redux/Message/MessageSelectors'
import { PatchMessage } from '../../redux/Message/MessageOperation'
import { useParams } from 'react-router-dom'
import { SelectMessageId } from '../../redux/Message/MessageSlice'

interface FormValues {
  new_content: string
}

const MessagePatch = ({}) => {
  const dispatch = useTypificatedDispatch()
  const { chatId } = useParams<{ chatId: string }>()
  const patchId = useTypificatedSelector(selectPatchMessageId)

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { new_content: '' },
  })

  if (!patchId) return null

  const onSubmit = (data: FormValues) => {
    dispatch(
      PatchMessage({
        chat_id: Number(chatId),
        id: Number(patchId),
        new_content: data.new_content,
      })
    )
    dispatch(SelectMessageId(null))
    reset()
  }
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <input {...register('new_content')} type="text" />

      <button type="submit">patch</button>
    </form>
  )
}

export default MessagePatch
