import ACTION_TYPES from "./actionTypes";

const {
  ADD_TRANSACTION_LIST_START,
  ADD_TRANSACTION_LIST_SUCCESS,
  ADD_TRANSACTION_LIST_FAILURE,
  ADD_LISTS_START,
  ADD_LISTS_SUCCESS,
  ADD_LISTS_FAILURE,
  DELETE_TRANSACTION,
  EDIT_TRANSACTION,
} = ACTION_TYPES;

const initialState = {
  transactions: [],
  data:[],
  list:[],
};

  export default (state = initialState,{type,payload})=>{
    switch (type) {
      case ADD_TRANSACTION_LIST_START:
        return { ...state };
      case ADD_TRANSACTION_LIST_SUCCESS:
        return {
          ...state,
          transactions: payload,
        };
      case ADD_TRANSACTION_LIST_FAILURE:
        return { ...state };
  
      case ADD_LISTS_START:
        return { 
          ...state,
  
         };
      case ADD_LISTS_SUCCESS:
        return {
          ...state,
          list:payload,
      }
      case ADD_LISTS_FAILURE:
        return { ...state };
  
        case DELETE_TRANSACTION:
          const filtering=state.data.filter((transaction) => transaction.id !==payload)
          return {
            ...state,
            data: filtering,
          };

          case EDIT_TRANSACTION:
            const updatedData = state.data.map((transaction) =>
            transaction.id === payload.id ? payload : transaction
          );
          return {
            ...state,
            data: updatedData,
          };

      default:
        return state;
    }

  };
