describe('Position Detail Page E2E Tests', () => {
    beforeEach(() => {
        // Intercept API calls to ensure data is loaded
        cy.intercept('GET', '**/positions/1/interviewFlow').as('getInterviewFlow');
        cy.intercept('GET', '**/positions/1/candidates').as('getCandidates');
        cy.intercept('PUT', '**/candidates/*').as('updateCandidate');

        // Visit the Position Detail page for ID 1
        cy.visit('http://localhost:3000/positions/1');

        // Wait for initial data to load
        cy.wait(['@getInterviewFlow', '@getCandidates']);
    });

    it('should display the correct position title', () => {
        // Verify that the title is displayed (h2 in PositionDetails.js)
        cy.get('h2').should('be.visible').and('not.be.empty');
    });

    it('should display the correct columns (stages)', () => {
        // In StageColumn.js, column titles are in .card-header
        cy.get('.card-header').should('have.length.at.least', 1);
    });

    it('should display candidate cards in the columns', () => {
        // Verify that at least one candidate card exists across all columns
        cy.get('.card.mb-2').should('have.length.at.least', 1);
    });

    it('should move a candidate to another column and update the backend', () => {
        // We pick the first candidate card
        cy.get('.card.mb-2').first().as('candidateCard');

        // Perform Drag and Drop using keyboard for react-beautiful-dnd
        // 1. Focus and pick up with Space
        cy.get('@candidateCard')
            .focus()
            .trigger('keydown', { keyCode: 32, which: 32 }); // Space

        // 2. Move to the right with Right Arrow
        cy.get('@candidateCard')
            .trigger('keydown', { keyCode: 39, which: 39, force: true }) // Right Arrow
            .wait(500)
            .trigger('keydown', { keyCode: 32, which: 32, force: true }); // Space to drop

        // Verify the backend call
        cy.wait('@updateCandidate', { timeout: 10000 }).then((interception) => {
            expect(interception.request.method).to.equal('PUT');
            expect(interception.request.body).to.have.property('currentInterviewStep');
            expect(interception.response.statusCode).to.equal(200);
        });
    });
});
