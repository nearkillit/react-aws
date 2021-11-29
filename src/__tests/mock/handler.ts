import { setupWorker, graphql } from 'msw'
import { API, graphqlOperation } from 'aws-amplify';
import { listSubEvents, listSpEvents, listDelEvents, listUsersId } from '../../graphql/queries';

// const apiData = await API.graphql({ query: listSubEvents });    

export const handlers = [
  graphql.query(listSpEvents, (req, res, ctx) => {
    return res(
      ctx.data({
        listSpEvents:{
          items:[{
            id: "f4f8f4a2-c563-4497-a80e-dd616106e908",
            name: "test",
            time: 60,
            manager: "test manager",
            color: "#666",
            people: 10,
            place: "test place",
            start: "2021-11-30T01:00:03.000Z", 
          }]
        }
      })
    )
  })
]