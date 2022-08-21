/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/react-in-jsx-scope */
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Text,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  Spinner,
  IconButton,
  Link
} from '@chakra-ui/react';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { RiAddLine, RiLoader2Line } from 'react-icons/ri';
import { Pagination } from '../../components/Pagination';
import NextLink from 'next/link';
import { useUsers, IUsers } from '../../services/hooks/useUsers';
import { useState } from 'react';
import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api';
import { GetServerSideProps } from 'next';

export default function UserList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error, refetch } = useUsers(page);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  async function handlePrefetchUser(userId: number) {
    await queryClient.prefetchQuery(
      ['user', userId],
      async () => {
        const response = await api.get(`users/${userId}`);

        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10 //10 minutos de cash
      }
    );
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justifyContent="space-between" alignItems="center">
            <Heading size="lg" fontWeight="normal">
              Usuarios
              {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml={4} />}
            </Heading>
            <Flex gap={2}>
              <IconButton
                aria-label="Recarregar Lista de usuarios"
                icon={<RiLoader2Line fontSize="18" />}
                cursor="pointer"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                onClick={() => refetch()}
                //Utilizando o refetch para recarregar a lista de usuarios
              />
              <NextLink href="/users/create" passHref>
                <Button
                  cursor="pointer"
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="pink"
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Criar Novo
                </Button>
              </NextLink>
            </Flex>
          </Flex>
          {isLoading ? (
            //criando um ternario para verificar se está carregando a lista de usuarios;
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? ( //se ocorrer um erro no carregamento, mostra o erro
            <Flex justify="center">
              <Text>Fail to obtain data from user</Text>
            </Flex>
          ) : (
            //se não ocorrer erro,e terminar o carregamento mostra a lista de usuarios
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={['4', '4', '6']} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de Cadastro</Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.users.map((user: IUsers) => (
                    <Tr key={user.id}>
                      <Td px={['4', '4', '6']}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Link color="purple.400" onClick={() => handlePrefetchUser(user.id)}>
                            <Text fontWeight="bold">{user.name}</Text>
                          </Link>
                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && (
                        <Td>
                          <Text>{user.createdAt}</Text>
                        </Td>
                      )}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
