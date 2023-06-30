import "jest";
import Trip from "./trip/Trip";

import TripService from './trip/TripService';
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
        testableTripService.setLoggedUser(loggedUser);
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
        testableTripService.setLoggedUser(loggedUser);

        const user = userFriendWithLoggedUser
        user.addFriend(loggedUser);
        //when 
        const callFindTripsByUser =  testableTripService.getTripsByUser(user)
        //then
        expect(callFindTripsByUser).toEqual([])
        expect(callFindTripsByUser).toHaveLength(0)
    })
    it('should handle the case where the logged user is friend with the user and the user has some trips', () => {
        //given
        const testableTripService = new TestableTripService()
        testableTripService.setLoggedUser(loggedUser);

        const user = userFriendWithLoggedUserWithTrip
        user.addFriend(loggedUser);
        //when 
        const callFindTripsByUser =  testableTripService.getTripsByUser(user)
        //then
        expect(callFindTripsByUser).toEqual(expect.arrayContaining([trip]))
        expect(callFindTripsByUser).toHaveLength(1)
    })
    it('should handle the case where the logged user is friend with the user and the user has some trips', () => {
        //given
        const testableTripService = new TestableTripService()
        testableTripService.setLoggedUser(loggedUser);

        const user = userFriendWithLoggedUserWithTrip
        user.addFriend(loggedUser);
        //when 
        const callFindTripsByUser =  testableTripService.getTripsByUser(user)
        //then
        expect(callFindTripsByUser).toEqual(expect.arrayContaining([trip]))
        expect(callFindTripsByUser).toHaveLength(1)
    })
})


const userRepo = new Map();
const loggedUser = new User();
const userFriendWithLoggedUser = new User();
const userFriendWithLoggedUserWithTrip = new User();
const trip = new Trip()


userRepo.set(loggedUser, { trips: [], friends: []})
userRepo.set(userFriendWithLoggedUser, { trips: [], friends: [loggedUser]})
userRepo.set(userFriendWithLoggedUserWithTrip, { trips: [trip], friends: [loggedUser]})


export default interface TripRepository {
    findTripsByUser(user: User): Trip[];
}
class FakeTripDAO {
    public static findTripsByUser(user: User): Trip[] {
        return []
    }
}
class TestableTripService extends TripService {
    private loggedUser: User | null = null
    
    public override findTripsByUser(user: User): Trip[] {
        const userData = userRepo.get(user);
        return userData.trips
    }
    public override getLoggedUser(): any { // pas trouvé mieux pour le type de retour :/
        return this.loggedUser
    }

    public setLoggedUser(user: User): void {
        this.loggedUser = user;
    }
}
