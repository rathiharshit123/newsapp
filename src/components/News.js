import React, {useState,useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    const [articles, setarticles] = useState([]);
    const [loading, setloading] = useState(true);
    const [page, setpage] = useState(1);
    const [totalResult, settotalResult] = useState(0);

    const updateNews =async ()=>{
        props.setProgress(20);
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`
        setloading(true);
        let data = await fetch(url);
        props.setProgress(50);
        let parsedData = await data.json();
        props.setProgress(70);
        setarticles(parsedData.articles);
        settotalResult(parsedData.totalResult);
        setloading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
    }, [])
    

    // const handleNextClick = async () => {
      //         setpage(page+1);
        //    updateNews();
    // }

    // const handlePreviousClick = async ()=>{
    //         setpage(page-1);
        //    updateNews();
    // }

    const fetchMoreData = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=b4faa3f1494b462ca467020db9912074&page=${page+1}&pageSize=${props.pageSize}`
        let data = await fetch(url);
        let parsedData = await data.json();
        setarticles(articles.concat(parsedData.articles));
        setloading(false)
        setpage(page+1);
    }
    
    return (  
      <div className='container my-3'>
      <h1 className="text-center" style={{marginTop: "70px"}}> TOP HEADLINES </h1>
        {loading && <Spinner/>} 

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={totalResult !== articles.length}
          loader={<Spinner/>}
        >
            <div className="row">
                {articles.map((element =>{
                    return <div className="col-md-4" key={element.url}>
                            <NewsItem title = {element.title ? element.title.slice(0,44):""}
                            description = {element.description? element.description.slice(0,88):""}
                            imageUrl={element.urlToImage}
                            newsUrl = {element.url}
                                date = {element.publishedAt|| ""}
                                author = {element.author|| ""}
                            />
                            </div>
                }))}
            </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
            <button type="button" disabled = {page<=1} onClick={this.handlePreviousClick} className="btn btn-dark">Previous</button>
            <button type="button" disabled = {page+1>Math.ceil(totalResult/props.pageSize)} onClick={this.handleNextClick} className="btn btn-dark">Next</button>
        </div> */}
      </div>
    )
}

News.defaultProps ={
    country : "in",
    pageSize: 5,
    category: "general",
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News