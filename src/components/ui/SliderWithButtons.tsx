import { useState } from 'react';
import {
  HStack,
  Button,
  Text,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { decreaesQuantity, IncreaesQuantity } from '../../app/features/cartSlice';

interface IProps { 
  productQuantity: number;
  productId: number;
}

const SliderWithButtons = ({ productQuantity, productId }: IProps) => {
  const [value, setValue] = useState(productQuantity);
  const min = 1;
  const max = 6;
  const step = 1;
  const dispatch = useDispatch();

  const borderColor = useColorModeValue("gray.200", "gray.600");
  const bg = useColorModeValue("gray.50", "gray.700");

  const handleDecrement = () => { 
    dispatch(decreaesQuantity(productId));
    setValue((prev) => Math.max(min, prev - step));
  };

  const handleIncrement = () => {
    dispatch(IncreaesQuantity(productId));
    setValue((prev) => Math.max(min, prev + step));
  };

  return (
    <Box display="inline-flex" alignItems="center">
      <HStack
        spacing={1}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="md"
        p={0.5}
        bg={bg}
      >
        <Button
          size="xs"
          w="24px"
          h="24px"
          minW="24px"
          p={0}
          variant="ghost"
          onClick={handleDecrement}
          isDisabled={value <= min}
          aria-label="Decrease value"
          fontSize="sm"
          fontWeight="bold"
        >
          -
        </Button>

        <Text
          fontSize="xs"
          fontWeight="bold"
          minW="22px"
          textAlign="center"
          userSelect="none"
        >
          {value}
        </Text>

        <Button
          size="xs"
          w="24px"
          h="24px"
          minW="24px"
          p={0}
          variant="ghost"
          onClick={handleIncrement}
          isDisabled={value >= max}
          aria-label="Increase value"
          fontSize="sm"
          fontWeight="bold"
        >
          +
        </Button>
      </HStack>
    </Box>
  );
};

export default SliderWithButtons;