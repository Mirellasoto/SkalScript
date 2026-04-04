export type Expression =
  | IntegerLiteral
  | BooleanLiteral
  | UnitLiteral
  | Identifier
  | BinaryExpression

export interface IntegerLiteral {
  kind: "IntegerLiteral"
  value: number
}

export interface BooleanLiteral {
  kind: "BooleanLiteral"
  value: boolean
}

export interface UnitLiteral {
  kind: "UnitLiteral"
}

export interface Identifier {
  kind: "Identifier"
  name?: string
}

export interface BinaryExpression {
  kind: "BinaryExpression"
  operator: string
  left: Expression
  right: Expression
}