describe('Login', () => {
  it('should show error', () => {
    cy.visit('/')
    cy.get('.LoginForm__username').type('Wrong username')
    cy.get('.LoginForm__password').type('Wrong password')
    cy.get('.LoginForm button[type="submit"]').click()
    cy.url().should('contain', '/login')
    cy.get('.LoginForm .mutation-error').should('contain', 'Try later please')
  })

  it('should login', () => {
    cy.login()
    cy.url().should('not.contain', '/login')
  })
})

describe('Filter characters by planet', () => {
  before(() => {
    cy.login()
  })

  it('should filter characters', () => {
    cy.visit('/characters')

    cy.get('.CharactersGrid > article').then((cards) => {
      const characterCardsOriginalLength = cards.length

      const planetName = 'Aargau'
      cy.get('.FilterByPlanet > div').click()
      cy.get('.FilterByPlanet').contains(planetName).click()
      cy.wait(2000)
      cy.get('.CharactersGrid > article')
        .its('length')
        .should('be.lt', characterCardsOriginalLength)
    })
  })
})

describe('Create Planet', () => {
  beforeEach(() => {
    cy.login()
  })

  it('should show errors', () => {
    cy.visit('/planets/create')

    cy.get('button[type="submit"]').click()
    cy.wait(1000)
    cy.get('label[for="pictureUrl"] ~ span[role="alert"]').should(
      'contain',
      'required'
    )
    cy.get('label[for="code"] ~ span[role="alert"]').should(
      'contain',
      'required'
    )
    cy.get('label[for="name"] ~ span[role="alert"]').should(
      'contain',
      'required'
    )
    cy.get('label[for="description"] ~ span[role="alert"]').should(
      'contain',
      'required'
    )
  })

  it('should create planet', () => {
    cy.visit('/planets/create')

    cy.get('input[name="pictureUrl"]').type('https://image.com/image')
    cy.get('input[name="code"]').type('WD-FGG-43')
    cy.get('input[name="name"]').type('My planet')
    cy.get('textarea[name="description"]').type(
      'This is the description of my planet'
    )
    cy.get('button[type="submit"]').click()
    cy.url().should('not.contain', '/create')
    cy.get('.PlanetsGrid article').eq(0).should('contain', 'My planet')
  })
})

describe('Create Character', () => {
  beforeEach(() => {
    cy.login()
  })

  it('should show errors', () => {
    cy.visit('/characters/create')

    cy.get('button[type="submit"]').click()
    cy.wait(1000)
    cy.get('label[for="pictureUrl"] ~ span[role="alert"]').should(
      'contain',
      'required'
    )
    cy.get('label[for="bornAt"] ~ span[role="alert"]').should(
      'contain',
      'required'
    )
    cy.get('label[for="planet"] ~ span[role="alert"]').should(
      'contain',
      'required'
    )
    cy.get('label[for="name"] ~ span[role="alert"]').should(
      'contain',
      'required'
    )
    cy.get('label[for="description"] ~ span[role="alert"]').should(
      'contain',
      'required'
    )
  })

  it('should create character', () => {
    cy.visit('/characters/create')

    cy.get('input[name="pictureUrl"]').type('https://image.com/image')
    cy.get('input[name="bornAt"]').type('1943-10-15')
    cy.get('input[name="planet"]').type('WD-FGG-43')
    cy.get('input[name="name"]').type('My character')
    cy.get('textarea[name="description"]').type(
      'This is the description of my character'
    )
    cy.get('button[type="submit"]').click()
    cy.url().should('contain', '/characters')
    cy.url().should('not.contain', '/create')
    cy.get('.CharactersGrid article').first().should('contain', 'My character')
  })
})
