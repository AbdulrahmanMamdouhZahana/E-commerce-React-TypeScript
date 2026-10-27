
import {
  Box,
  Button,
  Flex,
  Input,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useAppDispatch } from "../app/hooks";
import { LoginRequest } from "../app/features/LoginApi";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { Navigate } from "react-router-dom";





interface LoginPageProps {
  isLogdin?: string | boolean;
}

const LoginPage = ({ isLogdin }: LoginPageProps) => {
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const dispatch = useAppDispatch();
  const { loading } = useSelector(
    (state: RootState) => state.login
  );

  const [user, setUser] = useState({
    identifier: "",
    password: "",
  });

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "identifier" && value.trim()) {
      setIsEmail(false);
    }

    if (name === "password" && value.trim()) {
      setIsPassword(false);
    }
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailEmpty = !user.identifier.trim();
    const passwordEmpty = !user.password.trim();

    setIsEmail(emailEmpty);
    setIsPassword(passwordEmpty);

    if (emailEmpty || passwordEmpty) return;

    dispatch(LoginRequest(user));
  };

  if(isLogdin) return <Navigate to={"/"}/>
  return (
    
    <Flex justify="center" flexDirection={"column"} align="center" minH="80vh" p={4}>
      <Box m={"5"} fontSize={40} >
        <h2 >Login To Access  The System </h2>

      </Box>


      <Box
        as="form"
        onSubmit={onSubmitHandler}
        maxW="md"
        w="100%"
        p={6}
        borderWidth="1px"
        borderRadius="lg"
      >
        <Stack spacing={5}>
          <Heading textAlign="center" size="xl">
            Login Page
          </Heading>

          <FormControl isInvalid={isEmail} >
            <FormLabel>Email address</FormLabel>
            <Input
              name="identifier"
              type="email"
              placeholder="Enter Your Email"
              value={user.identifier}
              onChange={onChangeHandler}
            />
            <FormErrorMessage>
              Email is required
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={isPassword} >
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="Enter Your Password"
              value={user.password}
              onChange={onChangeHandler}
            />
            <FormErrorMessage>
              Password is required
            </FormErrorMessage>
          </FormControl>

      <Button
  type="submit"
  colorScheme="blue"
  isLoading={loading}
  w="full"
  bg={isPassword || isEmail ? "red.500":"blue.500"  }

>
            Login
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};

export default LoginPage;
