import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";
import CookieServices from "../../services/CookieServices";

interface DashboardProps {
  isLogdin?: string | boolean;
}

const Dashboard = ({ isLogdin }: DashboardProps = {}) => {
  const token = isLogdin || CookieServices.get("jwt");
  const navigate = useNavigate();

  if (!token) return <Navigate to="/" replace />;

  return (
    <Box textAlign="center" py={20} px={4}>
      <Heading mb={4}>Welcome to Dashboard </Heading>

      <Text color="gray.500" mb={6}>
        Manage your products easily from here.
      </Text>

      <Button colorScheme="blue" onClick={() => navigate("/dashboard/products")}>
        View Products
      </Button>
    </Box>
  );
};

export default Dashboard;