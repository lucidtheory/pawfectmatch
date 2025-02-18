import { updateQueryWithNewFrom } from "./useSearchDogs";

describe("updateQueryWithNewFrom", () => {
  it('should remove "from" from prevPath and add it from newPath', () => {
    const prevPath = "/search?from=oldValue";
    const newPath = "/search?from=newValue";

    const result = updateQueryWithNewFrom(prevPath, newPath);

    expect(result).toBe("from=newValue");
  });

  it('should add "from" from newPath when prevPath does not contain "from"', () => {
    const prevPath = "/search";
    const newPath = "/search?from=newValue";

    const result = updateQueryWithNewFrom(prevPath, newPath);

    expect(result).toBe("from=newValue");
  });

  it("should handle null values for prevPath or newPath", () => {
    const prevPath = null;
    const newPath = "/search?from=newValue";

    const result = updateQueryWithNewFrom(prevPath, newPath);

    expect(result).toBe("from=newValue");
  });
});
