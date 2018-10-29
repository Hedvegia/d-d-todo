import gql from 'graphql-tag'

export const GET_ITEMS = gql`
  {
    getItems {
      id
      title
      notes
      state
    }
  }
`

export const CREATE_TODO = gql`
  mutation CreateTodo( $input: ListInput ) {
    createOne(input: $input) {
      id
      title
      notes
      state
    }
  }
`

export const DELETE_ONE = gql`
  mutation DeleteOne($id: String) {
    deleteOne(id: $id) {
      id
      title
      notes
      state
    }
  }
`

export const GET_ONE_ITEM = gql`
  query GetOne( $id: String ) {
    getOneItem(id: $id) {
      id
      title
      notes
      state
    }
  }
`
