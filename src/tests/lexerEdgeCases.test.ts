//import the lexer and token types
import { Lexer } from "../tokenizer/Lexer"
import { TokenType } from "../tokenizer/TokenType"


//test that the lexer correctly ignores whitespace
test("whitespace skipping", () => {

  //input has spaces before and after the identifier
  const lexer = new Lexer("   x   ")

  const token = lexer.nextToken()

  //lexer should skip spaces and return IDENTIFIER
  expect(token.type).toBe(TokenType.IDENTIFIER)
})


//test a small sequence of tokens
test("multiple tokens sequence", () => {

  //input contains identifier + number
  const lexer = new Lexer("x + 5")

  //check that tokens come in the correct order
  expect(lexer.nextToken().type).toBe(TokenType.IDENTIFIER)
  expect(lexer.nextToken().type).toBe(TokenType.PLUS)
  expect(lexer.nextToken().type).toBe(TokenType.INTEGER)
})


//test that an empty input produces EOF
test("EOF token", () => {

  const lexer = new Lexer("")

  const token = lexer.nextToken()

  expect(token.type).toBe(TokenType.EOF)
})

//This test file checks edge cases of the lexer.
//It ensures whitespace is skipped, token sequences work correctly, 
//and EOF is handled properly.