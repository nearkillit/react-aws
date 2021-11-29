/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      event_id
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        event_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listUsersId = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id        
        event_id        
      }
      nextToken
    }
  }
`;
export const getSpEvent = /* GraphQL */ `
  query GetSpEvent($id: ID!) {
    getSpEvent(id: $id) {
      id
      name
      time
      manager
      color
      people
      place
      start
      createdAt
      updatedAt
    }
  }
`;
export const listSpEvents = /* GraphQL */ `
  query ListSpEvents(
    $filter: ModelSpEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSpEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        time
        manager
        color
        people
        place
        start
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSubEvent = /* GraphQL */ `
  query GetSubEvent($id: ID!) {
    getSubEvent(id: $id) {
      id
      name
      time
      manager
      color
      people
      place
      days {
        start_time
        dow
      }
      createdAt
      updatedAt
    }
  }
`;
export const listSubEvents = /* GraphQL */ `
  query ListSubEvents(
    $filter: ModelSubEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        time
        manager
        color
        people
        place
        days {
          start_time
          dow
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDelEvent = /* GraphQL */ `
  query GetDelEvent($id: ID!) {
    getDelEvent(id: $id) {
      id
      day
      sub_event_id
      createdAt
      updatedAt
    }
  }
`;
export const listDelEvents = /* GraphQL */ `
  query ListDelEvents(
    $filter: ModelDelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDelEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        day
        sub_event_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
