import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import UserSession from "../user/UserSession";
import Trip from "./Trip";
import TripDAO from "./TripDAO";

export default class TripService {
  public getTripsByUser(user: User): Trip[] {
    if (this.isNotLoggedIn()) {
      throw new UserNotLoggedInException();
    }

    if (this.isFriendWithLoggedUser(user)) {
      return this.findTripsByUser(user);
    }
    return [];
  }

  private isNotLoggedIn() {
    return this.getLoggedUser() === null;
  }

  private isFriendWithLoggedUser(user: User) {
    return user.getFriends().some((friend) => friend === this.getLoggedUser());
  }

  protected getLoggedUser(): User {
    return UserSession.getLoggedUser();
  }

  protected findTripsByUser(user: User): Trip[] {
    return TripDAO.findTripsByUser(user);
  }
}
