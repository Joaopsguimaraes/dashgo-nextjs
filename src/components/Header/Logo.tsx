/* eslint-disable react/react-in-jsx-scope */
import { Text } from '@chakra-ui/react';

export function Logo() {
  return (
    <>
      <Text 
        fontSize={['2xl', '3xl']}//responsive fontSize 
        fontWeight="bold" 
        letterSpacing="tight" w="64"
      >
        Dashgo
        <Text as="span" ml="1" color="pink.500">
          .
        </Text>
      </Text>
    </>
  );
}
