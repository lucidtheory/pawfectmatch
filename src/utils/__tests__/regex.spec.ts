import { EMAIL_REGEX, NAME_REGEX, ZIP_CODE_REGEX } from "utils/regex";

describe("Regex Patterns", () => {
  describe("EMAIL_REGEX", () => {
    it("should match valid email addresses", () => {
      expect(EMAIL_REGEX.test("example@email.com")).toBe(true);
      expect(EMAIL_REGEX.test("user.name+tag@domain.co.uk")).toBe(true);
      expect(EMAIL_REGEX.test("123456@domain.com")).toBe(true);
    });

    it("should not match invalid email addresses", () => {
      expect(EMAIL_REGEX.test("plainaddress")).toBe(false);
      expect(EMAIL_REGEX.test("user@com")).toBe(false);
      expect(EMAIL_REGEX.test("user@domain,com")).toBe(false);
      expect(EMAIL_REGEX.test("@missingusername.com")).toBe(false);
    });
  });

  describe("NAME_REGEX", () => {
    it("should match valid names", () => {
      expect(NAME_REGEX.test("Bob")).toBe(true);
      expect(NAME_REGEX.test("Bob Jones")).toBe(true);
      expect(NAME_REGEX.test("Alice Marie Smith")).toBe(true);
    });

    it("should not match invalid names", () => {
      expect(NAME_REGEX.test("Bob123")).toBe(false);
      expect(NAME_REGEX.test("John_Doe")).toBe(false);
      expect(NAME_REGEX.test(" ")).toBe(false);
      expect(NAME_REGEX.test("123")).toBe(false);
    });
  });

  describe("ZIP_CODE_REGEX", () => {
    it("should match valid zip codes", () => {
      expect(ZIP_CODE_REGEX.test("50504")).toBe(true);
      expect(ZIP_CODE_REGEX.test("50504, 50505")).toBe(true);
      expect(ZIP_CODE_REGEX.test("12345,67890")).toBe(true);
    });

    it("should not match invalid zip codes", () => {
      expect(ZIP_CODE_REGEX.test("1234")).toBe(false);
      expect(ZIP_CODE_REGEX.test("123456")).toBe(false);
      expect(ZIP_CODE_REGEX.test("50504, abcde")).toBe(false);
      expect(ZIP_CODE_REGEX.test("50504,505")).toBe(false);
    });
  });
});
