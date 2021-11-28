/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      name
      email
      event_id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      name
      email
      event_id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      name
      email
      event_id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSpEvent = /* GraphQL */ `
  subscription OnCreateSpEvent {
    onCreateSpEvent {
      id
      name
      time
      manager
      color
      people
      start
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSpEvent = /* GraphQL */ `
  subscription OnUpdateSpEvent {
    onUpdateSpEvent {
      id
      name
      time
      manager
      color
      people
      start
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSpEvent = /* GraphQL */ `
  subscription OnDeleteSpEvent {
    onDeleteSpEvent {
      id
      name
      time
      manager
      color
      people
      start
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSubEvent = /* GraphQL */ `
  subscription OnCreateSubEvent {
    onCreateSubEvent {
      id
      name
      time
      manager
      color
      people
      days {
        start_time
        dow
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSubEvent = /* GraphQL */ `
  subscription OnUpdateSubEvent {
    onUpdateSubEvent {
      id
      name
      time
      manager
      color
      people
      days {
        start_time
        dow
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSubEvent = /* GraphQL */ `
  subscription OnDeleteSubEvent {
    onDeleteSubEvent {
      id
      name
      time
      manager
      color
      people
      days {
        start_time
        dow
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateDelEvent = /* GraphQL */ `
  subscription OnCreateDelEvent {
    onCreateDelEvent {
      id
      day
      sub_event_id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDelEvent = /* GraphQL */ `
  subscription OnUpdateDelEvent {
    onUpdateDelEvent {
      id
      day
      sub_event_id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDelEvent = /* GraphQL */ `
  subscription OnDeleteDelEvent {
    onDeleteDelEvent {
      id
      day
      sub_event_id
      createdAt
      updatedAt
    }
  }
`;
