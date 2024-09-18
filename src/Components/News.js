import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static defaultProps = {
    country: 'in',
    pagesize: 5,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    console.log("this is the constructor from news component");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title = `NewsMokey - ${this.capitalizeFirstLetter(this.props.category)}`;
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c7597c9d5d1e49baa3cc22826bf87a5f&pagesize=${this.props.pagesize}`;//c7597c9d5d1e49baa3cc22826bf87a5f
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,  
    // });
    this.updateNews();
  }
  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c7597c9d5d1e49baa3cc22826bf87a5f&page=${this.state.page + 1}&pagesize=${this.props.pagesize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
        totalResults: parsedData.totalResults
      });
  }
  handleNextPage = async () => {
    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize))) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c7597c9d5d1e49baa3cc22826bf87a5f&page=${this.state.page + 1}&pagesize=${this.props.pagesize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();

    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   });
    // }

    this.setState({page: this.state.page + 1});
    this.updateNews();
  };

  handlePrevPage = async () => {
    // if (this.state.page > 1) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c7597c9d5d1e49baa3cc22826bf87a5f&page=${this.state.page - 1}&pagesize=${this.props.pagesize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();

    //   this.setState({
    //     page: this.state.page - 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   });
    // }

    this.setState({page: this.state.page - 1});
    this.updateNews();
  };


  fetchMoreData = async () => {
    this.setState({page: this.state.page + 1})
    // this.updateNews()
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c7597c9d5d1e49baa3cc22826bf87a5f&page=${this.state.page + 1}&pagesize=${this.props.pagesize}`;
      // this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();

      this.setState({
        page: this.state.page + 1,
        articles: this.state.articles.concat(parsedData.articles),
        // loading: false,
        totalResults: parsedData.totalResults
      });
  }

  render() {
    return (
      <>
        <h1 className="text-center">NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} HeadLines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className='container'>

            <div className="row my-4">
              {this.state.articles.map((element) => {
                  return (
                    <div className="col-md-3" key={element.url}>
                      <Newsitem
                        title={element.title ? element.title : "Hii budys how are you and "}
                        description={element.description ? element.description : "Not much to say but one thing"}
                        imageUrl={element.urlToImage}
                        newsurl={element.url}
                        author={!element.author ? "unknown" : element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })}  
            </div>

          </div>    

        </InfiniteScroll>
      </>
        /* <div className="container d-flex justify-content-evenly">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevPage}>
            &larr; Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextPage}
          >
            Next &rarr;
          </button>
        </div> */
      
    )
  }
}

export default News;
