// import { legacy_createStore } from "redux";
import {
	configureStore,
	// createAction,
	// createReducer,
	createSlice,
} from "@reduxjs/toolkit";

// const reducer = (state = [], action) => {
//   switch (action.type) {
//     case addToDo.type:
//       return [{ text: action.payload, id: Date.now() }, ...state];
//     case deleteToDo.type:
//       return state.filter(toDo => toDo.id !== action.payload);
//     default:
//       return state;
//   }
// };

// const addToDo = createAction("ADD");
// const deleteToDo = createAction("DELETE");

// const reducer = createReducer([], {
// 	[addToDo]: (state, action) => {
//     // 이제는 mutate해도 되는데 뒤에서 toolkit이 알아서 return 해주고있다.
//     // 여긴 return 하면안된다 뭔가를 return하려면 꼭 새로운 state가 필요하다
// 		state.push({ text: action.payload, id: Date.now() });
// 	},
// 	[deleteToDo]: (state, action) => {
//     state.filter(toDo => toDo.id !== action.payload);
//   },
// });

const toDos = createSlice({
	name: "toDosReducer",
	initialState: [],
	reducers: {
		add: (state, action) => {
			state.push({ text: action.payload, id: Date.now() });
		},
		remove: (state, action) => {
			return state.filter(toDo => toDo.id !== action.payload);
		},
	},
});

const store = configureStore({ reducer: toDos.reducer });
export const { add, remove } = toDos.actions;
export default store;
