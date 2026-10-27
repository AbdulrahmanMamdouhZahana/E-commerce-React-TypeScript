import { createStandaloneToast } from "@chakra-ui/react";

const { ToastContainer, toast } = createStandaloneToast({
  defaultOptions: {
    position: "top-right",
  },
});

export const toaster = toast;

export function AppToaster() {
  return <ToastContainer />;
}

