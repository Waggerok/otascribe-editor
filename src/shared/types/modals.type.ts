import { ConfirmModal } from "@/widgets/modals/confirm";
import type { FC, ReactNode } from "react";


export enum ModalType {
    CONFIRM_MODAL = "confirm",
};

export type ModalDataMap = {
    [ModalType.CONFIRM_MODAL]:
    {
        title?: string;
        description?: string | ReactNode;
        onClose?: () => void;
        onConfirm?: () => void;
        actionText?: string;
        closeText?: string;
        isActionButtonDestructive?: boolean;
    }
};

export type ModalProps<T extends ModalType = ModalType> = {
    id: T
    data?: ModalDataMap[T]
    isOpened: boolean
    onClose: () => void
}

export interface ModalItem {
    id: ModalType
    title?: string
    component: FC<any>
}


export const MODALS: ModalItem[] =
    [
        {
            id: ModalType.CONFIRM_MODAL,
            title: "Подтверждение действия",
            component: ConfirmModal,
        },
    ];