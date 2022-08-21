/* eslint-disable react/react-in-jsx-scope */
import { Box, Stack, Icon, Text, Link } from "@chakra-ui/react";
import { RiDashboardLine, RiContactsLine } from "react-icons/ri";
import {ReactNode} from 'react';

interface NaveSectionProps {
    title: string;
    children: ReactNode;
}

export function NavSection({title, children}: NaveSectionProps){
    return (
        <Box>
        <Text fontWeight="bold" color="gray.400" fontSize="small">
          {title}
        </Text>
        <Stack spacing="4" mt="8" align="stretch">
            {children}
        </Stack>
      </Box>
    );
}