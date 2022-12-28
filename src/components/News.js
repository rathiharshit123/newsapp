import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
export class News extends Component {

    static defaultProps ={
        country : "in",
        pageSize: 5,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(){
        super();
        console.log("Hello i am a constructor")
        this.state = {
            articles : [],
            loading : false,
            page: 1,
        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=b4faa3f1494b462ca467020db9912074&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles : parsedData.articles,
            totalResult: parsedData.totalResults,
            loading: false,
        })
    }

    handleNextClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=b4faa3f1494b462ca467020db9912074&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page+1,
            articles : parsedData.articles,
            loading: false
        })
    }

    handlePreviousClick = async ()=>{
        console.log("previous click")
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=b4faa3f1494b462ca467020db9912074&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page-1,
            articles : parsedData.articles,
            loading: false
        })
    }
    
  render() {
    return (  
      <div className='container my-3'>
      <h1 className="text-center"> TOP HEADLINES </h1>
        {this.state.loading && <Spinner/>} 
        <div className="row">
            {!this.state.loading && this.state.articles.map((element =>{
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
        <div className="container d-flex justify-content-between">
            <button type="button" disabled = {this.state.page<=1} onClick={this.handlePreviousClick} className="btn btn-dark">Previous</button>
            <button type="button" disabled = {this.state.page+1>Math.ceil(this.state.totalResult/this.props.pageSize)} onClick={this.handleNextClick} className="btn btn-dark">Next</button>
        </div>
      </div>
    )
  }
}

export default News