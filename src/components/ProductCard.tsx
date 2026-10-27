
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

const getValidImageUrl = (img?: unknown): string | undefined => {
  if (!img) return undefined;
  const imageObj = Array.isArray(img) ? img[0] : img;
  if (!imageObj || typeof imageObj !== "object") return undefined;
  const target = imageObj as {
    url?: string;
    formats?: {
      thumbnail?: { url?: string };
      small?: { url?: string };
      medium?: { url?: string };
      large?: { url?: string };
    } | null;
  };
  const rawUrl =
    target.url ||
    target.formats?.medium?.url ||
    target.formats?.small?.url ||
    target.formats?.thumbnail?.url;
  if (!rawUrl || typeof rawUrl !== "string") return undefined;
  if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) {
    return rawUrl;
  }
  return `${import.meta.env.VITE_SERVER_API}${rawUrl.startsWith("/") ? "" : "/"}${rawUrl}`;
};

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
      {data.map((p: IProduct) => {
        const imageUrl = getValidImageUrl(p.Image);

        return (
          <Card
            key={p.documentId || p.id}
            overflow="hidden"
            bg="transparent"
            border="1px solid"
            borderColor="gray.300"
          >
            <Box p={4}>
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={p.title ?? "Product image"}
                  boxSize="250px"
                  objectFit="cover"
                  borderRadius="lg"
                  mx="auto"
                />
              )}
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
      );
    })}
    </Grid>
  );
};

export default ProductCard;
