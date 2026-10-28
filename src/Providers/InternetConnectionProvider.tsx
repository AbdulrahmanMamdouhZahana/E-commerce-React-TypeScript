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





const InternetConnectionProvider = ({ children }: IProps) => { 
    const dispatch = useDispatch();
    const { isOnline } = useSelector((state: RootState) => state.internet);

    useEffect(() => { 
        function handleOnline() {
            dispatch(IsOnlineAction(true));
            toast.closeAll();
        }

        function handleOffline() {
            dispatch(IsOnlineAction(false));
        }

        window.addEventListener("offline", handleOffline);
        window.addEventListener("online", handleOnline);

        return () => {
            window.removeEventListener("offline", handleOffline);
            window.removeEventListener("online", handleOnline);
        };
    }, [dispatch]);

    useEffect(() => {
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
        } else {
            toast.close("offline-toast");
        }
    }, [isOnline]);

    return children;
};

export default InternetConnectionProvider;