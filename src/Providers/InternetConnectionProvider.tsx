import { useEffect, type ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IsOnlineAction } from "../app/features/internetConnection";
import type { RootState } from "../app/store";

import { createStandaloneToast } from "@chakra-ui/react";
import { FiWifiOff } from "react-icons/fi";


const {toast} = createStandaloneToast();


interface IProps { 

    children : ReactNode
}





const InternetConnectionProvider = ({children }: IProps) => { 
    

    

    const dispatch = useDispatch();

       const {  isOnline} = useSelector((state: RootState) => state.internet)




    // console.log(isOnline);

    
    function Online()  {
        dispatch(IsOnlineAction(true))
        closeAll();
  
     }

    
    
    
     function Offline()  {
dispatch(IsOnlineAction(false))
  
    }
    

function closeAll() {
 
    toast.closeAll()
  }

    useEffect(() => { 

        window.addEventListener("offline", Offline)
        
        window.addEventListener("online", Online);

            
    } , [])



    if (!isOnline) {
   toast({
  id: "offline-toast",
  title: "You are Offline Now",
  description: "Please check your internet connection.",
  status: "warning",
  duration: null,
  icon: <FiWifiOff />,
  isClosable: true,
  position: "top",
});

     }
    
    
    

    return children;
}
export default InternetConnectionProvider;