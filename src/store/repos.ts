import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'

export type Repo = {
  id: string
  owner: string
  name: string
  description: string
  stars: number
  language: string
  lastActive: string
  lastMirrored: number
  issueIds: string
}

interface ReposState {
  [id: string]: Repo
}

const initialState: ReposState = {}

export const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    setRepo: (repos, action: PayloadAction<Repo>) => {
      const repo = action.payload
      repos[repo.id] = repo
    },
    deleteRepo: (repos, action: PayloadAction<string>) => {
      const id = action.payload
      delete repos[id]
    },
  },
})

export const { setRepo, deleteRepo } = reposSlice.actions

export const selectRepos = (state: RootState) => state.repos

export default reposSlice.reducer