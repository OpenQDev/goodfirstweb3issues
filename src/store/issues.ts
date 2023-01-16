import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'

export type Issue = {
  id: string
  title: string
  url: string
  assignee: string
}

interface IssueState {
  [id: string]: Issue
}

const initialState: IssueState = {}

export const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setIssue: (issues, action: PayloadAction<Issue>) => {
      const issue = action.payload
      issues[issue.id] = issue
    },
    deleteIssue: (issues, action: PayloadAction<string>) => {
      const id = action.payload
      delete issues[id]
    },
  },
})

export const { setIssue, deleteIssue } = issuesSlice.actions

export const selectIssues = (state: RootState) => state.issues

export default issuesSlice.reducer