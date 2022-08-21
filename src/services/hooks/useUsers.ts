import { useQuery } from 'react-query';
import { api } from '../api';

export type IUsers = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

type GetUsersResponse = {
  totalCount: number;
  users: IUsers[];
};

async function getUsers(page: number): Promise<GetUsersResponse> {
  //buscando dados do usuário da api axios
  const { data, headers } = await api.get('users', {
    params: {
      page
    }
  });

  const totalCount = Number(headers['x-total-count']);

  const users = data.users.map((user: IUsers) => {
    //mapeando os users pelo retorno da api e retornando um array de users
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        //convertendo a data para o formato brasileiro
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    };
  });

  return { users, totalCount };
}

export function useUsers(page: number) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 5 //duração do cache
  });
}
