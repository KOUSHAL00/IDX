import { useQuery } from '@tanstack/react-query';
import { pingApi } from '../../../apis/ping';

export default function usePing() {

    const { data, error, isLoading, isError } = useQuery({
        queryFn: pingApi,
        queryKey: ['ping'],
        staleTime:10000
    });

    return {
        data,
        error,
        isLoading,
        isError
    };
}