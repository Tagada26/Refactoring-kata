import "jest";
import TripService from "./trip/TripService";
import User from "./user/User";

describe("TripServiceShould", () => {
  it.skip("", () => {
    //const TripDAO = require("./trip/TripDAO");
    const UserSession = require('./user/UserSession')
    jest.mock("./user/UserSession", () => {
      return jest.fn(() => { 
        return { 
            default: { getLoggedUser: () => new User()},
            esModule: true,
        }
      });
    });
    //when
    const user1 = new User();
    const tripService = new TripService();

    const callFindTripsByUser = tripService.getTripsByUser(user1);

    // then
    expect(callFindTripsByUser).toEqual([]);
    expect(callFindTripsByUser).toHaveLength(0);
  });
});



    // it("methode 3: mock module  :  ", () => {
    //     //given
    //     //jest.resetModules();
    //     jest.doMock<typeof import('./trip/TripDAO')>('./trip/TripDAO', () => {
    //         return jest.fn().mockReturnValue([]);
    //       });
    //     const user = new User()
    //     //when 
    //     //const callFindTripsByUser =  testableTripService.getTripsByUser(user)
    //     //then
    //     expect(callFindTripsByUser).toEqual([])
    //     expect(callFindTripsByUser).toHaveLength(0)
    // });
    // it.skip('hola', () => {
    //     jest.resetModules();
    //     const TripDAO = require('./trip/TripDAO')
    //     jest.mock('./trip/TripDAO', () => {
    //         return jest.fn(() => { return { 
    //             default: {findTripsByUser: () => [] }, __esModule: true}})
    //         })
    //     const UserSession = require('./user/UserSession')
    //     jest.mock('./user/UserSession', () => {
    //         return jest.fn(() => { return { 
    //             default: {
    //                 getLoggedUser: () => new User()
    //             },
    //              __esModule: true,
    //         }
    //         })
    //             })
    //         })
     
    //     //when    
    //     const user = new User()
    //     const tripService = new TripService()
    //     const callFindTripsByUser =  tripService.getTripsByUser(user)
            
    //     // then
    //     expect(callFindTripsByUser).toEqual([])
    //     expect(callFindTripsByUser).toHaveLength(0)

    // })

