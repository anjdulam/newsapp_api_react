import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    //im setting the state of each newsitem component using constructor
    //syntax:
    //constructor() 
    //{
    // super(); //imppp
    // console.log("hello im constructor from news component");
    // this.state = 
    // {
    //         refer sampleoutput.json for syntax 
    // }
    //}

    //doing it statistically 
    // articles = [
    //     {
    //         "source": {
    //             "id": "bbc-news",
    //             "name": "BBC News"
    //         },
    //         "author": "BBC News",
    //         "title": "IPL: The unprecedented booing of Indian cricket star Hardik Pandya",
    //         "description": "IPL captain Hardik Pandya is being booed by by fans in packed stadiums across the country. What is going on?",
    //         "url": "https://www.bbc.co.uk/news/world-asia-india-68711086",
    //         "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/10BE0/production/_133067586_mediaitem133067585.jpg",
    //         "publishedAt": "2024-04-04T09:37:21.4696511Z",
    //         "content": "For the past two weeks, an Indian cricket star has been booed heavily by fans in packed stadiums across the country.\r\nHardik Pandya, captain of the Mumbai Indians team in Indian Premier League (IPL),… [+5084 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "espn-cric-info",
    //             "name": "ESPN Cric Info"
    //         },
    //         "author": null,
    //         "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
    //         "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
    //         "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
    //         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
    //         "publishedAt": "2020-04-27T11:41:47Z",
    //         "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "espn-cric-info",
    //             "name": "ESPN Cric Info"
    //         },
    //         "author": null,
    //         "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
    //         "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
    //         "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
    //         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
    //         "publishedAt": "2020-03-30T15:26:05Z",
    //         "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    //     }
    // ];

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'

    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string

    }
    constructor() {
        super(); //imppp
        console.log("hello im constructor from news component");
        this.state =
        {
            //articles: this.articles,  ->when doing iy statically with above news data only 
            //giving inital values 
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0 //for infinite scroll
        }
    }
    //its a lifecycle method, also an async function that can wait until promises are resolved 
    //runs after constructor-> then render() then this one
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3187d7f997a54f8f8cf4edb56c45ddd5&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseddata = await data.json()  //this will give the data in jon format like we have seen above statically 
        console.log(parseddata);
        this.setState({
            articles: parseddata.articles,
            totalResults: parseddata.totalResults,
            loading: false,
            totalResults: parseddata.totalResults


        })
    }

    handleNextClick = async () => {
        console.log("next button clicked");
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            //same as above - fetch data for next page 
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3187d7f997a54f8f8cf4edb56c45ddd5&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            //imp-> for loading 
            this.setState({ loading: true });
            let data = await fetch(url);
            let parseddata = await data.json();  //this will give the data in jon format like we have seen above statically 

            //add this - Update state only if data is available
            this.setState({
                page: this.state.page + 1,
                articles: parseddata.articles,
                //once the data is received -> no loading 
                loading: false,
                totalResults: parseddata.totalResults

            });
        }

    }

    handlePreviousClick = async () => {
        console.log("prev button clicked");
        //same as above 
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3187d7f997a54f8f8cf4edb56c45ddd5&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseddata = await data.json();  //this will give the data in jon format like we have seen above statically 
        console.log(parseddata);

        //add this 
        this.setState({
            page: this.state.page - 1,
            articles: parseddata.articles,
            loading: false,
            totalResults: parseddata.totalResults
        });

    }

    // for infinite scrolling 

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3187d7f997a54f8f8cf4edb56c45ddd5&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseddata = await data.json();  //this will give the data in jon format like we have seen above statically 
        console.log(parseddata);
        this.setState({
            articles: this.state.articles.concat(parseddata.articles),   //concat 
            loading: false,
            totalResults: parseddata.totalResults
        })



    };


    render() {
        return (
            // hi im the main news component 
            <div className='container my-3'>
                <h2 className='text-center'>NEWSTODAY - TOP HEADLINES</h2>

                {/* {this.state.loading && <Spinner />}    ->removing this for adding infinite scrolling   */}
                {/* <Spinner />  this will give spinner on screen forvever so dont use*/}


                {/* 12 grid bootstrap  */}
                {/* using this for non infinite scrolling i.e using next and prev buttons  */}
                {/* <div className='row'>
                    {  !this.state.loading && this.state.articles.map((element) => {
                        return <div className='col-md-4' key={element.url}>
                            <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""}
                                imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt}/>
                        </div>
                    })}
                </div> */            }



                {/* using infinite scrolling  refer ->https://www.npmjs.com/package/react-infinite-scroll-component -> live examples*/}
                {/* removed !this.state.loading and the data should keep appending  */}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={true.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >

                    <div className='container'>
                        <div className='row'>
                            {this.state.articles.map((element) => {
                                return <div className='col-md-4' key={element.url}>
                                    <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""}
                                        imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} />
                                </div>
                            })}
                        </div>

                    </div>
                </InfiniteScroll>


                {/* removed for infinite scrolling */}

                {/* <div className='container d-flex  justify-content-between'>
                    <button disabled={this.state.page <= 1} type='button' className='btn btn-dark' onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>

                </div> */}
            </div>
        )
    }
}

export default News
