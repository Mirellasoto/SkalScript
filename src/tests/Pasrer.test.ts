import { Parser } from "../parser/Parser"
import { tokenize } from "../lexer/tokenize"

describe("Parser", () => {
  it("parses an integer literal", () => {
    const parser = new Parser(tokenize("42"))
    expect(parser.parseExpression()).toEqual({
      kind: "IntegerLiteral",
      value: 42
    })
  })

  it("parses an identifier", () => {
    const parser = new Parser(tokenize("x"))
    expect(parser.parseExpression()).toEqual({
      kind: "Identifier",
      name: "x"
    })
  })

  it("parses addition", () => {
    const parser = new Parser(tokenize("1 + 2"))
    expect(parser.parseExpression()).toEqual({
      kind: "BinaryExpression",
      operator: "+",
      left: {
        kind: "IntegerLiteral",
        value: 1
      },
      right: {
        kind: "IntegerLiteral",
        value: 2
      }
    })
  })

  it("parses multiplication before addition", () => {
    const parser = new Parser(tokenize("1 + 2 * 3"))
    expect(parser.parseExpression()).toEqual({
      kind: "BinaryExpression",
      operator: "+",
      left: {
        kind: "IntegerLiteral",
        value: 1
      },
      right: {
        kind: "BinaryExpression",
        operator: "*",
        left: {
          kind: "IntegerLiteral",
          value: 2
        },
        right: {
          kind: "IntegerLiteral",
          value: 3
        }
      }
    })
  })

  it("parses parenthesized expressions", () => {
    const parser = new Parser(tokenize("(1 + 2) * 3"))
    expect(parser.parseExpression()).toEqual({
      kind: "BinaryExpression",
      operator: "*",
      left: {
        kind: "BinaryExpression",
        operator: "+",
        left: {
          kind: "IntegerLiteral",
          value: 1
        },
        right: {
          kind: "IntegerLiteral",
          value: 2
        }
      },
      right: {
        kind: "IntegerLiteral",
        value: 3
      }
    })
  })

  it("parses less-than expressions", () => {
    const parser = new Parser(tokenize("1 < 2"))
    expect(parser.parseExpression()).toEqual({
      kind: "BinaryExpression",
      operator: "<",
      left: {
        kind: "IntegerLiteral",
        value: 1
      },
      right: {
        kind: "IntegerLiteral",
        value: 2
      }
    })
  })

  it("parses equality expressions", () => {
    const parser = new Parser(tokenize("x == y"))
    expect(parser.parseExpression()).toEqual({
      kind: "BinaryExpression",
      operator: "==",
      left: {
        kind: "Identifier",
        name: "x"
      },
      right: {
        kind: "Identifier",
        name: "y"
      }
    })
  })

  it("parses boolean literals", () => {
    const parser = new Parser(tokenize("true"))
    expect(parser.parseExpression()).toEqual({
      kind: "BooleanLiteral",
      value: true
    })
  })

  it("parses unit literal", () => {
    const parser = new Parser(tokenize("unit"))
    expect(parser.parseExpression()).toEqual({
      kind: "UnitLiteral"
    })
  })
})