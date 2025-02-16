import { generateQuery, SearchState } from "store/slices/search";

describe("generateQuery", () => {
  it("should return an empty string for default state", () => {
    const state: SearchState = {
      breeds: [],
      zipCodes: [],
      ageMin: undefined,
      ageMax: undefined,
      size: undefined,
      sortBy: "breed",
      sortOrder: "asc",
      query: "",
    };
    expect(generateQuery(state)).toBe("sort=breed%3Aasc");
  });

  it("should generate a query string for breeds", () => {
    const state: SearchState = {
      breeds: ["Labrador", "Poodle"],
      zipCodes: [],
      sortBy: "breed",
      sortOrder: "asc",
      query: "",
    };
    expect(generateQuery(state)).toBe(
      "breeds=Labrador&breeds=Poodle&sort=breed%3Aasc",
    );
  });

  it("should generate a query string for zip codes", () => {
    const state: SearchState = {
      breeds: [],
      zipCodes: ["12345", "67890"],
      sortBy: "breed",
      sortOrder: "asc",
      query: "",
    };
    expect(generateQuery(state)).toBe(
      "zipCodes=12345&zipCodes=67890&sort=breed%3Aasc",
    );
  });

  it("should generate a query string for age range", () => {
    const state: SearchState = {
      breeds: [],
      zipCodes: [],
      ageMin: 1,
      ageMax: 5,
      sortBy: "breed",
      sortOrder: "asc",
      query: "",
    };
    expect(generateQuery(state)).toBe("ageMin=1&ageMax=5&sort=breed%3Aasc");
  });

  it("should generate a query string for size", () => {
    const state: SearchState = {
      breeds: [],
      zipCodes: [],
      size: 25,
      sortBy: "breed",
      sortOrder: "asc",
      query: "",
    };
    expect(generateQuery(state)).toBe("size=25&sort=breed%3Aasc");
  });

  it("should generate a full query string with all parameters", () => {
    const state: SearchState = {
      breeds: ["Labrador"],
      zipCodes: ["12345"],
      ageMin: 2,
      ageMax: 8,
      size: 20,
      sortBy: "name",
      sortOrder: "desc",
      query: "",
    };
    expect(generateQuery(state)).toBe(
      "breeds=Labrador&zipCodes=12345&ageMin=2&ageMax=8&size=20&sort=name%3Adesc",
    );
  });
});
