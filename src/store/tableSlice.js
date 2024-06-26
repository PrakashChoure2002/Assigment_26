import {createSlice} from '@reduxjs/toolkit'

const initialState=[];
const tableSlice=createSlice({

    name:'table',
    initialState,
    reducers:{
        
        remove(state,action){
            return state.filter(item=>item.id!==action.payload)
        },
        
    }
})
export const {remove}=tableSlice.actions
export default tableSlice.reducer