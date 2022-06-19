import {useContext} from "react";
import {ModalContext} from "../providers/ModalProvider";

export const useModalManager = () => {
    return useContext(ModalContext)
}
