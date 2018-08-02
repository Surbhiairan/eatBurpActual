import {
    FETCH_REVIEWS,
    FETCH_REVIEWS_SUCCESS,
    FETCH_REVIEWS_FAILURE,
    ADD_REVIEW, 
    ADD_REVIEW_SUCCESS, 
    ADD_REVIEW_FAILURE,
    FETCH_RECOMMENDATIONS,
    FETCH_RECOMMENDATIONS_FAILURE,
    FETCH_RECOMMENDATIONS_SUCCESS
  } from '../actions/reviews.action';
  
  const initialState = {
    reviews: [],
    reviewsError: null,
    reviewsLoading: false,
    newReview: [],
    newReviewError: null,
    newReviewLoading: false,
    recommendations: [],
    recommendationsError: null,
    recommendationsLoading: false
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
    case FETCH_REVIEWS:
      return { ...state,  reviewsError: null, reviewsLoading: true }; 
    case FETCH_REVIEWS_SUCCESS:
      return { ...state, reviews: action.payload.reviews, reviewsError:null, reviewsLoading: false };
    case FETCH_REVIEWS_FAILURE:
      return { ...state, reviews: [], reviewsError: action.payload.error, reviewsLoading: false};  
    case FETCH_RECOMMENDATIONS:
      return { ...state,  recommendationsError: null, recommendationsLoading: true }; 
    case FETCH_RECOMMENDATIONS_SUCCESS:
      return { ...state, recommendations: action.payload.recommendations, recommendationsError:null, recommendationsLoading: false };
    case FETCH_RECOMMENDATIONS_FAILURE:
      return { ...state, recommendations: [], recommendationsError: action.payload.error, recommendationsLoading: false};  
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