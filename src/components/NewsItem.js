import React from 'react'

const NewsItem = (props) => {
    let {title,description,imageUrl,newsUrl,author,date} = props;
    return (
      <div className='my-3'>
        <div className="card">
            <img src={imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
                <p className="card-text my-3"><small className="text-muted">Published by: {author?author:"Unknown"} at {new Date(date).toDateString()}</small></p>
            </div>
        </div>
      </div>
    )
}

export default NewsItem