import React, { Component } from 'react'

export class Newsitem extends Component {
    render() {
        let {title, description,imageurl, newsurl,author, date} = this.props;  //destructuring in js of props
        return (
            <div className='my-4'>
                {/* hi im news item  */}
                {/* <div className="card" style="width: 18rem;">    -> wont inline style wont work so we are making it as js obj  */}  
                <div className="card" style={  {width: "18rem"}   }> 
                    <img src={imageurl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title} <span class="badge rounded-pill text-bg-info   ">new</span>
                            </h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small class="text-body-secondary">By {author?author: "unknown" } on {new Date(date).toGMTString()}</small></p>
                            <a href={newsurl} target='_blank' rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default Newsitem
