import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getInitials, getSpeakerColor } from '@/shared/utils/formatting';
import { memo } from 'react';

export interface Speaker {
    id: number
    name: string
}

export const AvatarNode = memo(({ speaker }: { speaker: Speaker }) => {
    return (
        <div className='flex items-center gap-2'>
            <Avatar className="size-6 text-[10px] text-white">
                <AvatarFallback style={{ backgroundColor: getSpeakerColor(speaker?.name) }}>
                    {getInitials(speaker?.name, 2)}
                </AvatarFallback>
            </Avatar>
        </div>

    );
});