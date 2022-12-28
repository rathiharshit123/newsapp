import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

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
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=b4faa3f1494b462ca467020db9912074&page=1"
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles : parsedData.articles
        })
    }

    handleNextClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=b4faa3f1494b462ca467020db9912074&page=${this.state.page+1}`
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page+1,
            articles : parsedData.articles
        })
    }

    handlePreviousClick = async ()=>{
        console.log("previous click")
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=b4faa3f1494b462ca467020db9912074&page=${this.state.page-1}`
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page-1,
            articles : parsedData.articles
        })
    }
    
  render() {
    return (  
      <div className='container my-3'>
      <h2>Top Headlines </h2>
        <div className="row">
            
            {this.state.articles.map((element =>{
                return <div className="col-md-4" key={element.url}>
                        <NewsItem title = {element.title ? element.title.slice(0,44):""} description = {element.description? element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl = {element.url}/>
                        </div>
            }))}
        </div>
        <div className="container d-flex justify-content-between">
            <button type="button" disabled = {this.state.page<=1} onClick={this.handlePreviousClick} className="btn btn-dark">Previous</button>
            <button type="button" onClick={this.handleNextClick} className="btn btn-dark">Next</button>
        </div>
      </div>
    )
  }
}

export default News