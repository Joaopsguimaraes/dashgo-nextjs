/* eslint-disable react/react-in-jsx-scope */
import { Button, Flex, Stack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../components/Form/Input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type SignInFormData = {
  email: string;
  password: string;
};

function SignIn() {
  const signInFormSchema = yup.object().shape({
    email: yup.string().required('Email obrigatório').email('Email inválido'),
    password: yup
      .string()
      .required('Senha obrigatória')
      .min(8, 'Senha deve ter no mínimo 8 caracteres')
  }); // Criando um schema para o formulário e validações usando o yup

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema) //passando o schema para o resolver a validação do formulário
  });

  const { errors } = formState;
  //extraindo o errors do formulário do formState;

  const handleSignIn: SubmitHandler<SignInFormData> = (data) => {
    console.log(data);
  };

  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input type="email" label="Email" error={errors.email} {...register('email')} />
          <Input
            type="password"
            label="Password"
            error={errors.password} 
            //extraindo o error do input

            {...register('password')} 
            //utilizando o register para registrar o input no submit
          />
          <Button
            type="submit"
            marginTop="6"
            colorScheme="pink"
            size="lg"
            isLoading={formState.isSubmitting} 
            //passando o isSubmitting para o loading do formulário
          >
            Entrar
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
}

export default SignIn;
