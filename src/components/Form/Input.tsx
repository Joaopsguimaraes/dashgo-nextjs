/* eslint-disable react/react-in-jsx-scope */

/**
 * Represents a paramns in input.
 * @param { string } error - the error valitor of react hook form api ( example errors.name );
 * @param { string } label - thme name at input to better ux
*/

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps
} from '@chakra-ui/react';
import React from 'react';
import { FieldError } from 'react-hook-form';
interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError; //importando a type FieldError do react-hook-form
}

const InputBase: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, ...rest },
  ref
) => {
  return (
    <FormControl
      isInvalid={
        !!error
      } /*realizando verificação da prop erro usando !! para tornar valor boolean*/
    >
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      {/* !! para tornar valor boolean, com isso se hover a props 
      label sera renderizado o FormLabel com a prop: name e & label */}

      <ChakraInput
        name={name}
        id={name}
        focusBorderColor="pink.500"
        variant="filled"
        bgColor="gray.900"
        _hover={{ bgColor: 'gray.900' }}
        size="lg"
        ref={ref}
        {...rest}
      />
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      {/* utilizando form error do Chakra para renderizar caso tenha erro de validação no input */}
    </FormControl>
  );
};

export const Input = React.forwardRef(InputBase);
