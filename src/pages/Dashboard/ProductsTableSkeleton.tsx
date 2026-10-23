import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Skeleton,
  HStack,
} from "@chakra-ui/react";

const ProductsTableSkeleton = () => {
  const skeletonRows = Array.from({ length: 6 });

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Title</Th>
            <Th>Thumbnail</Th>
            <Th>Brand</Th>
            <Th>Category</Th>
            <Th>Price</Th>
            <Th>Stock</Th>
            <Th textAlign="center">Actions</Th>
          </Tr>
        </Thead>

        <Tbody>
          {skeletonRows.map((_, index) => (
            <Tr key={index}>
              {/* ID */}
              <Td>
                <Skeleton height="16px" width="30px" borderRadius="md" />
              </Td>

              {/* Title */}
              <Td>
                <Skeleton height="16px" width="140px" borderRadius="md" />
              </Td>

              {/* Thumbnail (50x50 square matching your Image) */}
              <Td>
                <Skeleton boxSize="50px" borderRadius="md" />
              </Td>

              {/* Brand */}
              <Td>
                <Skeleton height="16px" width="90px" borderRadius="md" />
              </Td>

              {/* Category */}
              <Td>
                <Skeleton height="16px" width="100px" borderRadius="md" />
              </Td>

              {/* Price */}
              <Td>
                <Skeleton height="16px" width="60px" borderRadius="md" />
              </Td>

              {/* Stock */}
              <Td>
                <Skeleton height="16px" width="50px" borderRadius="md" />
              </Td>

              {/* Actions (2 Buttons) */}
              <Td>
                <HStack spacing={2} justify="center">
                  <Skeleton height="32px" width="68px" borderRadius="md" />
                  <Skeleton height="32px" width="76px" borderRadius="md" />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTableSkeleton;