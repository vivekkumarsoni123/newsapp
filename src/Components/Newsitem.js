import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title,description,imageUrl,newsurl,author,date,source} = this.props;
    return (
      <div className='my-2'>
        <div className="card" >
            <span class="position-absolute top-0  translate-middle 
                badge rounded-pill bg-danger" style={{zIndex:1 ,left:'90%'}}>
                {source}
            </span>
            <img src={!imageUrl?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt3q9O1lr3vhTXJD7Oq7y0EJATknCP3U8f-A&s":imageUrl} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title bg-color-green">{title} 
                <span class="visually-hidden"> </span>
                </h5>
                <p className="card-text">{description} </p>
                <p className='card-text'><small className='text-muted'>By {author} on {new Date(date).toGMTString()} </small> </p>
                <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
              </div>
        </div>
      </div>
    )
  }
}

export default Newsitem
