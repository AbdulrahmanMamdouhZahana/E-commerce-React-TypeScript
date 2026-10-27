import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  Image,
  SimpleGrid,
  HStack,
  VStack,
  Icon,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import {
  FiArrowRight,
  FiTruck,
  FiShield,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Smartphones",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
  },
  {
    name: "Headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
  },
  {
    name: "Smart Watches",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
  },
  {
    name: "Laptops",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
  },
  {
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
  },
  {
    name: "Gaming",
    image:
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=400&q=80",
  },
];

const featuredProducts = [
  {
    name: "Premium Smartphone",
    price: "$699",
    label: "Popular",
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&q=80",
  },
  {
    name: "Wireless Headphones",
    price: "$149",
    label: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
  },
  {
    name: "Smart Watch",
    price: "$199",
    label: "New",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
  },
  {
    name: "Modern Laptop",
    price: "$899",
    label: "Featured",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box color="chakra-body-text" pb={10}>
      <Container maxW="container.xl" py={{ base: 4, md: 8 }}>
        {/* Hero Section */}
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          bg="chakra-subtle-bg"
          border="1px solid"
          borderColor="chakra-border-color"
          borderRadius="2xl"
          overflow="hidden"
          minH={{ md: "400px" }}
        >
          <GridItem>
            <VStack
              align={{ base: "center", md: "start" }}
              justify="center"
              textAlign={{ base: "center", md: "left" }}
              spacing={5}
              p={{ base: 6, md: 10, lg: 12 }}
              h="full"
            >
          

              <Heading
                fontSize={{ base: "3xl", sm: "4xl", lg: "5xl" }}
                lineHeight="1.1"
                letterSpacing="tight"
              >
                Upgrade Your
                <Text as="span" display="block" color="blue.500">
                  Everyday Tech.
                </Text>
              </Heading>

              <Text
                color="chakra-subtle-text"
                fontSize={{ base: "md", md: "lg" }}
                lineHeight="1.8"
                maxW="440px"
              >
                Discover the latest smartphones, headphones, smart
                watches and more. Find your next favorite gadget.
              </Text>

              <HStack
                spacing={3}
                flexWrap="wrap"
                justify={{ base: "center", md: "start" }}
              >
                <Button
                  colorScheme="blue"
                  size="lg"
                  rightIcon={<FiArrowRight />}
                  onClick={() => navigate("/products")}
                >
                  Shop Now
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/products")}
                >
                  Explore Products
                </Button>
              </HStack>

              <HStack
                spacing={{ base: 3, md: 5 }}
                pt={3}
                color="chakra-subtle-text"
                fontSize="sm"
                flexWrap="wrap"
                justify={{ base: "center", md: "start" }}
              >
                <HStack spacing={2}>
                  <Icon as={FiTruck} color="blue.500" />
                  <Text>Fast Delivery</Text>
                </HStack>

                <HStack spacing={2}>
                  <Icon as={FiShield} color="blue.500" />
                  <Text>Secure Shopping</Text>
                </HStack>
              </HStack>
            </VStack>
          </GridItem>

          <GridItem position="relative" minH={{ base: "260px", md: "400px" }}>
            <Image
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1000&q=85"
              alt="Latest smartphone technology"
              position="absolute"
              inset={0}
              w="full"
              h="full"
              objectFit="cover"
            />

      
          </GridItem>
        </Grid>

        {/* Categories */}
        <Box mt={{ base: 10, md: 14 }}>
          <Flex justify="space-between" align="center" mb={5}>
            <Box>
              <Heading size="lg">Shop by Category</Heading>
              <Text color="chakra-subtle-text" mt={1} fontSize="sm">
                Find the right tech for you.
              </Text>
            </Box>

            <Button
              variant="ghost"
              colorScheme="blue"
              size="sm"
              rightIcon={<FiArrowRight />}
              onClick={() => navigate("/products")}
            >
              View All
            </Button>
          </Flex>

          <SimpleGrid columns={{ base: 2, sm: 3, lg: 6 }} spacing={4}>
            {categories.map((category) => (
              <VStack
                key={category.name}
                spacing={3}
                p={3}
                border="1px solid"
                borderColor="chakra-border-color"
                borderRadius="xl"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                  borderColor: "blue.400",
                  transform: "translateY(-4px)",
                  shadow: "md",
                }}
                onClick={() => navigate("/products")}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  w="full"
                  h={{ base: "100px", md: "120px" }}
                  objectFit="cover"
                  borderRadius="lg"
                />

                <Text fontWeight="semibold" fontSize="sm" textAlign="center">
                  {category.name}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Box>

        {/* Featured Products */}
        <Box mt={{ base: 10, md: 14 }}>
          <Flex justify="space-between" align="center" mb={5}>
            <Box>
              <Heading size="lg">Featured Products</Heading>
              <Text color="chakra-subtle-text" mt={1} fontSize="sm">
                Check out our favorite tech picks.
              </Text>
            </Box>

            <Button
              variant="outline"
              colorScheme="blue"
              size="sm"
              onClick={() => navigate("/products")}
            >
              View All
            </Button>
          </Flex>

          <SimpleGrid columns={{ base: 2, sm: 2, md: 4 }} spacing={4}>
            {featuredProducts.map((product) => (
              <Box
                key={product.name}
                border="1px solid"
                borderColor="chakra-border-color"
                borderRadius="xl"
                overflow="hidden"
                transition="all 0.2s"
                _hover={{ shadow: "lg", transform: "translateY(-3px)" }}
              >
                <Box
                  position="relative"
                  bg="chakra-subtle-bg"
                  p={3}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    w="full"
                    h={{ base: "130px", sm: "180px" }}
                    objectFit="cover"
                    borderRadius="lg"
                  />

                

             
                </Box>

                <VStack align="stretch" spacing={3} p={3}>
                  <Text
                    fontWeight="semibold"
                    noOfLines={2}
                    minH="40px"
                  >
                    {product.name}
                  </Text>

                  <Heading size="md" color="blue.500">
                    {product.price}
                  </Heading>

                  <Button
                    colorScheme="blue"
                    size="sm"
                    w="full"
                    onClick={() => navigate("/products")}
                  >
                    Explore Product
                  </Button>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>


      </Container>
    </Box>
  );
};

export default Home;