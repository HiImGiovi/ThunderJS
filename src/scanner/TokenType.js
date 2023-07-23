class TokenType {
  // single character tokens
  static LEFT_PARENT = "LEFT_PARENT";
  static RIGHT_PARENT = "RIGHT_PARENT";
  static LEFT_BRACE = "LEFT_BRACE";
  static RIGHT_BRACE = "RIGHT_BRACE";
  static COMMA = "COMMA";
  static DOT = "DOT";
  static MINUS = "MINUS";
  static PLUS = "PLUS";
  static SEMICOLON = "SEMICOLON";
  static SLASH = "SLASH";
  static STAR = "STAR";

  // one or two character tokens
  static BANG = "STAR";
  static BANG_EQUAL = "BANG_EQUAL";
  static EQUAL = "EQUAL";
  static EQUAL_EQUAL = "EQUAL_EQUAL";
  static GREATER = "GREATER";
  static GREATER_EQUAL = "GREATER_EQUAL";
  static LESS = "LESS";
  static LESS_EQUAL = "LESS_EQUAL";

  // literals
  static IDENTIFIER = "IDENTIFIER";
  static STRING = "STRING";
  static NUMBER = "NUMBER";

  // keywords
  static AND = "AND";
  static CLASS = "CLASS";
  static ELSE = "ELSE";
  static FALSE = "FALSE";
  static FUN = "FUN";
  static FOR = "FOR";
  static IF = "IF";
  static NIL = "NIL";
  static OR = "OR";
  static PRINT = "PRINT";
  static RETURN = "RETURN";
  static SUPER = "SUPER";
  static THIS = "THIS";
  static TRUE = "TRUE";
  static VAR = "VAR";
  static WHILE = "WHILE";

  // eof
  static EOF = "EOF";
}

export default TokenType;
