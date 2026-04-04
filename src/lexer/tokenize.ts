import { Lexer } from "./Lexer"
import { Token } from "./Token"
import { TokenType } from "./TokenType"

//tokenize converts source code into a full token array
export function tokenize(input: string): Token[] {
  const lexer = new Lexer(input)
  const tokens: Token[] = []

  while (true) {
    const token = lexer.nextToken()
    tokens.push(token)

    if (token.type === TokenType.EOF) {
      break
    }
  }

  return tokens
}