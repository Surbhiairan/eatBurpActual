import {
    FETCH_REVIEWS,
    FETCH_REVIEWS_SUCCESS,
    FETCH_REVIEWS_FAILURE,
    ADD_REVIEW, 
    ADD_REVIEW_SUCCESS, 
    ADD_REVIEW_FAILURE,
  } from '../actions/reviews.action';
  
  const initialState = {
    reviews: [],
    reviewsError: null,
    reviewsLoading: false,
    newReview: [],
    newReviewError: null,
    newReviewLoading: false
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
    case FETCH_REVIEWS:
      return { ...state,  reviewsError: null, reviewsLoading: true }; 
    case FETCH_REVIEWS_SUCCESS:
      return { ...state, reviews: action.payload.reviews, reviewsError:null, reviewsLoading: false };
    case FETCH_REVIEWS_FAILURE:
      return { ...state, reviews: [], reviewsError: action.payload.error, reviewsLoading: false};  
    case ADD_REVIEW:
      return { ...state, newReviewLoading: true }; 
    case ADD_REVIEW_SUCCESS:
      return { ...state, newReview: action.payload.review, newReviewError:null, newReviewLoading: false };
    case ADD_REVIEW_FAILURE:
      return { ...state, newReview: null, newReviewError: action.payload.error, newReviewLoading: false};  
    default:
      return state;
    }
  };
  
  export default reducer;