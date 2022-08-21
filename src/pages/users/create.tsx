/* eslint-disable react/react-in-jsx-scope */
import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { resolve } from 'path';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar/';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('Email obrigatório').email('Email inválido'),
  password: yup
    .string()
    .required('Senha obrigatório')
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
  passwordConfirmation: yup.string().oneOf([null, yup.ref('password')], 'Senhas não conferem')
  //referenciado o password para o passwordConfirmation com o oneOf
});

export default function CreateUser() {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  });

  const { errors } = formState;

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post('users', {
        user: {
          ...user,
          created_at: new Date()
        }
      });

      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
      }
    }
  );

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await createUser.mutateAsync(values);

    router.push('/users');
  };
  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box
          as="form"
          onSubmit={handleSubmit(handleCreateUser)}
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={['6', '8']}
        >
          <Heading size="lg" fontWeight="normal">
            Criar Usuario
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input label="Nome Completo" {...register('name')} error={errors.name} />
              <Input type="email" label="email" {...register('email')} error={errors.name} />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                type="password"
                label="Senha"
                {...register('password')}
                error={errors.password}
              />
              <Input
                type="password"
                label="Confirmação da senha"
                {...register('passwordConfirmation')}
                error={errors.passwordConfirmation}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justifyContent="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
