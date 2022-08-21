/* eslint-disable react/react-in-jsx-scope */
import { Flex, Box, Avatar, Text } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Joao Guimaraes</Text>
          <Text color="gray.300">psjoaovictor@gmail.com</Text>
        </Box>
      )}
      <Avatar size="md" name="Joao Guimaraes" src="https://github.com/Joaopsguimaraes.png" />
    </Flex>
  );
}
