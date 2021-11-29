import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen, cleanup } from "@testing-library/react";
import Reserve from "../components/reserve";
import App from "../App"
// import { store } from '../app/store';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';

import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "../ducks/event/eventSlice"
import userReducer from "../ducks/user/userSlice"
import '@testing-library/jest-dom/extend-expect'

import { server } from './mock/server'
import { Auth } from 'aws-amplify';

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue(
  Promise.resolve({
    username: 'test1234',
    attributes: {
      email: 'massurumatsuyama@gmail.com',
      email_verified: true,
      phone_number:	"+108047973830",
      phone_number_verified	: false,
      sub: "b9c20731-5728-4908-8c23-73f43889ca41"
    },
    // signInUserSession:{ idToken: {payload: ["cognito:groups"}}
  })
);
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("ReduxAsync test", () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        event: eventReducer,
        user: userReducer,
      },
    });
  });
  it('should render the component', async () => {    
    render(
      // <MemoryRouter initialEntries={["/reserve/f4f8f4a2-c563-4497-a80e-dd616106e908"]}>
      //   <Provider store={store}>
      //     <Routes>
      //       <Route path="/reserve/:id" element={<Reserve />}/>           
      //     </Routes>          
      //   </Provider>    
      // </MemoryRouter>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>      
    )        
    // screen.debug();
    expect(screen.getByText("today")).toBeTruthy();           
  })
})    