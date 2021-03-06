import {GET_POSTS,POST_ERROR ,ADD_POST}from '../actions/types';

const initialState ={
    posts: [],
    post: null,
    loading:true,
    error:{}
};

export default function (state = initialState,action){
    const{type, payload} = action;

    switch(type){
        case GET_POSTS:
            return{
               
                posts: payload,
                loading : false
            };
        case ADD_POST:
            return{
                ...this.state,
                posts:[payload, ...state.posts],
                loading:false
            }
        case POST_ERROR:
            return{
               
                error: payload,
                loading : false
            };
        default :
            return state;
    }
    

}