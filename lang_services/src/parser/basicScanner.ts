'use strict';

export enum TokenType {
	Ident = 0,
	String = 1,
	Num = 3,
	LineNum = 29,
	HexaNum = 4,
	OctalNum = 5,
	Colon = 6,
	SemiColon = 7,
	ParenthesisL = 8,
	ParenthesisR = 9,
	BracketL = 10,
	BracketR = 11,
	Whitespace = 12,
	Newline = 30,
	Delim = 13,
	Comma = 14,
	Comment = 15,
	EOF = 17,
	Sigil = 18,
	Operator = 19,
	BitOperator = 22,
	ShortPrint = 30,
	CustomToken = 28
}

export interface IToken {
	type: TokenType;
	text: string;
	offset: number;
	len: number;
}

export class MultiLineStream {

	private source: string;
	private len: number;
	private position: number;

	constructor(source: string) {
		this.source = source;
		this.len = source.length;
		this.position = 0;
	}

	public substring(from: number, to: number = this.position): string {
		return this.source.substring(from, to);
	}

	/**
	 * Check for End of Stream / File
	 */
	public eos(): boolean {
		return this.len <= this.position;
	}

	/**
	 * Current pos of Stream
	 */
	public pos(): number {
		return this.position;
	}

	/**
	 * Go to pos
	 * @param {number} pos pos to jump
	 */
	public goBackTo(pos: number): void {
		this.position = pos;
	}

	/**
	 * Go back by n
	 * @param {number} n number to go back
	 */
	public goBack(n: number): void {
		this.position -= n;
	}

	/**
	 * jump fore by n
	 * @param {number} n number to jump fore
	 */
	public advance(n: number): void {
		this.position += n;
	}

	/**
	 * Char code of next char
	 */
	public nextChar(): number {
		return this.source.charCodeAt(this.position++) || 0;
	}

	/**
	 * Char code of nth next char
	 * @param {number} n
	 */
	public peekChar(n: number = 0): number {
		return this.source.charCodeAt(this.position + n) || 0;
	}

	/**
	 * Char code of nth previous char
	 * @param {number} n
	 */
	public lookbackChar(n: number = 0): number {
		return this.source.charCodeAt(this.position - n) || 0;
	}

	/**
	 * go fore if ch is eqaul to current char
	 * @param {number} ch Char code
	 */
	public advanceIfChar(ch: number): boolean {
		if (ch === this.source.charCodeAt(this.position)) {
			this.position++;
			return true;
		}
		return false;
	}

	/**
	 * go fore if chs are eqaul to current chars
	 * @param {number[]} ch Char codes
	 */
	public advanceIfChars(ch: number[]): boolean {
		let i: number;
		if (this.position + ch.length > this.source.length) {
			return false;
		}
		for (i = 0; i < ch.length; i++) {
			var nextChar = this._toLower(this.source.charCodeAt(this.position + i));
			var char = this._toLower(ch[i]);
			if (this.source.charCodeAt(this.position + i) !== ch[i]) {
				return false;
			}
		}
		this.advance(i);
		return true;
	}

	/**
	 * go fore until condition is not false
	 * @param {(number) => boolean} condition Char codes
	 */
	public advanceWhileChar(condition: (ch: number) => boolean): number {
		let posNow = this.position;
		while (this.position < this.len && condition(this.source.charCodeAt(this.position))) {
			this.position++;
		}
		return this.position - posNow;
	}

	private _toLower(ch: number): number{
		if(ch >= _A && ch <= _Z){
			return ch +26+6;
		}
		return ch;
	}
}

const _a = 'a'.charCodeAt(0);
const _d = 'd'.charCodeAt(0);
const _e = 'e'.charCodeAt(0);
const _f = 'f'.charCodeAt(0);
const _h = 'h'.charCodeAt(0);
const _i = 'i'.charCodeAt(0);
const _l = 'l'.charCodeAt(0);
const _m = 'm'.charCodeAt(0);
const _n = 'n'.charCodeAt(0);
const _o = 'o'.charCodeAt(0);
const _p = 'p'.charCodeAt(0);
const _q = 'q'.charCodeAt(0);
const _r = 'r'.charCodeAt(0);
const _t = 't'.charCodeAt(0);
const _u = 'u'.charCodeAt(0);
const _v = 'v'.charCodeAt(0);
const _x = 'x'.charCodeAt(0);
const _z = 'z'.charCodeAt(0);
const _A = 'A'.charCodeAt(0);
const _D = 'D'.charCodeAt(0);
const _E = 'E'.charCodeAt(0);
const _F = 'F'.charCodeAt(0);
const _H = 'H'.charCodeAt(0);
const _I = 'I'.charCodeAt(0);
const _L = 'L'.charCodeAt(0);
const _M = 'M'.charCodeAt(0);
const _N = 'N'.charCodeAt(0);
const _O = 'O'.charCodeAt(0);
const _P = 'P'.charCodeAt(0);
const _Q = 'Q'.charCodeAt(0);
const _R = 'R'.charCodeAt(0);
const _T = 'T'.charCodeAt(0);
const _U = 'U'.charCodeAt(0);
const _V = 'V'.charCodeAt(0);
const _X = 'X'.charCodeAt(0);
const _Z = 'Z'.charCodeAt(0);
const _0 = '0'.charCodeAt(0);
const _9 = '9'.charCodeAt(0);
const _7 = '7'.charCodeAt(0);
const _HAT = '^'.charCodeAt(0);
const _MUL = '*'.charCodeAt(0);
const _FSL = '/'.charCodeAt(0);
const _BSL = '\\'.charCodeAt(0);
const _PLS = '+'.charCodeAt(0);
const _MIN = '-'.charCodeAt(0);
const _SQO = '\''.charCodeAt(0);
const _EQL = '='.charCodeAt(0);
const _LES = '<'.charCodeAt(0);
const _GRT = '>'.charCodeAt(0);
const _TLD = '~'.charCodeAt(0);
const _QTN = '?'.charCodeAt(0);
const _PIP = '|'.charCodeAt(0);
const _USC = '_'.charCodeAt(0);
const _LPA = '('.charCodeAt(0);
const _RPA = ')'.charCodeAt(0);
const _ATS = '@'.charCodeAt(0);
const _NWL = '\n'.charCodeAt(0);
const _CAR = '\r'.charCodeAt(0);
const _LFD = '\f'.charCodeAt(0);
const _DQO = '"'.charCodeAt(0);
const _WSP = ' '.charCodeAt(0);
const _TAB = '\t'.charCodeAt(0);
const _SEM = ';'.charCodeAt(0);
const _COL = ':'.charCodeAt(0);
const _CUL = '{'.charCodeAt(0);
const _CUR = '}'.charCodeAt(0);
const _BRL = '['.charCodeAt(0);
const _BRR = ']'.charCodeAt(0);
const _CMA = ','.charCodeAt(0);
const _DOT = '.'.charCodeAt(0);
const _AMP = '&'.charCodeAt(0);

const _BNG = '!'.charCodeAt(0);
const _HSH = '#'.charCodeAt(0);
const _DLR = '$'.charCodeAt(0);
const _PRC = '%'.charCodeAt(0);


const staticTokenTable: { [code: number]: TokenType; } = {};
staticTokenTable[_SEM] = TokenType.SemiColon;
staticTokenTable[_COL] = TokenType.Colon;
staticTokenTable[_BRR] = TokenType.BracketR;
staticTokenTable[_BRL] = TokenType.BracketL;
staticTokenTable[_LPA] = TokenType.ParenthesisL;
staticTokenTable[_RPA] = TokenType.ParenthesisR;
staticTokenTable[_CMA] = TokenType.Comma;
staticTokenTable[_QTN] = TokenType.ShortPrint;
staticTokenTable[_GRT] = TokenType.Operator;
staticTokenTable[_LES] = TokenType.Operator;
staticTokenTable[_EQL] = TokenType.Operator;
staticTokenTable[_PLS] = TokenType.Operator;
staticTokenTable[_MIN] = TokenType.Operator;
staticTokenTable[_BSL] = TokenType.Operator;
staticTokenTable[_FSL] = TokenType.Operator;
staticTokenTable[_HAT] = TokenType.Operator;


export class Scanner {

	public stream: MultiLineStream;
	public ignoreComment = true;
	public ignoreWhitespace = true;
	public lineStarted = true;

	public setSource(input: string): void {
		this.stream = new MultiLineStream(input);
	}

	public finishToken(offset: number, Type: TokenType, text?: string): IToken {
		if (Type == TokenType.Newline) {
			this.lineStarted = true;
		}
		return {
			offset: offset,
			len: this.stream.pos() - offset,
			type: Type,
			text: text || this.stream.substring(offset)
		};
	}

	public substring(offset: number, len: number): string {
		return this.stream.substring(offset, offset + len);
	}

	public pos(): number {
		return this.stream.pos();
	}

	public goBackTo(pos: number): void {
		this.stream.goBackTo(pos);
	}

	public tokenize(): IToken[] {
		var tokens: IToken[] = [];

		while (true) {
			var token = this.scan();
			tokens.push(token);
			if (token.type == TokenType.EOF) {
				break;
			}
		}

		return tokens;
	}

	public scan(): IToken {
		let content: string[] = [];
		let offset = this.stream.pos();
		let tokenType;
		// processes all whitespaces and comments
		let triviaToken = this.trivia();
		if (triviaToken !== null) {
			return triviaToken;
		}

		// check for line numbers
		if (this.lineStarted) {
			let pos = this.stream.pos();
			if (this._decimal()) {
				content = [this.stream.substring(offset, pos)];
				return this.finishToken(offset, TokenType.LineNum, content.join(''));

			}
			this.lineStarted = false;
		}

		// Comments
		content = [];
		if (this._isCommentChar()) {
			
			let pos = this.stream.pos();
			content = [this.stream.substring(offset, pos)];
		}

		// String, BadString
		content = [];
		if (this._string()) {

			let pos = this.stream.pos();
			content = [this.stream.substring(offset, pos)];

			return this.finishToken(offset, TokenType.String);
		}


		// End of file/input
		if (this.stream.eos()) {
			return this.finishToken(offset, TokenType.EOF);
		}

		// Sigil
		if (this.stream.advanceIfChar(_BNG) ||
			this.stream.advanceIfChar(_HSH) ||
			this.stream.advanceIfChar(_DLR) ||
			this.stream.advanceIfChar(_PRC)) {
			return this.finishToken(offset, TokenType.Sigil);
		}

		// Operators
		if (this._isOperator()) {
			return this.finishToken(offset, TokenType.Operator);
		}

		// deciaml Numbers
		if (this._decimal()) {
			return this.finishToken(offset, TokenType.Num);
		}

		// octal, hexa
		if (this.stream.advanceIfChar(_AMP)) {
			if (this.stream.advanceIfChar(_o) || this.stream.advanceIfChar(_O)) {
				this._octal();
				let pos = this.stream.pos();
				content = [this.stream.substring(offset, pos)];

				return this.finishToken(offset, TokenType.OctalNum);
			}
			else if (this.stream.advanceIfChar(_h) || this.stream.advanceIfChar(_H)) {
				this._hexa();
				let pos = this.stream.pos();
				content = [this.stream.substring(offset, pos)];

				return this.finishToken(offset, TokenType.OctalNum);
			}
		}


		// single character tokens
		tokenType = <TokenType>staticTokenTable[this.stream.peekChar()];
		if (typeof tokenType !== 'undefined') {
			this.stream.advance(1);
			return this.finishToken(offset, tokenType);
		}

		if (this.ident(content)) {
			return this.finishToken(offset, TokenType.Ident, content.join(''));
		}

		// Delim
		this.stream.nextChar();
		return this.finishToken(offset, TokenType.Delim);
	}

	private _matchWordAnyCase(characters: number[]): boolean {
		let index = 0;
		this.stream.advanceWhileChar((ch: number) => {
			let result = characters[index] === ch || characters[index + 1] === ch;
			if (result) {
				index += 2;
			}
			return result;
		});
		if (index === characters.length) {
			return true;
		} else {
			this.stream.goBack(index / 2);
			return false;
		}
	}

	protected trivia(): IToken {
		while (true) {
			let offset = this.stream.pos();
			if (this._whitespace()) {
				if (!this.ignoreWhitespace) {
					return this.finishToken(offset, TokenType.Whitespace);
				}
			} else if (this._isNewline()) {
				return this.finishToken(offset, TokenType.Newline);

			} //else if (this.comment()) {
			// 	if (!this.ignoreComment) {
			// 		return this.finishToken(offset, TokenType.Comment);
			// 	}
			// } 
			else {
				return null;
			}
		}
	}

	protected comment(): boolean {
		if (this.stream.advanceIfChars([_R, _E, _L]) ||
			this.stream.advanceIfChars([_r, _e, _l]) ||
			this.stream.advanceIfChar(_SQO)) {

			this.stream.advanceWhileChar((ch) => {
				if (!(this._isNewline() || this.stream.eos())) {
					return true;
				}
			});
			this.stream.goBack(1);
			return true;
		}
		return false;
	}

	private _isCommentChar(): boolean{
		if(this.stream.peekChar() == _SQO){
			return true;
		} else if(this.stream.peekChar() == _r || this.stream.peekChar() == _R){
			if( this.stream.peekChar(1) == _e || this.stream.peekChar() == _E){
				if (this.stream.peekChar(2) == _m || this.stream.peekChar() ==_M){
					return true;
				}
			}
		}
		
		return false;
	}

	private _isOperator(): boolean{
		if(this.stream.advanceIfChars([_EQL, _LES]) || // =<
			this.stream.advanceIfChars([_EQL, _GRT]) || // =>
			this.stream.advanceIfChars([_LES, _GRT]) || // <>
			this.stream.advanceIfChars([_GRT, _LES]) || // ><
			this.stream.advanceIfChars([_LES, _EQL]) || // <=
			this.stream.advanceIfChars([_GRT, _EQL]) || // >=
			this.stream.advanceIfChars([_EQL, _EQL]) || // ==
			this.stream.advanceIfChars([_O, _R])
			){
				// Double Char Operators
				return true
		} else if(this.stream.advanceIfChars([_M, _O, _D]) ||
			this.stream.advanceIfChars([_N, _O, _T]) ||
			this.stream.advanceIfChars([_A, _N, _D]) ||
			this.stream.advanceIfChars([_N, _O, _T]) ||
			this.stream.advanceIfChars([_X, _O, _R]) ||
			this.stream.advanceIfChars([_E, _Q, _V]) ||
			this.stream.advanceIfChars([_I, _M, _P])){
				// Triple Char Operator
				this.stream.advance(3);
				return true;
		}
		return false;
	}

	private _decimal(): boolean {
		let npeek = 0, ch: number;
		if (this.stream.peekChar() === _DOT) {
			npeek = 1;
		}
		ch = this.stream.peekChar(npeek);
		if (ch >= _0 && ch <= _9) {
			this.stream.advance(npeek + 1);
			this.stream.advanceWhileChar((ch) => {
				return ch >= _0 && ch <= _9 || npeek === 0 && ch === _DOT;
			});
			return true;
		}
		return false;
	}

	private _octal(): boolean {
		let npeek = 0, ch: number;
		ch = this.stream.peekChar(npeek);
		if (ch >= _0 && ch <= _9) {
			this.stream.advance(npeek + 1);
			this.stream.advanceWhileChar((ch) => {
				return ch >= _0 && ch < _7;
			});
			return true;
		}
		return false;
	}

	private _hexa(): boolean {
		let npeek = 0, ch: number;
		ch = this.stream.peekChar(npeek);
		if (ch >= _0 && ch <= _9) {
			this.stream.advance(npeek + 1);
			this.stream.advanceWhileChar((ch) => {
				return ch >= _0 && ch <= _9 || ch >= _a && ch <= _f || ch >= _A && ch <= _F;
			});
			return true;
		}
		return false;
	}

	private _stringChar(closeQuote: number, result: string[]) {
		// not closeQuote, not backslash, not newline
		let ch = this.stream.peekChar();
		if (ch !== 0 && ch !== closeQuote && ch !== _BSL && ch !== _CAR && ch !== _LFD && ch !== _NWL) {
			this.stream.advance(1);
			result.push(String.fromCharCode(ch));
			return true;
		}
		return false;
	};

	private _string(): boolean {
		let npeek = 0, ch: number;
		ch = this.stream.peekChar(npeek);
		if (ch === _DQO) {
			this.stream.advance(npeek + 1);
			this.stream.advanceWhileChar((ch) => {
				return ch != _DQO;
			});
			this.stream.advance(1);
			return true;
		}
		return false;
	}

	private _whitespace(): boolean {
		if(this.stream.pos() == 3){
			debugger;
		}
		let n = this.stream.advanceWhileChar((ch) => {
			return ch === _WSP || ch === _TAB;
		});
		return n > 0;
	}

	private _isNewline(): boolean {
		let n = this.stream.advanceWhileChar((ch) => {
			return ch === _NWL || ch === _LFD || ch === _CAR;
		});
		return n > 0;
	}

	private _name(result: string[]): boolean {
		let matched = false;
		while (this._identChar(result)) {
			matched = true;
		}
		return matched;
	}

	protected ident(result: string[]): boolean {
		let pos = this.stream.pos();
		let hasMinus = this._minus(result);
		if (this._identFirstChar(result)) {
			while (this._identChar(result)) {
				// loop
			}
			return true;
		}
		this.stream.goBackTo(pos);
		return false;
	}

	private _identFirstChar(result: string[]): boolean {
		let ch = this.stream.peekChar();
		if (ch === _USC || // _
			ch >= _a && ch <= _z || // a-z
			ch >= _A && ch <= _Z || // A-Z
			ch >= 0x80 && ch <= 0xFFFF) { // nonascii
			this.stream.advance(1);
			result.push(String.fromCharCode(ch));
			return true;
		}
		return false;
	}


	private _minus(result: string[]): boolean {
		let ch = this.stream.peekChar();
		if (ch === _MIN) {
			this.stream.advance(1);
			result.push(String.fromCharCode(ch));
			return true;
		}
		return false;
	}

	private _identChar(result: string[]): boolean {
		let ch = this.stream.peekChar();
		if (ch === _USC || // _
			ch === _MIN || // -
			ch >= _a && ch <= _z || // a-z
			ch >= _A && ch <= _Z || // A-Z
			ch >= _0 && ch <= _9 || // 0/9
			ch >= 0x80 && ch <= 0xFFFF) { // nonascii
			this.stream.advance(1);
			result.push(String.fromCharCode(ch));
			return true;
		}
		return false;
	}
}
