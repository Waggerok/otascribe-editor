
import { useModalStore } from "@/app/stores/modal.store";
import { MODALS } from "@/shared/types/modals.type";
import React from "react";

const ModalManager: React.FC = () => {

    const { closeModal, isOpened, activeModal, data } = useModalStore();

    return (
        <>
            {MODALS.map((modal) => {
                const Component = modal.component
                return (
                    <Component
                        key={modal.id}
                        id={modal.id}
                        isOpened={isOpened && activeModal === modal.id}
                        onClose={closeModal}
                        data={data}
                    />
                )
            })}
        </>
    );
}

export default ModalManager;