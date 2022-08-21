/* eslint-disable react/react-in-jsx-scope */
import { Flex, Input, Icon } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';

export function SearchBox() {
  // const [search, setSearch] = useState('');
  // controlled component

  const searchInputRef = useRef<HTMLInputElement>(null);
  //uncontrolled component

  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxWidth={400}
      alignSelf="center"
      color="gray.200"
      bg="gray.800"
      borderRadius="full"
    >
      <Input
        color="gray.50"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="buscar na plataforma"
        _placeholder={{ color: 'gray.400' }}
        ref={searchInputRef}
      />
      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  );
}
