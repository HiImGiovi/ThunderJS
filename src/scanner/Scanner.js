import Token from "./Token.js";
import TokenType from "./TokenType.js";

/**
 * 
 * @param {string} file_content 
 */
const Scanner = function () {
  this.start = 0
  this.current = 0
};




/**
 * Return an array of token objects
 * @returns {Token[]} An array of Token Objects
 */
Scanner.prototype.scanTokens = function (file_content) {
  const tokens = []
  const addToken = (type) => {
    const next_char = this.current + 1
    const lexeme = file_content.substring(this.start, next_char)
    this.start = next_char
    tokens.push(new Token(type, lexeme))
  }
  while (this.current < file_content.length) {
    const c = file_content.charAt(this.current)
    switch (c) {
      case "{":
        addToken(TokenType.LEFT_BRACE)
        break;
      case "}":
        addToken(TokenType.RIGHT_BRACE)
        break
      case "(":
        addToken(TokenType.LEFT_BRACE)
        break
      case ")":
        addToken(TokenType.RIGHT_BRACE)
        break
      default:
        break;
    }
    this.current++
  }
  return tokens;
};

export default new Scanner();
