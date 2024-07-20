import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="menu"><Link to={'/product/category/' + item._id}>{item.name}</Link></li>
      );
    });
    return (
      <div className="border-bottom">
        <div className="float-left">
          <ul className="menu">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UNIQLO_logo.svg/1200px-UNIQLO_logo.svg.png" width="60px" height="60px" alt="" />
          <li className='menu'></li>
          <li className="menu"><Link to='/'>Home</Link></li>
            {cates}
          <li className="menu"><Link to='/gmap'>MAP</Link></li>
          </ul>
        </div>
        <div className="float-right">
        <form className="search">
          <input type="search" placeholder="Nhập từ khóa" className="keyword" value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} />
          <input type="submit" value="Tìm kiếm" onClick={(e) => this.btnSearchClick(e)} />
        </form>
        </div>
        <div className="float-clear" />
      </div>
    );
  }
  // event-handlers
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default withRouter(Menu);