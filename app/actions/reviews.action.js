import { API_ROOT } from '../../api-config';
import {authGetToken} from './auth.action';

export const FETCH_REVIEWS = 'FETCH_REVIEWS';
export const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS';
export const FETCH_REVIEWS_FAILURE = 'FETCH_REVIEWS_FAILURE';
export const ADD_REVIEW = 'ADD_REVIEW';
export const ADD_REVIEW_SUCCESS = 'ADD_REVIEW_SUCCESS';
export const ADD_REVIEW_FAILURE = 'ADD_REVIEW_FAILURE';
export const FETCH_RECOMMENDATIONS = 'FETCH_RECOMMENDATIONS';
export const FETCH_RECOMMENDATIONS_SUCCESS = 'FETCH_RECOMMENDATIONS_SUCCESS';
export const FETCH_RECOMMENDATIONS_FAILURE = 'FETCH_RECOMMENDATIONS_FAILURE';

export function fetchReviews() {
  return (dispatch) => {
    dispatch(getReviews());
    dispatch(authGetToken())
    .then(token => {
        return fetch(`${API_ROOT}/getUserReviews`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
    })
    .catch(() => {
        alert("No token found");
    })
    .then(res => res.json())
    .then(json => {
       dispatch(fetchReviewsSuccess(json.success));
       return json;
    })  
    .catch(err => dispatch(fetchReviewsFailure(err)))
  };
}
     
export function getReviews() {
  return {
      type: FETCH_REVIEWS
  }
}

export function fetchReviewsSuccess(reviews) {
  return {
      type: FETCH_REVIEWS_SUCCESS,
      payload: {reviews} 
  };
}

export function fetchReviewsFailure(error) {
  return {
      type: FETCH_REVIEWS_FAILURE,
      payload: {error} 
  };
}

export function fetchRecommendations() {
  return (dispatch) => {
    dispatch(getRecommndations());
    dispatch(authGetToken())
    .then(token => {
        return fetch(`${API_ROOT}/getUserRecommendation`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
    })
    .catch(() => {
        alert("No token found");
    })
    .then(res => res.json())
    .then(json => {
       dispatch(fetchRecommendationsSuccess(json.success));
       return json;
    })  
    .catch(err => dispatch(fetchRecommendationsFailure(err)))
  };
}
     
export function getRecommndations() {
  return {
      type: FETCH_RECOMMENDATIONS
  }
}

export function fetchRecommendationsSuccess(recommendations) {
  return {
      type: FETCH_RECOMMENDATIONS_SUCCESS,
      payload: {recommendations} 
  };
}

export function fetchRecommendationsFailure(error) {
  return {
      type: FETCH_RECOMMENDATIONS_FAILURE,
      payload: {error} 
  };
}

export function addReview(data) {
  //console.log("review data=== ", data)  
  return (dispatch) => {
    dispatch(saveReview());
    dispatch(authGetToken())
    .then(token =>{
        console.log("review data ", data)
        return( 
            fetch(`${API_ROOT}/addReview`, {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'x-access-token': token
                //'Content-Type': 'multipart/form-data',
                },
                body: data,
                }
            )
        )
    })    
    .catch(() => {
        alert("No token found");
    })
    .then(
         res => res.json())
    .then(json => {
        dispatch(addReviewSuccess(json));
        return json;
    })  
    .catch(err => dispatch(addReviewFailure(err)))
  }
}
 
export function saveReview() {
  return{
      type: ADD_REVIEW     
  }
}

export function addReviewSuccess(review) {
  return {
      type: ADD_REVIEW_SUCCESS,
      payload: {review} 
  };
}

export function addReviewFailure() {
  return {
      type: ADD_REVIEW_FAILURE,
      payload: {error} 
  };
}