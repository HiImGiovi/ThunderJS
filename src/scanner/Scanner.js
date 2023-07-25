import Token from "./Token.js";
import TokenType from "./TokenType.js";
import logger from "../logger/logger.js";
class Scanner {
  #start = 0;
  #current = 0;
  #line = 1;
  constructor() {}
  #match() {}
  /**
   * Return an array of token objects
   * @returns {Token[]} An array of Token Objects
   */
  scanTokens(file_content) {
    this.#start = 0;
    this.#current = 0;
    this.#line = 1;
    const tokens = [];

    const addToken = (type) => {
      const next_char = this.#current + 1;
      const lexeme = file_content.substring(this.#start, next_char);
      this.#start = next_char;
      tokens.push(new Token(type, lexeme));
    };

    while (this.#current < file_content.length) {
      const c = file_content.charAt(this.#current);
      switch (c) {
        case "{":
          addToken(TokenType.LEFT_BRACE);
          break;
        case "}":
          addToken(TokenType.RIGHT_BRACE);
          break;
        case "(":
          addToken(TokenType.LEFT_BRACE);
          break;
        case ")":
          addToken(TokenType.RIGHT_BRACE);
          break;
        case ",":
          addToken(TokenType.COMMA);
          break;
        case ".":
          addToken(TokenType.DOT);
          break;
        case "-":
          addToken(TokenType.MINUS);
          break;
        case "+":
          addToken(TokenType.PLUS);
          break;
        case "*":
          addToken(TokenType.STAR);
          break;
        case "!":
          addToken();
          break;
        case ";":
          addToken(TokenType.SEMICOLON);
          break;
        default:
          this.#start = this.#current + 1;
          const error_msg = `Line ${
            this.#line
          } - Unexpected token ${c} at pos ${
            this.#current / this.#line
          } ----> ${this.#line} ${file_content.substring(
            0,
            this.#current + 1
          )}`;
          logger.log_error(error_msg);
          logger.log_error(
            " ".repeat(error_msg.length - 1) + "\u2517\u2501\u2501here"
          );
          console.log("\u001b[4meeeoooo\u001b[0m");
          break;
      }
      this.#current++;
    }
    return tokens;
  }
}

export default new Scanner();
