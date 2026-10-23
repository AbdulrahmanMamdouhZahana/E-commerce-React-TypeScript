import React from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiArrowLeft,
} from 'react-icons/fi';
import {  Outlet, useNavigate } from 'react-router-dom';
import {Link } from "react-router-dom"
import CookieServices from '../../services/CookieServices';

// Sidebar links matching your screenshot
const LinkItems = [
  { to:"/dashboard", name: 'Dashboard', icon: FiHome },
  { to:"/dashboard/products", name: 'Products', icon: FiTrendingUp },
  { to:"/", name: 'Back To WebSite', icon: FiArrowLeft },
];

const DashboardLayout=({ })=> {
  const { isOpen, onOpen, onClose } = useDisclosure();

 
  return (
    <Box minH="100vh" bg="#171923" color="gray.200">
      {/* Desktop Sidebar */}
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />

      {/* Mobile Drawer */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent bg="#171923" color="gray.200">
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* Top Header / Navbar */}
      <MobileNav onOpen={onOpen} />

      {/* Main Content Area */}
          <Box ml={{ base: 0, md: 60 }} p="6">
              <Outlet/>
              
      </Box>
    </Box>
  );
}

/* -------------------------------------------------------------------------- */
/*                               SIDEBAR COMPONENT                            */
/* -------------------------------------------------------------------------- */
const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg="#171923"
      borderRight="1px"
      borderRightColor="whiteAlpha.200"
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color="white">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} to={link.to} as={Link}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};


const NavItem = ({ icon, children, to, ...rest }) => {
  return (
    <Flex
      as={Link}
      to={to}
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      color="gray.300"
      textDecoration="none"
      _focus={{ boxShadow: 'none' }}
      _hover={{
        bg: 'whiteAlpha.100',
        color: 'white',
        textDecoration: 'none',
      }}
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{ color: 'white' }}
          as={icon}
        />
      )}

      <Text fontSize="sm">{children}</Text>
    </Flex>
  );
};


/* -------------------------------------------------------------------------- */
/*                                HEADER COMPONENT                            */
/* -------------------------------------------------------------------------- */
const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 8 }}
      height="20"
      alignItems="center"
      bg="#171923"
      borderBottomWidth="1px"
      borderBottomColor="whiteAlpha.200"
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        color="gray.200"
        borderColor="whiteAlpha.300"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
        color="white"
      >
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          color="gray.300"
          _hover={{ bg: 'whiteAlpha.100' }}
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm" color="gray.200">
                    Justina Clark
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown color="#A0AEC0" />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList bg="gray.800" borderColor="whiteAlpha.200" color="gray.200">
          
              <MenuDivider borderColor="whiteAlpha.200" />
              <MenuItem bg="gray.800" _hover={{ bg: 'gray.700' }} onClick={() => { 
                CookieServices.remove("jwt")
                window.location.href = "/";



              }}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default DashboardLayout;