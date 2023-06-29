import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Sippner from "./Sippner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  static defaultProps = {
    country:'in',
    pageSize:6,
    category:'general'
  }

  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }

 capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0
    };
    document.title=`NewsContra - ${this.capitalizeFirstLetter(this.props.category)}`;
  }

  async updateNews(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8eb160b39d3d4c8d9d4e1f6f107ca545&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  async componentDidMount() {
    this.updateNews();
  }

  // handlenext = async () => {
  //   // if (
  //   //   !(
  //   //     this.state.page + 1 >
  //   //     Math.ceil(this.state.totalResults / this.props.pageSize)
  //   //   )
  //   // ) {
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=8eb160b39d3d4c8d9d4e1f6f107ca545&page=${
  //   //     this.state.page + 1
  //   //   }&pageSize=${this.props.pageSize}`;
  //   //   this.setState({loading: true});
  //   //   let data = await fetch(url);
  //   //   let parsedData = await data.json();
  //   //   this.setState({
  //   //     page: this.state.page + 1,
  //   //     articles: parsedData.articles,
  //   //     loading: false
  //   //   });
  //   // }
  //   this.setState({page:this.state.page + 1});
  //   this.updateNews();
  // }

  // handleprevious = async () => {
  //   // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=8eb160b39d3d4c8d9d4e1f6f107ca545&page=${
  //   //   this.state.page - 1
  //   // }&pageSize=${this.props.pageSize}`;
  //   // this.setState({loading: true});
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles: parsedData.articles,
  //   //   loading: false
  //   // });
  //   this.setState({page:this.state.page - 1});
  //   this.updateNews()
  // }

  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8eb160b39d3d4c8d9d4e1f6f107ca545&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({page:this.state.page + 1});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{margin:'25px',marginTop:'90px'}}>NewsContra - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Sippner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading && <Sippner/>}
        >
          <div className="container">

        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <Newsitem
                  title={!element.title?"":element.title}
                  description={!element.description?"":element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handleprevious}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handlenext}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}
