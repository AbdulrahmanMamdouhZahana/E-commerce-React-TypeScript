
import {
  Button,
  Box,
  Card,
  Grid,
  Image,
  Text,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";

import type { IProduct } from "./interfaces";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddToCartAction } from "../app/features/cartSlice";
import CardSkeleton from "./ui/CardSkeleton";

interface IProps {
  isLoading?: boolean;
  isError?: boolean;
  data: IProduct[];
}

const ProductCard = ({ isLoading, isError, data }: IProps) => {
  const navigate = useNavigate();

  const dispatch = useDispatch(); 
  // const { prdouctsCart } = useSelector((state: RootState) => state.cart); 
  // console.log(prdouctsCart);
  

  const toProduct = (id: string) => {
    navigate(`/products/${id}`);

  };

  if (isLoading) {
    return Array.from({ length: 20 }, (_, index) => (

           <Box display={"inline-block"} w={"350px"} ml={"65px"} mt={7}>
              <CardSkeleton key={index} />
    </Box>   


))

  };
  
  

  if (isError) {
    return <Text color="red.500">Something went wrong.</Text>;
  }


  if (!data?.length) {
    return <Text>No products found.</Text>;
  }



  console.log(data);
  
  // handler 
  const AddToCart = (p:IProduct) => { 

    dispatch(AddToCartAction(p))
  }


  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(280px, 1fr))"
      gap={5}
      w="full"
    >
      {data.map((p: IProduct) => (
        <Card
          key={p.documentId}
          overflow="hidden"
          bg="transparent"
          border="1px solid"
          borderColor="gray.300"
        >
          <Box p={4}>
            <Image
              src={
                p.Image?.formats?.thumbnail?.url
                  ? `${p.Image.url}`
                  : p.Image.formats.thumbnail.url
               
              }
              alt={p.title}
              boxSize="250px"
              objectFit="cover"
              borderRadius="lg"
              mx="auto"
            />
          </Box>

          <CardBody>
            <Text fontSize="xl" fontWeight="bold">
              {p.title}
            </Text>

            <Text fontWeight="medium" mt={2}>
              {p.brand}
            </Text>

            <Text mt={2} noOfLines={3}>
              {p.description}
            </Text>

            <Text fontSize="2xl" fontWeight="bold" mt={3}>
              {p.price}$
            </Text>
          </CardBody>
          <CardFooter gap={2} justifyContent="center">
            <Button
              colorScheme="blue"
              onClick={() => toProduct(p.documentId)}
            >
              View Details
            </Button>

            <Button variant="ghost" onClick={()=>AddToCart(p)}>
              Add to cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </Grid>
  );
};

export default ProductCard;
