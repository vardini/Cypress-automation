/// <reference types="cypress" />

describe('My First Test', () => {
  beforeEach(()=>{
    cy.visit('https://testing.d3eymc78cqte40.amplifyapp.com/login')
  
      cy.get('#username').type('TestUser123')
      cy.get('#password').type('123456')
      cy.contains('Login').click()
  })


    it('Login', () => {
      cy.visit('https://testing.d3eymc78cqte40.amplifyapp.com/login')
  
      cy.get('#username').type('TestUser123')
      cy.get('#password').type('123456')
      cy.contains('Login').click()
  
      // Should be on a new URL which includes '/commands/actions'
      cy.url().should('include', '/orders')
      
    })

    it('Verify Mandotory fields and Error messages', () => {
      cy.contains('Place an order').click()
      cy.contains('Partner order Id*').should('exist')
      cy.contains('Order type*').should('exist')
      cy.contains('Payment Collection*').should('exist')
      cy.contains('Delivery Partner*').should('exist')
      cy.contains('Customer Details:').should('exist')
      cy.contains('Name*').should('exist')
      cy.contains('Mobile*').should('exist')
      cy.contains('Alternate Mobile').should('exist')
      cy.contains('Email').should('exist')
      cy.contains('Address*').should('exist')
      cy.contains('Landmark*').should('exist')
      cy.contains('Pin Code*').should('exist')
      cy.contains('City*').should('exist')
      cy.contains('State*').should('exist')
      cy.contains('Upload prescriptions:').should('exist')
      cy.contains('Item Details:').should('exist')
      cy.contains('Doctor').should('exist')
      
      cy.get('div[class=css-598pj6]').should('exist')

      cy.contains('Partner order Id*').dblclick()
      cy.contains('Partner order id is required').should('be.visible')

      cy.get('#order_type').select('Select order type')
      
      cy.get('#payment_collection').select('Select payment collector')
    
      cy.get('#delivery_partner').select('Select delivery partner')
      cy.contains('Order Type').click()


      cy.contains('Order Type is required').should('be.visible')
      cy.contains('Payment Collection is required').should('be.visible')
      cy.contains('Delivery Partner is required').should('be.visible')

      
      cy.contains('Name*').dblclick()
      cy.contains('Name is required').should('be.visible')

      cy.contains('Mobile*').dblclick()
      cy.contains('Must be 10 digit').should('be.visible')

      cy.contains('Address*').dblclick()
      cy.contains('Address is required').should('be.visible')

      cy.contains('Landmark*').dblclick()
      cy.contains('Landmark is required').should('be.visible')

      cy.contains('Pin Code*').dblclick()
      cy.contains('Valid pin code is required').should('be.visible')

      cy.contains('Address*').dblclick()
      cy.contains('Address is required').should('be.visible')

      cy.contains('City*').dblclick()
      cy.contains('City is required').should('be.visible')

      cy.contains('State*').dblclick()
      cy.contains('State is required').should('be.visible')
     
    })
   

    it('Verify dropdown values', () => {
      
      cy.contains('Place an order').click()
      
      cy.contains('Partner order Id*').click()
      
//payment collection dropdown
      cy.get('#payment_collection')
      .should('have.value','self')
      cy.get('#payment_collection').select('Medpay')
      .should('have.value','medpay')
//Delivery partner dropdown
      cy.get('#delivery_partner').select('Medpay')
      .should('have.value','medpay')
      cy.get('#delivery_partner').select('Self Pickup')
      .should('have.value','self_pickup')
    })

    it.only('Place an Order', () => {
      
      cy.contains('Place an order').click()
      cy.contains('Partner order Id').type('Order2')
      cy.get('#name').type('Vardini')
      cy.contains('Mobile').type('9999999999')
      cy.get('#address').type('Address 123')
      cy.contains('Landmark').type('near landmark')
      cy.contains('Pin Code').type('600024')
      cy.get('#city').click()
      cy.wait(4000)
      cy.get('#city').should('have.value','Chennai')
      cy.get('#state').should('have.value','Tamil Nadu')

    //add 2 items
     cy.contains('Item name').type('Tonact Asp 75mg Strip Of 15 Capsules')
     .wait(4000)
     cy.get('div[style="display: inline-block;"]').type('Tonact Asp 75mg Strip Of 15 Capsules{enter}')

     cy.contains('Item name').type('Crocin 650mg Advance Tab')
     .wait(4000)
     cy.get('div[style="display: inline-block;"]').type('Crocin 650mg Advance Tab 15{enter}')

     //delete 1 item
     cy.get('button[aria-label=delete]').eq(1).click()

     //Verify upload prescripton alert
     cy.get('button[type=submit]').click()
     cy.on('window:alert',(txt)=>{
       
       expect(txt).to.contains('Please upload prescription.');
     })

 //Verify Duplicate OrderID assertion
/* cy.on('window:alert',(msg)=>{
      
  expect(msg).to.contains('order with same partner_order_id already exist.');
})
     //attach prescription
     const filepath = 'images/evening.jfif'
        cy.get('input[type="file"]').attachFile(filepath)
        //cy.get('#file-submit').click()
       cy.wait(3000)
       */
    cy.get('button[type=submit]').click()
    
   

    

    })

   it('Verify the placed order', () => {
     //verify the placed order
/*
     cy.contains('VV123').should('have.value','VV123')
     cy.contains('14 Nov 2021, 04:40:43 pm').should('have.value','14 Nov 2021, 04:40:43 pm')
     cy.contains('VARDINI').should('have.value','VARDINI')
     cy.contains('Pending').should('have.value','Pending')
     cy.contains('invoice not yet generated').should('have.value','invoice not yet generated')
     cy.contains('chennai').should('have.value','chennai')
     cy.contains('600024').should('have.value','600024')
*/
    cy.contains('Order2').click()
     cy.contains('Partner order ID:Order2')
     cy.contains('Partner:testpartner')
     cy.contains('Delivery type:medpay')
     cy.contains('Payment collection:self')
     cy.contains('Name:Vardini')
     cy.contains('Mobile:9999999999')
     cy.contains('Address:Address 123, near landmark, chennai, Tamil Nadu - 600024')
     cy.contains('Tonact Asp 75mg Strip Of 15 Capsules')
     cy.contains('15 Capsule(s) in Strip')
     
     cy.get('table[role=table]')
     .eq(2).click()

     cy.contains('Grand Total43.00')

    
  })
})
