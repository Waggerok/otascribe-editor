import type { UserProfileInfoResponse } from '@/shared/generated/api/generated';

export interface User
{
    login: string;
    token: string;
    telegram_id: number | null;
    seconds: number;
    name?: string;
    role?: string;
    avatar?: string | undefined | null;
    user_access_level: number | null;
    profile_info: UserProfileInfoResponse | null;

    optionals?:
    {
        diarization?: boolean
        diarizationLock?: boolean
    }
}

export type TabId = 'transcript' | 'editor' | 'resume';
