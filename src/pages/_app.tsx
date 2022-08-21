/* eslint-disable react/react-in-jsx-scope */
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import { SidebarDrawerProvider } from '../components/contexts/SidebarDrawerContext';
import { makeServer } from '../services/mirage';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from '../services/queryClient';

if (process.env.NODE_ENV === 'development') {//validando se o ambiente está em desenvolvimento para criar os usuarios
  makeServer();
}


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>
      <ReactQueryDevtools />{/*mostrando o devtools do react-query em tela */}
    </QueryClientProvider>
  );
}

export default MyApp;
