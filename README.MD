## Dashgo NextJS - Dashboard de usuários

### POC em desenvolvimento, ainda nao finalizada!!

Aplicação de dashboard de cadastros e inscritos na plataforma. Uma POC com vários conceitos e bibliotecas essenciais para seu dia a dia com React, como controle de cache, formulário e validações UI declarativa com Chakra UI entre outros.

Nesta POC voce poderá ver tratamento de cache com React Query no NextJS:
```tsx
    await queryClient.prefetchQuery(
      ['user', userId],
      async (): Promise<any> => {
        const response = await api.get(`users/${userId}`);

        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10 //10 minutos de cash
      }
    );
```

**Mutation com react query:**
```tsx
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
```

**Schemas com a biblioteca Yup:**
```tsx
const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('Email obrigatório').email('Email inválido'),
  password: yup
    .string()
    .required('Senha obrigatório')
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
  passwordConfirmation: yup.string().oneOf([null, yup.ref('password')], 'Senhas não conferem')
});

```

**Active link com nextJs:**
```tsx
/* eslint-disable react/react-in-jsx-scope */
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement, ReactElement } from 'react';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

export function ActiveLink({ children, shouldMatchExactHref = false, ...rest }: ActiveLinkProps) {
  const { asPath } = useRouter();
  let isActive = false;

  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true;
  }

  if (
    (!shouldMatchExactHref && asPath.startsWith(String(rest.href))) ||
    asPath.startsWith(String(rest.as))
  ) {
    isActive = true;
  }

  return (
    <Link {...rest}>{cloneElement(children, { color: isActive ? 'pink.400' : 'gray.400' })}</Link>
  );
}

```

**Override de temas do chakra UI:**
```tsx
import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    gray: {
      '900': '#181b23',
      '800': '#1f2029',
      '700': '#353646',
      '600': '#4b4d63',
      '500': '#616488',
      '400': '#797d9a',
      '300': '#9699b0',
      '200': '#b3b5c6',
      '100': '#d1d2dc',
      '50': '#eeeef2'
    }
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto'
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50'
      }
    }
  }
});

```

Entre varias outros exemplos que pode ser usado em seu dia a dia, para conhecer melhor execute: 
```
yarn
```
ou com npm
```
npm i
```
