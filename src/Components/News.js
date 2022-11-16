import React, { useEffect, useState,useCallback } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchSources,fetchNews } from '../api';

import Spinner from './Spinner';
import axios from 'axios';
import ErrorBoundary from './ErrorBoundary';

function News() {

    const [data, setData] = useState({
                                 articles:[],
                                 category : 'top-headlines',
                                 source:'',
                                 input:''
                                })

    const [page, setPage] = useState(1)
    const [sources, setSources] = useState([])
    const [displayResult, setDisplayResult] = useState(true)

   
// To get all the sources

  useEffect(()=>{
      
   async function getSources(){
        const options = await fetchSources()
         setSources(options)
      }
      getSources()
  },[])


  // To get the source selected setting source value
const handleClick=(e)=>{
  if(data.source !== e.target.id ){
    setPage(1)  
  setData({...data, articles:[], source :e.target.id, category:'everything'})
  }
}



// To fetch the news according to categories
useEffect(()=>{

  let getNews = async()=>{

    let res = await fetchNews(data,page)
    if(res?.articles?.length<=0){
      setDisplayResult(false);
    }
    else{
      setDisplayResult(true)
  
    }

    if(res.articles){
      const newArticles = data.articles.concat(res.articles)
    
    setData({...data,articles: newArticles , totalResults : res.totalResults})
    }
  
  }

  getNews()

},[data.category,data.source,page,data.input])


// To get the input value
const change = (e) => {

  let str = e.target.value
 

  if (str.trim().length == 0){
    setPage(1);
    setData({...data, category:'top-headlines',input:'' })
  }

  else{

    setData({...data, category:'keyword',input:str})
  }

};

// Debouncing function to avoid multiple setState and datafetching calls
const debounce = function (func) {
  let timer;

  return (e) => {
    
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(e);
    }, 500);
  };
};
const inputChange = useCallback(debounce(change), []);

// To set the page no
const nextPage = ()=>{

  if(page < 10 && data.articles.length < data.totalResults)
  setPage((prev)=> prev+1)
}


   
return (
   
<div>

<nav>
<div className="head__text">News Times</div>

<input type={'text'} placeholder='search by keyword' className='search-bar' onChange={inputChange}></input>

<div className='filter'>
  <div className="dropdown">
   
  <button className="dropbtn">Filter By Sources</button>
  <div className="dropdown-content">

  {sources.map((agency)=>{

return(
<button onClick={handleClick} id={agency.id} key={agency.id}>{agency.name}</button>
)

})}

</div>
</div>
</div>
</nav>
 <ErrorBoundary>
       {displayResult?
 
        <div >
        <InfiniteScroll
         dataLength={data.articles.length}
         next={nextPage}
         hasMore={data.articles.length<data.totalResults && page <10}
         loader={<Spinner/>}
        >
            <div className='all__news'>
            {data.articles.map((article,i)=>{

                return(<div className="news" key={i}>
                 <img src={article?.urlToImage} className='news-img'></img>   
                <h3 className="news__title">{article?.title}</h3>
               
                <span className="news__author">{article?.author===null?'Internet':article?.author}</span> <br />
                <span className="news__published">{article?.publishedAt}</span>
                <span className="news__source">{article?.source?.name}</span>
                <a href={article?.url} target={`_self`} >Read More</a>
              </div>)
            })}

            </div>

        </InfiniteScroll> 
      
        </div> : <center><h2 style={{ color: "red" }}>Oops...No News found &#128542;</h2></center>}
        </ErrorBoundary>

   
      
    </div>
   
  )
}

export default News

