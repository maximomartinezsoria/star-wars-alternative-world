import * as yup from 'yup'
import styled from 'styled-components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import Form from '../components/forms/Form'
import Input from '../components/forms/Input'
import Layout from '../components/Layout'
import { Store } from '../store'
import { useMutation } from '@apollo/client'
import LOGIN from '../mutations/login'

const LoginStyles = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 5rem;
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`

export default function Login() {
  const { logIn } = useContext(Store)
  const history = useHistory()
  const [loginMutation, { loading, error: mutationError }] = useMutation(LOGIN)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(
      yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
      })
    ),
  })

  const onSubmit = async (userInfo) => {
    try {
      const data = await loginMutation({ variables: { userInfo } })
      if (mutationError) return
      logIn(data?.data.login)
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout showNavigation={false}>
      <LoginStyles>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          submitButtonLabel="Login"
          mutationFailed={!!mutationError}
          mutationLoading={loading}
          className="LoginForm"
          errorMessage="Bummer! We can’t log you in right now. Probably a black hole in the way. Try later please."
        >
          <Input
            name="username"
            type="text"
            label="Username"
            error={errors.username?.message}
            className="LoginForm__username"
            {...register('username')}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            error={errors.password?.message}
            className="LoginForm__password"
            {...register('password')}
          />
        </Form>
      </LoginStyles>
    </Layout>
  )
}
