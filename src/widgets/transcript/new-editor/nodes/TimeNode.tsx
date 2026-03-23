import { formatMilliseconds } from '@/shared/utils/formatting';
import React from 'react';

interface TimeNodeProps {
    startMilliseconds: number;
    endMilliseconds: number;
}

const TimeNode: React.FC<TimeNodeProps> = ({ startMilliseconds, endMilliseconds }) => {

    return (
        <div className='select-none mt-1 mr-2 text-xs text-gray-500 dark:text-gray-400 [&_span]:cursor-pointer text-nowrap'>
            <span>
                {formatMilliseconds(startMilliseconds)}
            </span>
            {' – '}
            <span>
                {formatMilliseconds(endMilliseconds)}
            </span>
        </div>
    );
}

export default TimeNode;