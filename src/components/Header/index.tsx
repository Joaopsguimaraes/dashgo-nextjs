/* eslint-disable react/react-in-jsx-scope */
import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';
import { userSidebarDrawer } from '../contexts/SidebarDrawerContext';
import { Logo } from './Logo';
import { NotificationsNave } from './NotificationsNav';
import { Profile } from './Profile';
import { SearchBox } from './SearchBox';

export function Header() {
  const { onOpen } = userSidebarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  return (
    <Flex as="header" w="100%" maxWidth={1400} h="20" mx="auto" mt="4" px="6" align="center">
      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        ></IconButton>
      )}

      <Logo />
      {isWideVersion && <SearchBox />}
      <Flex align="center" ml="auto">
        <NotificationsNave />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}
