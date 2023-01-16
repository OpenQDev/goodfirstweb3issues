import { configureStore } from '@reduxjs/toolkit'
import reposReducer from './repos'
import issuesReducer from './issues'

const store = configureStore({
  reducer: {
    repos: reposReducer,
    issues: issuesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store