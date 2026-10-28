import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Image,
  Button,
  HStack,
  Heading,
  Text,
  VStack,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Box,
  Textarea,
  Flex,
  useBreakpointValue
} from "@chakra-ui/react";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { axiosInstance } from "../../components/config";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { IProduct } from "../../components/interfaces";
import ProductsTableSkeleton from "./ProductsTableSkeleton";
import { useState } from "react";
import DashboardModal from "./DashboardModal";
import { Navigate } from "react-router-dom";






import { createStandaloneToast } from "@chakra-ui/react";

import { useRef } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { shortChar } from "../../utils";
import CookieServices from "../../services/CookieServices";


const {toast} = createStandaloneToast();

const initialProduct: IProduct = {
  id: 0,
  documentId: "",
  title: "",
  description: "",
  price: 0,
  stock: 0,
  brand: "",
  quantity: 0,
  createdAt: "",
  updatedAt: "",
  publishedAt: "",
  Image: {
    formats: {
      thumbnail: {
        url: "",
      },
    },
  },
};

interface ICreateProduct {
  title: string;
  description: string;
  price: number | string;
  stock: number | string;
  brand: string;
}

const initialCreateProduct: ICreateProduct = {
  title: "",
  description: "",
  price: "",
  stock: "",
  brand: "",
};

const getValidImageUrl = (
  img?: {
    url?: string;
    formats?: {
      thumbnail?: { url?: string };
      small?: { url?: string };
      medium?: { url?: string };
      large?: { url?: string };
    } | null;
  } | null,
  preferThumbnail = false
): string | undefined => {
  if (!img) return undefined;
  const rawUrl = preferThumbnail
    ? img.formats?.thumbnail?.url || img.url
    : img.url || img.formats?.medium?.url || img.formats?.small?.url || img.formats?.thumbnail?.url;
  if (!rawUrl) return undefined;
  if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) {
    return rawUrl;
  }
  return `${import.meta.env.VITE_SERVER_API}${rawUrl.startsWith("/") ? "" : "/"}${rawUrl}`;
};


const DashboardProductes = () => {
  const abortControllerRef = useRef<AbortController | null>(null);

  const [openView, setOpenView] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openCreate, setOpenCreate] = useState(false)
    
  const [opendProduct, setOpendProduct] = useState<IProduct>(initialProduct)
  const [editProduct, setEditProduct] = useState<IProduct>(initialProduct)
  const [openDelete, setOpenDelete] = useState(false);
  const [deletedProduct, setDeletedProduct] = useState<IProduct>(initialProduct)

  const [thumbnail, setThumbnail] = useState<File | undefined>(undefined);
  const [Loading, setLoading] = useState(false);
  

  const [createdProduct, setCreatedProduct] = useState<ICreateProduct>(initialCreateProduct)
  

  const { isOnline } = useSelector((state: RootState) => state.internet)



  const token = CookieServices.get("jwt");

  const isMobile = useBreakpointValue({ base: true, md: false });

  const queryClient = useQueryClient();

  // get data
  const getProducts = async () => {
    const { data } = await axiosInstance.get("/products?populate=*");
    return data;
  };

  const { isError, isLoading, data, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (!token) {
    return <Navigate to="/login" replace />;
  }

    
    
    
    
  // // update data 
  // const updateProduct = async (documentId:string , productData:object )=> {

  //     try {
  //         const { status,  data } = await axiosInstance.put(`/products?${documentId}`, {
  //          data: productData , 

  //         })      
  //         return data; 
            

            
  //     } catch (error) {
  //         console.log(error);
            
            
  //     }
  // }
    

  // const editHandler = (documentId: string, productData: object) => { 
  //     updateProduct(documentId , )

  // }
    
    
  // const {isError , isLoading , data  } = useQuery({
  //     queryKey: ["products"], 
  //     queryFn:updateProduct
  // })
    

    
    
    
    
  const openCreateHandler = () => {
        
    
    setOpenCreate(true)

         
  }

  const closeCreateHandler = () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setLoading(false);
    setOpenCreate(false);
  };
  
    
    
  const openEditHandler = (id: number) => {
        
    const myProduct = data?.data?.find((product: IProduct) => product.id == id)
    if (myProduct) setEditProduct(myProduct)
    setOpenEdit(true)

         
  }


  
  


  const closeEditHandler = () => {
    setOpenEdit(false)
         
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditProduct({
      ...editProduct,
      [name]: value
    })
        

  }

  
  
  
  
  const handleChangeThumbnail = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setThumbnail(e.target.files?.[0]);
    

    
  }

  // console.log(editProduct);


    
    

                
  





  


  const handleSubmit = async (documentId: string) => {
  

    setLoading(true)

    try {
      let imageId: number | undefined;

      // 1. Upload image first
      if (thumbnail instanceof File) {
        const imageFormData = new FormData();
        imageFormData.append("files", thumbnail);

        const uploadResponse = await axiosInstance.post(
          "/upload",
          imageFormData
        );

        if (uploadResponse.data && uploadResponse.data[0]?.id) {
          imageId = uploadResponse.data[0].id;
        }
      }

      const productData: {
        title: string;
        description: string;
        price: number;
        stock: number;
        brand: string;
        Image?: number;
      } = {
        title: editProduct.title,
        description: editProduct.description,
        price: Number(editProduct.price),
        stock: Number(editProduct.stock),
        brand: editProduct.brand,
      };

      if (imageId !== undefined) {
        productData.Image = imageId;
      }

      const { status, data } = await axiosInstance.put(`/products/${documentId}`, {
        data: productData,
      });

      console.log("Updated product:", data);

      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      if (status == 200 || status == 204) {
        setOpenEdit(false);
        setThumbnail(undefined);

        toast({
          title: "Product Updated Successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error: unknown) {
      console.error("Error:", error);
      const err = error as { response?: { status?: number; data?: { error?: { message?: string } } }; message?: string };
      const is403 = err?.response?.status === 403;
      toast({
        title: is403 ? "Permission Denied (403)" : "Failed to update product",
        description: is403
          ? "You do not have permission to upload files or edit products. Please ensure you are logged in."
          : (err?.response?.data?.error?.message || err?.message),
        status: "error",
        duration: 3500,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };




  




  
  
  
  


  
  const SubmitCreateHandler = async () => {
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);

    try {
      let imageId: number | undefined;

      if (thumbnail instanceof File) {
        const imageFormData = new FormData();
        imageFormData.append("files", thumbnail);

        const uploadResponse = await axiosInstance.post(
          "/upload",
          imageFormData,
          {
            signal: controller.signal,
          }
        );

        if (uploadResponse.data && uploadResponse.data[0]?.id) {
          imageId = uploadResponse.data[0].id;
        }
      }



      if (controller.signal.aborted) return;


    
      
      



      const productData = {
        ...createdProduct,
        price: Number(createdProduct.price),
        stock: Number(createdProduct.stock),
        ...(imageId !== undefined && {
          Image: imageId,
        }),
      };

      // 3. Create product
      const { data, status } = await axiosInstance.post(
        "/products",
        { data: productData },
        {
          signal: controller.signal,
        }
      );

      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      if ([200, 201, 204].includes(status)) {
        setCreatedProduct(initialCreateProduct);
        setThumbnail(undefined);
        setOpenCreate(false);

        toast({
          title: "Product Created Successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }

      return data;
    } catch (error) {
      if (controller.signal.aborted) {
        console.log("Request cancelled");

        toast({
          title: "Product was Canceled ",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      
        setCreatedProduct(initialCreateProduct);
      } else {
        console.error("Create product error:", error);
        const err = error as { response?: { status?: number; data?: { error?: { message?: string } } }; message?: string };
        const is403 = err?.response?.status === 403;
        toast({
          title: is403 ? "Permission Denied (403)" : "Failed to create product",
          description: is403
            ? "You do not have permission to upload files or create products. Please ensure you are logged in."
            : (err?.response?.data?.error?.message || err?.message),
          status: "error",
          duration: 3500,
          isClosable: true,
        });
      }
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
        setLoading(false);
     
      }
    }
  };

  const handleCreate = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement> ) => {

    const { name, value } = e.target;
    setCreatedProduct({

      ...createdProduct,
      [name]: value

    })

  }
  


 


  const handleDeleteSubmit = async (documentId: string) => {
      
    setLoading(true)



    try {
      const { status, data } = await axiosInstance.delete(`/products/${documentId}`);


      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      if (status == 200 || status == 204) {
            
        setOpenDelete(false)
        setLoading(false)




        toast({
          title: "Product Deleted Successfully",
          status: "success",
          duration: 500,
          isClosable: true,
        })
                
                
      }
    
      return data
    } catch (error) {
    
      toast({
        title: `${error}`,
        status: "error",
        duration: 500,
        isClosable: true,
      })
    }



  }

    
  const openDeleteHandle = (id: number) => {


    const myProduct = data?.data?.find((product: IProduct) => product.id == id);
        
    if (myProduct) setDeletedProduct(myProduct);


    setOpenDelete(true)
  }

  const closeDeleteHandle = () => {
    setOpenDelete(false)
  }





  const openViewHandler = (id: number) => {
    const myProduct = data?.data?.find((product: IProduct) => product.id == id)
         

    if (myProduct) setOpendProduct(myProduct)
    setOpenView(true)
         
    //  console.log(opendProduct);

  }
    

  const closeViewHandler = () => {

    setOpenView(false)
  }

    

  if (isLoading || !isOnline) return <ProductsTableSkeleton />;
  if (isError) {
    return (
      <Box p={8} textAlign="center">
        <Heading size="md" color="red.400" mb={3}>
          Error fetching products!
        </Heading>
        <Text color="gray.400" mb={4}>
          Unable to retrieve products. The server might be waking up or the request timed out.
        </Text>
        <Button colorScheme="blue" onClick={() => refetch()}>
          Retry
        </Button>
      </Box>
    );
  }

  const productsList: IProduct[] = Array.isArray(data?.data) ? data.data : [];

  return (
    <Flex direction={"column"}>
      <Button w={"fit-content"} ml={"auto"} colorScheme="blue" my={2} onClick={openCreateHandler}>Create Product </Button>

      <TableContainer>
        {productsList.length ? (
          isMobile ? (
            <VStack spacing={4} align="stretch" w="full">
              {productsList.map((product: IProduct) => (
        <Box
          key={product.id}
          p={4}
          borderWidth="1px"
          borderColor="gray.600"
          borderRadius="xl"
          boxShadow="md"
          w="full"
        >
          <Flex gap={3} align="start" mb={3}>
            <Box
              boxSize="84px"
              minW="84px"
              borderRadius="lg"
              overflow="hidden"
              bg="gray.900"
              border="1px solid"
              borderColor="whiteAlpha.200"
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={1}
            >
              <Image
                src={getValidImageUrl(product.Image, true)} 
                alt={product.title}
                maxW="100%"
                maxH="100%"
                objectFit="contain"
                borderRadius="md"
                fallbackSrc="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80"
              />
            </Box>

            <Box flex="1" minW={0}>
              <Text fontSize="xs" color="gray.500">
                ID: {product.id}
              </Text>
              <Text fontWeight="bold" noOfLines={2}>
                {product.title}
              </Text>
              <Text color="green.400" fontWeight="semibold">
                ${product.price}
              </Text>
              <Text fontSize="sm">Stock: {product.stock}</Text>
            </Box>
          </Flex>

          <Text fontSize="sm" mb={2}>
            Brand: {product.brand || "—"}
          </Text>

          <Text fontSize="sm" mb={4}>
            {shortChar(product.description)}
          </Text>

          <Flex gap={2}>
            <Button
              size="sm"
              flex="1"
              colorScheme="blue"
              onClick={() => openViewHandler(product.id)}
            >
              <FiEye />
            </Button>

            <Button
              size="sm"
              flex="1"
              colorScheme="green"
              onClick={() => openEditHandler(product.id)}
            >
              <FiEdit2 />
            </Button>

            <Button
              size="sm"
              flex="1"
              colorScheme="red"
              onClick={() => openDeleteHandle(product.id)}
            >
              <FiTrash2 />
            </Button>
          </Flex>
        </Box>
      ))}
    </VStack>
  ) : (
    <TableContainer w="full" overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Title</Th>
            <Th>Thumbnail</Th>
            <Th>Brand</Th>
            <Th>Description</Th>
            <Th>Price</Th>
            <Th>Stock</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>

        <Tbody>
          {productsList.map((product: IProduct) => (

            <Tr key={product.id}>
              <Td>{product.id}</Td>
              <Td>{shortChar(product.title)}</Td>
              <Td>
                <Box
                  boxSize="52px"
                  borderRadius="md"
                  overflow="hidden"
                  bg="gray.900"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  p={1}
                >
                  <Image
                    src={getValidImageUrl(product.Image, true)}
                    alt={product.title}
                    maxW="100%"
                    maxH="100%"
                    objectFit="contain"
                    borderRadius="sm"
                    fallbackSrc="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80"
                  />
                </Box>
              </Td>
              <Td>{product.brand || "—"}</Td>
              <Td>{shortChar(product.description)}</Td>
              <Td>${product.price}</Td>
              <Td>{product.stock}</Td>
              <Td>
                <HStack spacing={2}>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => openViewHandler(product.id)}
                  >
                    <FiEye />
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="green"
                    onClick={() => openEditHandler(product.id)}
                  >
                    <FiEdit2 />
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => openDeleteHandle(product.id)}
                  >
                    <FiTrash2 />
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
) : (
  <Text fontWeight="bold">No Product Found</Text>
)}


{/* view modal */}
<DashboardModal
  openView={openView}
              onClose={closeViewHandler}
              title="View Modal"
>
              
           
               <VStack align="stretch" spacing={4}>

      <Box
        w="100%"
        h="260px"
        bg="gray.900"
        borderRadius="xl"
        border="1px solid"
        borderColor="whiteAlpha.200"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
        overflow="hidden"
      >
        <Image
          src={getValidImageUrl(opendProduct.Image, false)}
          alt={opendProduct.title}
          maxW="100%"
          maxH="100%"
          objectFit="contain"
          borderRadius="md"
          fallbackSrc="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80"
        />
      </Box>

      <Heading size="md">{opendProduct.title}</Heading>

      <Text>
        <strong>ID:</strong> {opendProduct.id}
      </Text>

      <Text>
        <strong>Brand:</strong> {opendProduct.brand || "—"}
      </Text>

      {/* <Text>
        <strong>Category:</strong>{" "}
        {opendProduct.category?.title || "—"}
      </Text> */}

      <Text>
        <strong>Price:</strong> ${opendProduct.price}
      </Text>

      <Text>
        <strong>Stock:</strong> {opendProduct.stock}
            </Text>
            

             <Text>
        <strong>description:</strong> {opendProduct.description || "—"}
      </Text>

      <Text>
      </Text>
    </VStack>
              
            
 <Button colorScheme='blue' mr={3} onClick={closeViewHandler} w={"w-full"}>
              Close
            </Button>

          </DashboardModal>  


          {/* edit modal */}
<DashboardModal
  openView={openEdit}
  onClose={closeEditHandler}
              title="Edit Product"
              
>
              <Stack spacing={4}>
                  
                  

                  <FormControl>
                    <FormLabel>Product Image Preview</FormLabel>
                    <Box
                      w="100%"
                      h="220px"
                      bg="gray.900"
                      borderRadius="xl"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      p={3}
                      overflow="hidden"
                    >
                      <Image
                        src={
                          thumbnail
                            ? URL.createObjectURL(thumbnail as unknown as Blob)
                            : getValidImageUrl(editProduct.Image, false)
                        }
                        alt={editProduct.title}
                        maxW="100%"
                        maxH="100%"
                        objectFit="contain"
                        borderRadius="md"
                        fallbackSrc="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80"
                      />
                    </Box>
                  </FormControl>
          

          

<FormControl>
      <FormLabel> Product Photo  </FormLabel>
      <Input
                id="thumbnail"
                name="thumbnail"
              type="file"
              p={2}
              onChange={handleChangeThumbnail}
              accept="image/*"
        placeholder="Enter product title"
                      />
          </FormControl>
          











    <FormControl>
      <FormLabel>Product Title</FormLabel>
      <Input
        name="title"
                          value={editProduct.title}
                          
                          onChange={handleChange}
        placeholder="Enter product title"
                      />
    </FormControl>

          



   <FormControl>
      <FormLabel>Product description</FormLabel>
      <Textarea
        name="description"
                          value={editProduct.description}
    onChange={handleChange}
        placeholder="Enter product description"
                      ></Textarea>
    </FormControl>



    <FormControl>
      <FormLabel>Brand</FormLabel>
      <Input
        name="brand"
        value={editProduct.brand}
        onChange={handleChange}
        placeholder="Enter brand"
      />
    </FormControl>

    <FormControl>
      <FormLabel>Price</FormLabel>
      <Input
        name="price"
        type="number"
        value={editProduct.price}
        onChange={handleChange}
      />
    </FormControl>

    <FormControl>
      <FormLabel>Stock</FormLabel>
      <Input
        name="stock"
        type="number"
        value={editProduct.stock}
        onChange={handleChange}
      />
    </FormControl>

    <Button
            colorScheme="blue"
            onClick={() => handleSubmit(editProduct.documentId)}
            isDisabled={Loading}
            isLoading={Loading}
    >
                      Save Changes
                      
                  </Button>
                  
<Button colorScheme='blue' onClick={closeEditHandler} w={"w-full"}>
Close
</Button>
  </Stack>
</DashboardModal>
                  
          {/* delete modal */}
          <DashboardModal openView={openDelete} onClose={closeDeleteHandle} title="Delete Modal">
              <div>
                  <Text  mb={2} >Are You Sure To delete This Product , 
                      if you Deleted you Can not Recived it 
                  </Text>

              </div>
         
              <Box display={"flex"} gap={4}>
                       <Button onClick={()=>handleDeleteSubmit(deletedProduct.documentId)} colorScheme='red'          isDisabled={Loading}
            isLoading={Loading}
          >Yes , I sure</Button>
              <Button onClick={closeDeleteHandle}>close</Button>
              </Box>
              
        </DashboardModal>
        

        {/* create Modal */}

        
        <DashboardModal openView={openCreate} onClose={closeCreateHandler} title="Create Modal">




          <Stack spacing={4}>
            <FormControl>
  <FormLabel>Title</FormLabel>
  <Input type='text' value={createdProduct.title} onChange={handleCreate} name="title" />
</FormControl>
            

            


                        <FormControl>
  <FormLabel>description</FormLabel>
  <Textarea value={createdProduct.description} onChange={handleCreate} name="description" ></Textarea>

            </FormControl>


            

                        <FormControl>
  <FormLabel>Price</FormLabel>
  <Input type='number' value={createdProduct.price} onChange={handleCreate} name="price" />
            </FormControl>
            
          <FormControl>
  <FormLabel>stock</FormLabel>
  <Input type='number' value={createdProduct.stock} onChange={handleCreate} name="stock" />
            </FormControl>

            
            <FormControl>
              
  <FormLabel>Brand</FormLabel>
  <Input type='text' value={createdProduct.brand} onChange={handleCreate} name="brand" />
              

            </FormControl>



            
          <FormControl>
            <FormLabel>Product Photo</FormLabel>
            {Boolean(thumbnail) && (
              <Box
                w="100%"
                h="160px"
                bg="gray.900"
                borderRadius="lg"
                border="1px solid"
                borderColor="whiteAlpha.200"
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={2}
                mb={3}
                overflow="hidden"
              >
                <Image
                  src={thumbnail ? URL.createObjectURL(thumbnail as unknown as Blob) : undefined}
                  alt="Selected Preview"
                  maxW="100%"
                  maxH="100%"
                  objectFit="contain"
                  borderRadius="md"
                />
              </Box>
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={handleChangeThumbnail}
            />
          </FormControl>
            

</Stack>


          <Box display={"flex"} gap={4}>
            <Button onClick={SubmitCreateHandler} colorScheme="blue" isLoading={Loading} isDisabled={Loading}>Create</Button>
                      <Button onClick={closeCreateHandler}>close</Button>
          </Box>


        </DashboardModal>
        

      </TableContainer>
      

      
    </Flex>

  );
};

export default DashboardProductes;