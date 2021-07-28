import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@apollo/client'
import Modal from './Modal'
import Input from '../forms/Input'
import Form from '../forms/Form'
import CREATE_PLANET from '../../mutations/createPlanet'
import GET_PLANETS from '../../queries/getPlanets'
import { useHistory } from 'react-router-dom'
import Emitter from '../../lib/eventEmitter'

export default function PlanetFormModal() {
  const history = useHistory()
  const [createPlanet, { loading, error: mutationError }] = useMutation(
    CREATE_PLANET,
    {
      refetchQueries: [{ query: GET_PLANETS, variables: { pageSize: 12 } }],
      awaitRefetchQueries: true,
    }
  )
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pictureUrl: '',
      name: '',
      code: '',
      description: '',
    },
    resolver: yupResolver(
      yup.object().shape({
        pictureUrl: yup.string().required(),
        name: yup.string().required().max(20),
        code: yup
          .string()
          .required()
          .matches(
            /^[A-Z]{2}-[A-Z]{3}-[0-9]{2}$/,
            'Code must match the following format: AA-AAA-11'
          ),
        description: yup.string().required().min(15).max(300),
      })
    ),
  })

  const closeForm = () => {
    history.push('/')
  }

  const onSubmit = async (planetInfo) => {
    const newPlanet = await createPlanet({ variables: { planetInfo } }).catch(
      console.error
    )
    if (mutationError) return
    resetForm()
    Emitter.emit('NEW_PLANET', newPlanet?.data?.createPlanet.id)
    closeForm()
  }

  return (
    <Modal onClose={closeForm} title="Planet">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        cancelButton={{ label: 'Cancel', onClick: closeForm }}
        submitButtonLabel="Create Planet"
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
          name="name"
          type="text"
          label="Name"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          name="code"
          type="text"
          label="Code"
          error={errors.code?.message}
          {...register('code')}
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
