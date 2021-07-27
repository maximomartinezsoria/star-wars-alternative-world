import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@apollo/client'
import Modal from './Modal'
import Input from '../forms/Input'
import Form from '../forms/Form'
import CREATE_CHARACTER from '../../mutations/createCharacter'
import GET_CHARACTERS from '../../queries/getCharacters'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'

export default function CharacterFormModal() {
  const history = useHistory()
  const [createCharacter, { loading, error: mutationError }] = useMutation(
    CREATE_CHARACTER,
    {
      refetchQueries: [{ query: GET_CHARACTERS, variables: { pageSize: 12 } }],
    }
  )
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      pictureUrl: '',
      name: '',
      description: '',
      bornAt: '',
      planet: '',
    },
    resolver: yupResolver(
      yup.object().shape({
        pictureUrl: yup.string().required(),
        name: yup.string().required().max(20),
        description: yup.string().required().min(15).max(300),
        bornAt: yup.date().required(),
        planet: yup
          .string()
          .required()
          .matches(
            /^[A-Z]{2}-[A-Z]{3}-[0-9]{2}$/,
            'Planet code must match the following format: AA-AAA-11'
          ),
      })
    ),
  })

  useEffect(() => {
    const queryParams = new URLSearchParams(history.location.search)
    const planetCode = queryParams.get('planet')
    setValue('planet', planetCode || '')
  }, [setValue, history])

  const closeForm = () => {
    history.push('/characters')
  }

  const onSubmit = async (characterInfo) => {
    await createCharacter({
      variables: {
        characterInfo: {
          ...characterInfo,
          bornAt: characterInfo.bornAt.toISOString().slice(0, 10),
        },
      },
    }).catch(console.error)
    if (mutationError) return
    resetForm()
    closeForm()
  }

  return (
    <Modal onClose={closeForm} title="Character">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        cancelButton={{ label: 'Cancel', onClick: closeForm }}
        submitButtonLabel="Create Character"
        mutationFailed={!!mutationError}
        mutationLoading={loading}
      >
        <Input
          name="pictureUrl"
          type="text"
          label="Image"
          caption="Paste the URL of a JPG or PNG of max 20 kb"
          error={errors.pictureUrl?.message}
          {...register('pictureUrl')}
        />

        <Input
          name="bornAt"
          type="date"
          label="Born At"
          error={errors.name?.bornAt}
          {...register('bornAt')}
        />
        <Input
          name="planet"
          type="text"
          label="Planet Code"
          error={errors.name?.planet}
          {...register('planet')}
        />
        <Input
          name="name"
          type="text"
          label="Name"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          name="description"
          type="textarea"
          label="Description"
          error={errors.description?.message}
          {...register('description')}
        />
      </Form>
    </Modal>
  )
}
