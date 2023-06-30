import { getPricer } from "./pricer";

describe("Pricer implementation", () => {

  it("should return the price for one article from a sentence", () => {
    //given 
    const article = '1 articles à 1,21 € et taxe 0 %' 

    //when 
    const articlePrice = getPricer(article)

    //then 
    expect(articlePrice).toEqual('1.21 €')
  });
  it("should return the price for x articles from a sentence", () => {
    //given 
    const article = '3 articles à 1,21 € et taxe 0 %' 

    //when 
    const articlePrice = getPricer(article)

    //then 
    expect(articlePrice).toEqual('3.63 €')
  });
  it("should return the price with taxes for x articles from a sentence", () => {
    //given 
    const article = '3 articles à 1,21 € et taxe 5 %' 

    //when 
    const articlePrice = getPricer(article)

    //then 
    expect(articlePrice).toEqual('3.81 €')
  });
  it("should return the price with taxes for x articles from a sentence", () => {
    //given 
    const article = '3 articles à 1,21 € et taxe 20 %' 

    //when 
    const articlePrice = getPricer(article)

    //then 
    expect(articlePrice).toEqual('4.36 €')
  });
  it("should apply 3% discounts when HT price is > 1000euros", () => {
    //given 
    const article = '5 articles à 345,00 € et taxe 10 %' 

    //when 
    const articlePrice = getPricer(article)

    //then 
    expect(articlePrice).toEqual('1840.58 €')
  });
  it("should apply 5% discounts when HT price is > 5000euros", () => {
    //given 
    const article = '5 articles à 1299,00 € et taxe 10 %' 

    //when 
    const articlePrice = getPricer(article)

    //then 
    expect(articlePrice).toEqual('6787.28 €')
  });
});
