import {
  Box,
  Flex,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link as ChakraLink,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  VStack,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";

import { LuLogIn, LuLogOut, LuMenu } from "react-icons/lu";
import { ColorModeButton } from "../ui/color-mode";
import { NavLink, useNavigate } from "react-router-dom";
import CookieServices from "../../services/CookieServices";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { OpenDrawerAction } from "../../app/features/cartDrawerSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { prdouctsCart } = useSelector(
    (state: RootState) => state.cart
  );

  const token = CookieServices.get("jwt");
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    CookieServices.remove("jwt");
    window.location.href = "/login";
  };

  const openCartHandler = () => {
    dispatch(OpenDrawerAction());
    onClose();
  };

  const navLinkStyle = {
    fontWeight: "bold",
    fontSize: "md",
    _hover: {
      textDecoration: "none",
      color: "blue.400",
    },
  };

  const navigationLinks = (
    <>
      <ChakraLink
        as={NavLink}
        to="/"
        {...navLinkStyle}
        onClick={onClose}
      >
        Home
      </ChakraLink>

      <ChakraLink
        as={NavLink}
        to="/products"
        {...navLinkStyle}
        onClick={onClose}
      >
        Products
      </ChakraLink>

      {token && (
        <ChakraLink
          as={NavLink}
          to="/dashboard"
          {...navLinkStyle}
          onClick={onClose}
        >
          Dashboard
        </ChakraLink>
      )}
    </>
  );

  return (
    <>
      <Box
        bg="chakra-body-bg"
        color="chakra-body-text"
        px={{ base: 3, md: 5 }}
        py={3}
        borderBottom="1px solid"
        borderColor="chakra-border-color"
        position="sticky"
        top={0}
        zIndex={10}
        w="full"
        minH="70px"
      >
        <Flex justify="space-between" align="center" gap={3}>
          {/* Mobile menu button */}
          {isMobile && (
            <IconButton
              aria-label="Open navigation menu"
              icon={<LuMenu />}
              variant="ghost"
              onClick={onOpen}
            />
          )}

          {/* Desktop navigation */}
          {!isMobile && (
            <Flex align="center" gap={6}>
              {navigationLinks}
            </Flex>
          )}

          {/* Actions */}
          <Flex align="center" gap={{ base: 1, md: 3 }}>
            {token ? (
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Open user menu"
                  variant="ghost"
                  icon={
                    <Avatar
                      size="sm"
                      name="Abdelrahman"
                      src="https://i.pravatar.cc/100?img=12"
                    />
                  }
                />

                <MenuList>
                  <MenuItem
                    icon={<LuLogOut />}
                    onClick={logoutHandler}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                size={{ base: "sm", md: "md" }}
                onClick={() => navigate("/login")}
                leftIcon={<LuLogIn />}
              >
                Login
              </Button>
            )}

            <ColorModeButton />

            <Button
              size={{ base: "sm", md: "md" }}
              onClick={openCartHandler}
            >
              Cart ({prdouctsCart.length})
            </Button>
          </Flex>
        </Flex>
      </Box>

      {/* Mobile navigation drawer */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
      >
        <DrawerOverlay />

        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader>MY E-Commerce </DrawerHeader>

          <DrawerBody>
            <VStack align="stretch" spacing={5} py={4}>
              {navigationLinks}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;