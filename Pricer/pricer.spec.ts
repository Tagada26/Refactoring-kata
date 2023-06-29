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
  it.skip("should return the price with taxes for x articles from a sentence", () => {
    //given 
    const article = '3 articles à 1,21 € et taxe 5 %' 

    //when 
    const articlePrice = getPricer(article)

    //then 
    expect(articlePrice).toEqual('3.81 €')
  });
});
