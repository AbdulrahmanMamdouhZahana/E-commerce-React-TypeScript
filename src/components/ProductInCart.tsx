import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Divider,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import type { IProduct } from "./interfaces";
import { useDispatch } from "react-redux";
import { removeFromCartAction } from "../app/features/cartSlice";
import SliderWithButtons from "./ui/SliderWithButtons";

interface IProps {
  product: IProduct;
}

const ProductInCart = ({ product }: IProps) => {
  const dispatch = useDispatch();

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const imgBg = useColorModeValue("gray.50", "gray.900");

  const imageUrl = product.Image?.formats?.thumbnail?.url
    ? `${import.meta.env.VITE_SERVER_API}${product.Image.formats.thumbnail.url}`
    : product.Image?.url
      ? `${import.meta.env.VITE_SERVER_API}${product.Image.url}`
      : undefined;

  const removeProduct = () => {
    dispatch(removeFromCartAction(product.id));
  };

  return (
    <Card
      direction="row"
      align="center"
      p={{ base: 2.5, sm: 3 }}
      mt={3}
      gap={{ base: 2.5, sm: 3.5 }}
      w="full"
      minW={0}
      maxW="100%"
      bg={cardBg}
      variant="outline"
      borderColor={borderColor}
      borderRadius="xl"
      overflow="hidden"
      boxShadow="xs"
      transition="box-shadow 0.2s ease"
      _hover={{ boxShadow: "sm" }}
    >
      {/* Product image */}
      <Flex
        flexShrink={0}
        w={{ base: "72px", sm: "80px", md: "88px" }}
        h={{ base: "72px", sm: "80px", md: "88px" }}
        align="center"
        justify="center"
        bg={imgBg}
        borderRadius="lg"
        p={1.5}
        overflow="hidden"
      >
        <Image
          src={imageUrl}
          alt={product.title || "Product image"}
          w="full"
          h="full"
          objectFit="contain"
          fallbackSrc="https://placehold.co/300x300?text=Product"
        />
      </Flex>

      {/* Product details */}
      <Stack flex="1" minW={0} spacing={{ base: 1.5, sm: 2 }}>
        {/* Title and delete */}
        <Flex align="start" justify="space-between" gap={1.5} minW={0}>
          <Heading
            size="xs"
            fontWeight="700"
            noOfLines={2}
            lineHeight="1.35"
            minW={0}
            flex="1"
            wordBreak="break-word"
            title={product.title}
          >
            {product.title}
          </Heading>

          <IconButton
            aria-label="Remove product"
            title="Remove product"
            icon={<FiTrash2 size={15} />}
            variant="ghost"
            colorScheme="red"
            size="xs"
            w="24px"
            h="24px"
            minW="24px"
            flexShrink={0}
            onClick={removeProduct}
            _hover={{ bg: "red.50", _dark: { bg: "red.900" } }}
          />
        </Flex>

        <Text fontSize="sm" fontWeight="800" color="blue.500">
          ${product.price}
        </Text>

        <Divider borderColor={borderColor} my={0.5} />

        {/* Quantity and remove action */}
        <Flex
          align="center"
          justify="space-between"
          gap={2}
          flexWrap="wrap"
          minW={0}
        >
          <Box minW={0} flexShrink={0}>
            <SliderWithButtons
              productQuantity={product.quantity}
              productId={product.id}
            />
          </Box>

          <Button
            display={{ base: "none", sm: "inline-flex" }}
            variant="ghost"
            colorScheme="red"
            size="xs"
            h="26px"
            px={2}
            fontSize="xs"
            leftIcon={<FiTrash2 size={13} />}
            flexShrink={0}
            onClick={removeProduct}
            _hover={{ bg: "red.50", _dark: { bg: "red.900" } }}
          >
            Remove
          </Button>
        </Flex>
      </Stack>
    </Card>
  );
};

export default ProductInCart;
