import { Lexer } from "../lexer/Lexer";
import { TokenType } from "../lexer/TokenType";

function nextType(input: string): TokenType {
    return new Lexer(input).nextToken().type;
}

test("brace tokens", () => {
  expect(nextType("{")).toBe(TokenType.LBRACE);
  expect(nextType("}")).toBe(TokenType.RBRACE);
});

test("comma token", () => {
  expect(nextType(",")).toBe(TokenType.COMMA);
});

test("colon token", () => {
  expect(nextType(":")).toBe(TokenType.COLON);
});

test("star token", () => {
  expect(nextType("*")).toBe(TokenType.STAR);
});

test("slash token", () => {
  expect(nextType("/")).toBe(TokenType.SLASH);
});

test("less-than token", () => {
  expect(nextType("<")).toBe(TokenType.LESS);
});

test("underscore token", () => {
  expect(nextType("_")).toBe(TokenType.UNDERSCORE);
});

test("throws on unexpected character", () => {
  expect(() => new Lexer("@").nextToken()).toThrow("Unexpected character: @");
});

test("keyword tokens", () => {
  expect(nextType("var")).toBe(TokenType.VAR);
  expect(nextType("def")).toBe(TokenType.DEF);
  expect(nextType("match")).toBe(TokenType.MATCH);
  expect(nextType("case")).toBe(TokenType.CASE);
  expect(nextType("true")).toBe(TokenType.TRUE);
  expect(nextType("false")).toBe(TokenType.FALSE);
  expect(nextType("println")).toBe(TokenType.PRINTLN);
});

test("built-in type keywords", () => {
  expect(nextType("Int")).toBe(TokenType.INT);
  expect(nextType("Boolean")).toBe(TokenType.BOOLEAN);
  expect(nextType("Unit")).toBe(TokenType.UNIT_TYPE);
});

test("identifier with underscore", () => {
  const token = new Lexer("abc_def").nextToken();
  expect(token.type).toBe(TokenType.IDENTIFIER);
  expect(token.value).toBe("abc_def");
});

test("multi-digit integer preserves value", () => {
  const token = new Lexer("12345").nextToken();
  expect(token.type).toBe(TokenType.INTEGER);
  expect(token.value).toBe("12345");
});