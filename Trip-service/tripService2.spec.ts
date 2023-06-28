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

