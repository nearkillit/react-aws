/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      email
      event_id
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      email
      event_id
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      email
      event_id
      createdAt
      updatedAt
    }
  }
`;
export const createSpEvent = /* GraphQL */ `
  mutation CreateSpEvent(
    $input: CreateSpEventInput!
    $condition: ModelSpEventConditionInput
  ) {
    createSpEvent(input: $input, condition: $condition) {
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
export const updateSpEvent = /* GraphQL */ `
  mutation UpdateSpEvent(
    $input: UpdateSpEventInput!
    $condition: ModelSpEventConditionInput
  ) {
    updateSpEvent(input: $input, condition: $condition) {
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
export const deleteSpEvent = /* GraphQL */ `
  mutation DeleteSpEvent(
    $input: DeleteSpEventInput!
    $condition: ModelSpEventConditionInput
  ) {
    deleteSpEvent(input: $input, condition: $condition) {
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
export const createSubEvent = /* GraphQL */ `
  mutation CreateSubEvent(
    $input: CreateSubEventInput!
    $condition: ModelSubEventConditionInput
  ) {
    createSubEvent(input: $input, condition: $condition) {
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
export const updateSubEvent = /* GraphQL */ `
  mutation UpdateSubEvent(
    $input: UpdateSubEventInput!
    $condition: ModelSubEventConditionInput
  ) {
    updateSubEvent(input: $input, condition: $condition) {
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
export const deleteSubEvent = /* GraphQL */ `
  mutation DeleteSubEvent(
    $input: DeleteSubEventInput!
    $condition: ModelSubEventConditionInput
  ) {
    deleteSubEvent(input: $input, condition: $condition) {
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
export const createDelEvent = /* GraphQL */ `
  mutation CreateDelEvent(
    $input: CreateDelEventInput!
    $condition: ModelDelEventConditionInput
  ) {
    createDelEvent(input: $input, condition: $condition) {
      id
      day
      sub_event_id
      createdAt
      updatedAt
    }
  }
`;
export const updateDelEvent = /* GraphQL */ `
  mutation UpdateDelEvent(
    $input: UpdateDelEventInput!
    $condition: ModelDelEventConditionInput
  ) {
    updateDelEvent(input: $input, condition: $condition) {
      id
      day
      sub_event_id
      createdAt
      updatedAt
    }
  }
`;
export const deleteDelEvent = /* GraphQL */ `
  mutation DeleteDelEvent(
    $input: DeleteDelEventInput!
    $condition: ModelDelEventConditionInput
  ) {
    deleteDelEvent(input: $input, condition: $condition) {
      id
      day
      sub_event_id
      createdAt
      updatedAt
    }
  }
`;
