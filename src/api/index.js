import axios from 'axios';

const api = '711fc8b76d3841deaed2593e353d4922'
let url = 'https://newsapi.org/v2';

export const fetchSources = async () => {
    const requestSource = `sources?apiKey=`;
    try {
       
        // const { data: { sources } } = await axios.get(`${url}/${requestSource}${api}`);
        const {data:{sources}} = await axios.get(`https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/sources?apiKey=${api}`)
       
        //console.log(sources)

        return sources.map((source) => source);
    } catch (error) {
        return error;
    }
};

export const fetchNews = async (request,page) => {
    try {

        console.log(request)

        if(request.category==='top-headlines'){

            url = `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/${request.category}?country=us&apiKey=${api}&pageSize=8&page=${page}`

        }
      if (request.category==='keyword'){
            url = `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=${request.input}&pageSize=10&apiKey=${api}&page=${page}`
        }

        if(request.category==='everything'){
            url = `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?sources=${request.source}&pageSize=10&apiKey=${api}&page=${page}`
          

        }
      
    //   const { data: { articles } } = await axios.get(url)

       const res =await axios.get(url)
       
       return res.data
      
    } catch (error) {
        return error;
    }
};

  // const { data: { articles } } = await axios.get(`${url}/${request.category}?${request.query}&pageSize=15&page=${request.page}&apiKey=${api}`);
      //filter by sources:- https://newsapi.org/v2/everything?sources=reuters&apiKey=&pageSize=5&page=2
      //search by keyword:-https://newsapi.org/v2/everything?q=ABC%20News&pageSize=10&apiKey=&page=1
      //top headlines when component mounts :- https://newsapi.org/v2/top-headlines?country=us&apiKey=&pageSize=8&page=2
      // 1e54f63972d24682ac44eedaaf9c94a2
      //711fc8b76d3841deaed2593e353d4922
