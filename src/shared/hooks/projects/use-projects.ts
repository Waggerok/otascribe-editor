import { useProjectStore } from "@/app/stores/project.store";
import api from "@/shared/generated/api";
import { useQuery } from "@tanstack/react-query"

export const useProjects = () => {

    const setProjects = useProjectStore(state => state.setProjects);

    const { data, isLoading, isPending, error } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const response = await api.ProjectsApi.getRecentProjectsApiProjectRecentProjectsGet(
                10,
                1,
                undefined,
                undefined,
            );

            setProjects(response.data.objects);
            return response.data
        },
        staleTime: 5 * 60 * 1000
    });

    return {
        projects: data?.objects ?? [],
        isLoading,
        isPending,
        error
    }

}