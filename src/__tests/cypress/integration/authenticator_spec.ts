// describe('Authenticator:', function() {
//     beforeEach(function() {
//       cy.visit('/');
//     });
  
//     describe('Sign In:', () => {
//       it('allows a user to signin', () => {
//         cy.get(selectors.usernameInput).type(
//           'テスト用に作成したアカウント名'
//         );
//         cy.get(selectors.signInPasswordInput).type(
//           'テスト用に作成したアカウントのパスワード'
//         );
//         cy.get(selectors.signInSignInButton)
//           .contains('Sign In')
//           .click();
//         cy.get(selectors.root).contains('Global');
//       });
//     });
//   });
//   export const selectors = {
//     usernameInput: '[data-test="username-input"]',
//     signInPasswordInput: '[data-test="sign-in-password-input"]',
//     signInSignInButton: '[data-test="sign-in-sign-in-button"]',
//     root: '#root'
//   };