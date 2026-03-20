
import type { ModalDataMap, ModalType } from "@/shared/types/modals.type";
import { create } from "zustand";

interface State {
    isOpened : boolean;
    activeModal ?: ModalType;
    data?: ModalDataMap[keyof ModalDataMap]
}

interface Actions {
    openModal: <T extends ModalType>(id: T, data?: ModalDataMap[T]) => void;
    closeModal: () => void;
}

export const useModalStore = create<State & Actions>((set) => ({
    isOpened: false,
    activeModal: undefined,
    data: undefined,

    openModal: (id,data) => set({ isOpened: true, activeModal: id, data }),
    closeModal: () => set({ isOpened: false, activeModal: undefined, data: undefined })

}))