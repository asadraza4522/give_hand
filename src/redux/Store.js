import { configureStore } from '@reduxjs/toolkit'
import adminReducer from './adminSlice'
import mainReducer from './MainSlice'

export default configureStore({
  reducer: {
    main : mainReducer,
    admin: adminReducer
  },
})