
describe('Authenticator:', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000/');
    });
  
    describe('Sign In:', () => {
      it('allows a user to signin', () => {
        cy.get("amplify-authenticator").shadow().find("amplify-sign-in").shadow()
        .find(selectors.usernameInput).type(
          'test1234'
        );
        cy.get("amplify-authenticator").shadow().find("amplify-sign-in").shadow()
        .find(selectors.signInPasswordInput).type(
          'test1234'
        );
        cy.get("amplify-authenticator").shadow().find("amplify-sign-in").shadow()

        cy.get("amplify-authenticator").shadow().find("amplify-sign-in").shadow()
        .find(selectors.signInSignInButton)
          .contains('Sign In')
          .click();

        cy.get(selectors.root).contains('ようこそ');
      });
    });
  });
  export const selectors = {
    usernameInput: '#username',
    signInPasswordInput: '#password',
    signInSignInButton: '[data-test="sign-in-sign-in-button"]',
    root: '#root'
  };