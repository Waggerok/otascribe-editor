import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { type ModalProps, ModalType } from "@/shared/types/modals.type";

const Confirm = ({ isOpened, data, onClose }: ModalProps<ModalType.CONFIRM_MODAL>) => {
    if (!data) return;

    const handleClose = () => {
        data?.onClose?.()
        onClose()
    };

    const handleConfirm = () => {
        data?.onConfirm?.();
        onClose();
    }

    return (
        <Dialog open={isOpened} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className='min-h-40'>
                <DialogHeader className='flex flex-col'>
                    <span className='text-lg'>
                        {data?.title || 'Подтверждение действия'}
                    </span>
                    <span className='text-xs text-muted-foreground'>
                        {data.description || 'Вы уверены что хотите совершить действие?'}
                    </span>
                </DialogHeader>
                <DialogDescription>
                    <div className="absolute bottom-3 right-3 flex gap-1 justify-between">
                        <Button onClick={handleClose} variant='secondary'>
                            {data?.closeText || 'Отмена'}
                        </Button>
                        <Button onClick={handleConfirm} variant={data?.isActionButtonDestructive ? "destructive" : "default"}>
                            {data.actionText || 'Подтвердить'}
                        </Button>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}

export default Confirm;