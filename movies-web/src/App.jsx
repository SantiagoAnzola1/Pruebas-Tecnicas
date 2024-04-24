import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import { useMemo } from 'react'

function App() {

  const[movies, setMovies]=useState([])
  const[page, setPage]=useState(1)
  const iMDBPosterPath='https://image.tmdb.org/t/p/w500'

  const options = useMemo(()=>({
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzQ2ZjM3MzRlMmEwNzIzZmNkN2QyNTkxNzkyOTQ1MCIsInN1YiI6IjY2MjNkMjQ0ODdlNjNlMDE4ODczNzU5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HIsStIl5da4jlhNCEQTufFPsrEL5Basv43hDucFs82E'
    }
  }),[]) 
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,options)
    .then(response=>response.json())
    .then(response=>setMovies(response.results))
    .catch(err =>{
      console.error(err)
    })

  },[page,options])


  return (
    <>
    <header>
      <h1>Movies API</h1>
      <button onClick={()=>{setPage(page+1)}}>Next Page</button>
    </header>
      <main>
        <section className='movies'>
        
          {
           movies==undefined || movies.length==0?
           (<h2>No data found</h2>):
           (
            movies.map((movie)=>{
              return(
                <article className='poster' key={movie.id}>
                  <img className='img' src={`${iMDBPosterPath}${movie.poster_path}`} alt={`Poster de ${movie.title}`} />
                  <p>{movie.title}</p>
                  <div>

                  </div>
                </article>
              )
              
            })
          )
            
          }
        </section> 
      </main>
      <footer>

      </footer>
    </>
  )
}

export default App
