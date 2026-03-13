
import { Token } from "./Token"
import { TokenType } from "./TokenType"
import { keywords } from "./keywords"


//the Lexer converts raw text into tokens
export class Lexer {
  private input: string
  private position = 0

  //constructor receives the program text
  constructor(input: string) {
    this.input = input
  }

  //peek looks at the current character
  //without moving the position forward
  private peek(): string {
    return this.input[this.position] ?? '\0'
  }

  //advance returns the current character
  //and moves the position forward
  private advance(): string {
    return this.input[this.position++] ?? '\0'
  }

  //skip spaces, tabs, and newlines
  private skipWhitespace() {
    while (/\s/.test(this.peek())) {
      this.advance()
    }
  }

  //main lexer function that returns the next token
  nextToken(): Token {

    //ignore whitespace before reading a token
    this.skipWhitespace()

    const char = this.peek()

    //if we reached the end of input return EOF token
    if (char === '\0') {
      return { type: TokenType.EOF }
    }

    //if the first character is a digit read a number
    if (/[0-9]/.test(char)) {
      return this.readNumber()
    }

    //if the first character is a letter read identifier/keyword
    if (/[a-zA-Z]/.test(char)) {
      return this.readIdentifier()
    }

    //handle single-character symbols
    switch (this.advance()) {

      case '(':
        return { type: TokenType.LPAREN }

      case ')':
        return { type: TokenType.RPAREN }

      case '{':
        return { type: TokenType.LBRACE }

      case '}':
        return { type: TokenType.RBRACE }

      case ',':
        return { type: TokenType.COMMA }

      case ':':
        return { type: TokenType.COLON }

      case ';':
        return { type: TokenType.SEMICOLON }

      case '+':
        return { type: TokenType.PLUS }

      case '-':
        return { type: TokenType.MINUS }

      case '*':
        return { type: TokenType.STAR }

      case '/':
        return { type: TokenType.SLASH }

      case '<':
        return { type: TokenType.LESS }

      case '_':
        return { type: TokenType.UNDERSCORE }

      case '=':

        //handle == comparison operator
        if (this.peek() === '=') {
          this.advance()
          return { type: TokenType.DOUBLE_EQUAL }
        }

        //handle => arrow operator
        if (this.peek() === '>') {
          this.advance()
          return { type: TokenType.ARROW }
        }

        //oherwise it's just assignment =
        return { type: TokenType.EQUAL }

      default:
        //if character isn't recognized throw an error
        throw new Error("Unexpected character: " + char)
    }
  }


  //reads a full number token
  private readNumber(): Token {

    let num = ""

    //continue reading digits until they stop
    while (/[0-9]/.test(this.peek())) {
      num += this.advance()
    }

    return {
      type: TokenType.INTEGER,
      value: num
    }
  }

  //reads identifiers and checks if they are keywords
  private readIdentifier(): Token {

    let id = ""

    //continue reading letters and underscores
    while (/[a-zA-Z_]/.test(this.peek())) {
      id += this.advance()
    }

    //check if the identifier matches a keyword
    const keyword = keywords[id]

    if (keyword) {
      return { type: keyword }
    }

    //otherwise return a normal identifier
    return {
      type: TokenType.IDENTIFIER,
      value: id
    }
  }
}