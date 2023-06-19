import { useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

export function useFetch(endpoint, params, query) {
  const dataQuery = useQuery([query], () => {
    const options = {
      method: 'GET',
      url: endpoint,
      params: params,
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODM2NGE4MmUyZjkxYTY4MjE4OWI4ZDdlOGZjZmI2MiIsInN1YiI6IjYzN2Y2ODFkYTRhZjhmMDA4NjYwZWY0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CynOdUPMA1SB8ABorsBdqCcqfU_CSB_uJehd2N3jsc8',
      },
    };
    return axios.request(options);
  });

  useEffect(() => {
    console.log(dataQuery);
  }, [dataQuery]);

  return dataQuery;
}
