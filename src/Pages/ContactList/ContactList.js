import React, { useReducer, useRef } from 'react';
import { useHistory } from "react-router-dom";
import { useFetch, useInfiniteScroll, useLazyLoading } from './CustomHooks';
import Skeleton from 'react-loading-skeleton';
import './ContactList.css';

function getPhoneNumber(length) {

return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));

}

function ContactList() {
  const history = useHistory();
  const imgReducer = (state, action) => {
    switch (action.type) {
      case 'STACK_IMAGES':
        return { ...state, images: state.images.concat(action.images) }
      case 'FETCHING_IMAGES':
        return { ...state, fetching: action.fetching }
      default:
        return state;
    }
  }

  const pageReducer = (state, action) => {
    switch (action.type) {
      case 'ADVANCE_PAGE':
        return { ...state, page: state.page + 1 }
      default:
        return state;
    }
  }

  const handleLogout=()=>{
    localStorage.removeItem('token');
    history.push("/login");
  }

  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 })
  const [imgData, imgDispatch] = useReducer(imgReducer, { images: [], fetching: true, })

  let bottomBoundaryRef = useRef(null);
  useFetch(pager, imgDispatch);
  useLazyLoading('.card-img-top', imgData.images)
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

  return (
    <>
    <nav className="navbar bg-light">
          <a className="navbar-brand" href="/#">
            <h2>Contact List</h2>
          </a>
          <button className="logout-btn" type="button" onClick={handleLogout}>Logout</button>
      </nav>
      {}
    <div className="container">
      <div id='images' className="">
        <div className="row">
          {imgData.images.map((image, index) => {
            const { author, download_url } = image
            return (
              <div className="col-sm-3">
              <div key={index} className="card">
                <div className="card-body">
                  <img
                    alt={author}
                    data-src={download_url}
                    className="card-img-top"
                    src={'https://picsum.photos/id/870/300/300?grayscale&blur=2'}
                  />
                </div>
                <div className="card-footer">
                  <p className="card-text text-center text-capitalize text-primary mrB0">Name: {author}</p>
                  <p className="card-text text-center text-capitalize text-primary mrB0">Phone No.: {getPhoneNumber(10)}</p>
                </div>
              </div>
              </div>
            )
          })}
        </div>
      </div>

      {imgData.fetching && (
        <Skeleton duration={2} delay={1} count={15}/>
      )}
      <div id='page-bottom-boundary'  ref={bottomBoundaryRef}></div>
    </div>
    </>
  );
}

export default ContactList;
