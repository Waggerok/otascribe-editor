import { useMutation } from '@tanstack/react-query';

import api from '@/shared/generated/api';

import type { SaveProjectChangesRequest } from '@/shared/generated/api/generated';

export const useSaveProjectChanges = () =>
    useMutation({
        mutationFn: async (data: SaveProjectChangesRequest) =>
        {
            const response = await api.ProjectsApi.saveProjectChangesApiProjectSaveChangesPost(data);

            if (response.status !== 200)
            {
                throw new Error('Ошибка при сохранении проекта');
            }

            return response;
        },
    });
