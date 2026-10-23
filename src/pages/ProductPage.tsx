
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../components/config";
import { useNavigate, useParams } from "react-router-dom";
import CardSkeleton from "../components/ui/CardSkeleton";
import { AddToCartAction } from "../app/features/cartSlice";
import { useDispatch } from "react-redux";

const ProductPage = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();
    const dispatch = useDispatch(); 


  const {
    isLoading,
    isError,
    data,
  } = useQuery({
    queryKey: ["product", documentId],
    queryFn: async () => {
      if (!documentId) {
        throw new Error("Product ID is missing");
      }

      const { data } = await axiosInstance.get(
        `/products/${documentId}?populate=*`
      );

      return data.data;
    },
    enabled: Boolean(documentId),
  });

  const back = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <Box p={5}>
        <CardSkeleton />
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box textAlign="center" p={8}>
        <Text color="red.500" mb={4}>
          Failed to load product.
        </Text>
        <Button onClick={back}>Go Back</Button>
      </Box>
    );
  }

  const imageUrl =
    data.Image?.formats?.thumbnail?.url ??
    data.Image?.url;

  return (
    <Box textAlign="center" p={5}>
      <Button variant="ghost" onClick={back} mb={5}>
        ← Back
      </Button>

      <Flex justify="center">
        <Card
          overflow="hidden"
          bg="transparent"
          border="1px solid"
          borderColor="gray.300"
          w="400px"
          maxW="100%"
        >
          {imageUrl && (
            <Image
              src={`${import.meta.env.VITE_SERVER_API}${imageUrl}`}
              alt={data.title ?? "Product image"}
              boxSize="250px"
              objectFit="cover"
              borderRadius="lg"
              mx="auto"
              mt={4}
            />
          )}

          <CardBody>
            <Text fontSize="2xl" fontWeight="bold">
              {data.title}
            </Text>

            <Text fontSize="xl" fontWeight="medium" mt={2}>
              {data.brand}
            </Text>

            <Text mt={3}>
              {data.description}
            </Text>

            <Text fontSize="2xl" fontWeight="bold" mt={4}>
              {data.price}$
            </Text>
          </CardBody>

          <CardFooter justifyContent="center">
            <Button colorScheme="blue" onClick={() => { 
              dispatch(AddToCartAction(data))
            }}>
              Add to cart
            </Button>
          </CardFooter>
        </Card>
      </Flex>
    </Box>
  );
};

export default ProductPage;
