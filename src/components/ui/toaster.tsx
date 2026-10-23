import { Toaster as ChakraToaster, createToaster } from "@chakra-ui/react";

export const toaster = createToaster({
  placement: "top-end",
});

export function AppToaster() {
  return (
    <ChakraToaster toaster={toaster}>
      {(toast) => (
        <ChakraToaster.Toast>
          <ChakraToaster.Title>
            {toast.title}
          </ChakraToaster.Title>

          <ChakraToaster.Description>
            {toast.description}
          </ChakraToaster.Description>
        </ChakraToaster.Toast>
      )}
    </ChakraToaster>
  );
}
