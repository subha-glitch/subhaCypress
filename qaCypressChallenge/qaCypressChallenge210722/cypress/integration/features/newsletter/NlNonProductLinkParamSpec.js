
import NlTemplatePO from '../../../support/pageObjects/NlTemplatePO';
import NlHelper from '../../../support/helpers/NlHelper';
/// <reference types="Cypress" />

describe('Check something for something', () => {
    /** @type {NlHelper} */
    const nlHelper = new NlHelper();

    /** @type {object} */
    const nlUrlList = nlHelper.getTestData('nlUrls.json');

    //hard coded and outdated test data -> new test data is in nlUrls.json
    /** @type {string} */
    let nlUrl = "https://news.shopping.check24.de/u/gm.php?prm=VDLjGz1AeJ_766749435_6267609_1";

    /** @type {NlTemplatePO} */
    const nlTemplatePO = new NlTemplatePO(nlUrl);

    // Ignore errors from the site itself
    Cypress.on('uncaught:exception', () => {
        return false;
    });

    it('C962349 Check if utm_campaign value of all non product links is the same, tested newsletter url: ', () => {
        //open nl
        /* Add your test code here
       //filter out all links which contain utm_campaign
       //check if the links were found
       //check if all paramter values are equal to each other
       */

        Object.keys(nlUrlList).forEach(function (key) {
            cy.log('Key : ' + key + ', Value : ' + nlUrlList[key])
            cy.visit(nlUrlList[key]);
            cy.get(nlTemplatePO.getLinksByElementAttribute("a[href*='utm_campaign']", "href")).each(($item) => {
                var cger = nlHelper.extractParameterValues($item, "utm_campaign")
                let text = []
                cy.log($item)
                Object.values(cger).map((val) => {
                    cy.log(val.parameterValue)
                    text.push(val.parameterValue)
                })

                cy.log(text)

                function areTheySame(sm) {
                    //can put array elements in a HashSet
                    let same = new Set(sm);
                    return (same.size == 1);
                }
                let sm = text;
                if (areTheySame(sm))               
                { 
                    cy.log("<<<Same>>>"); 
                }

                else{
                    cy.log("***Not Same***");
                }
                    

            });

        })

    });

    it('C955682 Check if wpset value of all non product links is the same, tested newsletter url: ', () => {
        //open nl

        /* Add your test code here
        //filter out all links which contain wpset
        //check if the links were found
        //check if all paramter values are equal to each other
        */
        Object.keys(nlUrlList).forEach(function (key) {
            cy.log('Key : ' + key + ', Value : ' + nlUrlList[key])
            cy.visit(nlUrlList[key]);
            cy.get(nlTemplatePO.getLinksByElementAttribute("a[href*='wpset']", "href")).each(($item) => {
                var cger2 = nlHelper.extractParameterValues($item, "wpset")
                let text1 = [];
                Object.values(cger2).map((valu) => {
                    cy.log(valu.parameterValue)
                    text1.push(valu.parameterValue)
                })
                cy.log(text1)
                function sameOrNot(smDiff) {
                    // array elements in a HashSet
                    let check1 = new Set(smDiff);

                    return (check1.size == 1);
                }

                let check_sameDif = text1
                if (sameOrNot(check_sameDif)) {
                    cy.log("<<<Same>>>");
                }

                else {
                    cy.log("***Not Same***");
                }


            });

        })
    })


});
