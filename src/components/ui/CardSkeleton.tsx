import {
  HStack,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react"


const CardSkeleton = () => {
  return (
    <Stack gap="6" maxW="xs">
      <HStack width="full">
              <SkeletonCircle size="20" mx={"auto"} />

          </HStack>
    <SkeletonText noOfLines={2} w={100} gap={5} />
    <SkeletonText noOfLines={5}  gap={2} />
    <SkeletonText noOfLines={1} w={100} gap={5} />
    <SkeletonText noOfLines={1} w={100} gap={5} />
    <SkeletonText noOfLines={1} w={120} h={50} mx={"auto"} gap={5} />

    </Stack>
  )
}
export default CardSkeleton; 
