function Token(type, lexeme, literal, line, column, length) {
    this.type = type;
    this.lexeme = lexeme;
    this.literal = literal;
    this.line = line;
    this.column = column;
    this.length = length;
}

Token.prototype.getInfo = () => {
    return ``;
}

export default Token;