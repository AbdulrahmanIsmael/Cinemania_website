import { useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';

export function ImgNav() {
  const popularMovies = useFetch(
    'https://api.themoviedb.org/3/movie/popular',
    { language: 'en-US', page: 1 },
    'popular'
  );

  return (
    <section className='main__content__showcase'>
      {/* <ul className='main__content__showcase__imgItems'></ul>
      <div id='right-row'></div>
      <div id='left-row'></div>

      <div className='main__content__showcase__imgNav'></div> */}
      {popularMovies.isLoading && <p>Loading...</p>}
      {popularMovies.isError && <p>{popularMovies.error.message}</p>}
      {popularMovies.isSuccess && (
        <p>{popularMovies.data.data.results[0]['original_title']}</p>
      )}
    </section>
  );
}
