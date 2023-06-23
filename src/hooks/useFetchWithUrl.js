import { useQueries } from 'react-query';
import axios from 'axios';

export function useFetchWithUrl(query, endpoint, parameters) {
  const [dataQuery, imageUrlQuery] = useQueries([
    {
      queryKey: [query],
      queryFn: () => {
        const options = {
          method: 'GET',
          url: endpoint,
          params: parameters,
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODM2NGE4MmUyZjkxYTY4MjE4OWI4ZDdlOGZjZmI2MiIsInN1YiI6IjYzN2Y2ODFkYTRhZjhmMDA4NjYwZWY0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CynOdUPMA1SB8ABorsBdqCcqfU_CSB_uJehd2N3jsc8',
          },
        };
        return axios.request(options);
      },
    },
    {
      queryKey: ['imagesUrl'],
      queryFn: () => {
        const options = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/configuration',
          params: {},
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODM2NGE4MmUyZjkxYTY4MjE4OWI4ZDdlOGZjZmI2MiIsInN1YiI6IjYzN2Y2ODFkYTRhZjhmMDA4NjYwZWY0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CynOdUPMA1SB8ABorsBdqCcqfU_CSB_uJehd2N3jsc8',
          },
        };
        return axios.request(options);
      },
    },
  ]);

  return [dataQuery, imageUrlQuery];
}
