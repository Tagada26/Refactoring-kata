import User from "../user/User";
import Trip from "./Trip";

export const userRepo = new Map();
export const loggedUser = new User();
export const userFriendWithLoggedUser = new User();


userRepo.set(loggedUser, { trips: [], friends: []})
userRepo.set(userFriendWithLoggedUser, { trips: [], friends: [loggedUser]})
// userRepo.set(userWithTrips, { trips: [], friends: []})
// userRepo.set(loggedUser, { trips: [], friends: []})
// userRepo.set(loggedUser, { trips: [], friends: []})


export default interface TripRepository {
    findTripsByUser(user: User): Trip[];
}