import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react' 
import type { ReactNode } from 'react';

interface IProps { 

    openView: boolean, 
    onClose: () => void,
    children: ReactNode,
    title:string, 

    
}
const DashboardModal = ({ openView , onClose , children  , title}:IProps)=> {
    //   const { isOpen, onOpen, onClose } = useDisclosure()
    

  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={openView} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
                  <ModalHeader>{ title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>


{ children}


          </ModalBody>

          <ModalFooter>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DashboardModal; 