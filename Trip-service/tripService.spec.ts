import "jest";
import Trip from "./trip/Trip";
import TripService from './trip/TripService' 
import { loggedUser, userFriendWithLoggedUser, userRepo } from "./trip/TripServiceRepository";
import User from "./user/User";

//Documentation
// https://jestjs.io/docs/manual-mocks
// https://jestjs.io/docs/jest-object#jestmockmodulename-factory-options


describe("TripServiceShould", () => {
    it("...", () => {
        expect(4 + 4).toBe(8);
    });
    it.skip("methode 1 :  ", () => {
        //given
        const srv: any = new TripService();
        srv.findTripsByUser = () => [];
        srv.getLoggedUser= () => new User();
        // srv.getTripsByUser(new User());
        // const testableTripService = new TestableTripService()
        const user = new User()
        //when 
        const callFindTripsByUser =  srv.getTripsByUser(user)
        //then
        expect(callFindTripsByUser).toEqual([])
        expect(callFindTripsByUser).toHaveLength(0)
    });
    it("methode 2: classe fille :  ", () => {
        //given
        const testableTripService = new TestableTripService()
        const user = new User()
        user.addFriend(new User());
        //when 
        const callFindTripsByUser =  testableTripService.getTripsByUser(user)
        //then
        expect(callFindTripsByUser).toEqual([])
        expect(callFindTripsByUser).toHaveLength(0)
    });
    it('should handle the case where the logged user is friend with the user for which they get trips', () => {
        //given
        const testableTripService = new TestableTripService()
        const user = new User()
        user.addFriend(new User());
        //when 
        const callFindTripsByUser =  testableTripService.getTripsByUser(user)
        //then
        expect(callFindTripsByUser).toEqual([])
        expect(callFindTripsByUser).toHaveLength(0)
    })
    

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

})
class FakeTripDAO {
    public static findTripsByUser(user: User): Trip[] {
        return []
    }
}

class TestableTripService extends TripService {
    
    public override findTripsByUser(user: User): Trip[] {
        const userData = userRepo.get(user);
        return userData.trips
    }
    public override getLoggedUser(): User {
        return new User()
    }
}
