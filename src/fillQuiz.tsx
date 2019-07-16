import React from 'react';
import styled from 'styled-components';
import { AnswerInput } from './input';
import { getRandomInt } from './util';

export enum Operator {
	Plus = "+",
	Minus = "−",
	Multiply = "×",
	Divide = "÷"
}

export const Operators: Operator[] = [
	Operator.Plus,
	Operator.Minus,
];

export enum BlankPosition {
	Left,
	Operator,
	Right,
	Answer
};

export const BlankPositions: BlankPosition[] = [
	BlankPosition.Left,
	BlankPosition.Operator,
	BlankPosition.Right,
	BlankPosition.Answer
];

export type FillQuizFormulaValue = {
	left: number;
	operator: Operator;
	right: number;
	answer: number;
	blankPos: BlankPosition
}

export function newQuiz():FillQuizFormulaValue {
	let answer = getRandomInt(0, 10);
	let num = getRandomInt(1, answer);
	let operator = Operators[getRandomInt(0, Operators.length)];
	let left;
	let right;
	if (operator === Operator.Plus) {
		left = num;
		right = answer - num;
	} else {
		if (num > answer) {
			right = num - answer;
			left = num;
		} else {
			left = num + answer;
			right = num;
		}
	}
	let blankPos = BlankPositions[getRandomInt(0, BlankPositions.length)];
	return {
		left: left,
		operator: operator,
		right: right,
		answer: answer,
		blankPos: blankPos,
	};
}

type FillQuizFormulaProps = FillQuizFormulaValue & {
	input: string;
}

export const FillQuizFormula: React.FunctionComponent<FillQuizFormulaProps> = (props: FillQuizFormulaProps) => {
	let left;
	if (BlankPosition.Left === props.blankPos) {
		left = <Input className="nes-input" readOnly value={props.input}/>;
	} else {
		left = props.left;
	}
	let right;
	if (BlankPosition.Right === props.blankPos) {
		right = <Input className="nes-input" readOnly value={props.input}/>;
	} else {
		right = props.right;
	}
	let operator;
	if (BlankPosition.Operator === props.blankPos) {
		operator = <Input className="nes-input" readOnly value={props.input}/>;
	} else {
		operator = props.operator;
	}
	let answer;
	if (BlankPosition.Answer === props.blankPos) {
		answer = <Input className="nes-input" readOnly value={props.input}/>;
	} else {
		answer = props.answer;
	}

	return (
		<React.Fragment>
			{left}{operator}{right}={answer}
		</React.Fragment>
	);
}

const Input = styled.input`
	width: 100px;
`;

const FormulaArea = styled.p`
	text-align: center;
	font-size: large;
`

type FillQuizProps = {
	onResult: (correct: boolean, userInput: string, quiz: FillQuizFormulaValue) => any;
}


type FillQuizState = FillQuizFormulaValue & {
	input: string;
}

export class FillQuiz extends React.Component<FillQuizProps, FillQuizState> {
	constructor(props:FillQuizProps) {
		super(props);
		let quiz: FillQuizFormulaValue = newQuiz();
		this.state = {
			left: quiz.left,
			operator: quiz.operator,
			right: quiz.right,
			answer: quiz.answer,
			blankPos: quiz.blankPos,
			input: ''
		};
		this.onInput = this.onInput.bind(this);
		this.onClear = this.onClear.bind(this);
		this.onAnswer = this.onAnswer.bind(this);
	}

	componentDidMount() {
		let quiz: FillQuizFormulaValue = newQuiz();
		this.setState({
			left: quiz.left,
			operator: quiz.operator,
			right: quiz.right,
			answer: quiz.answer,
			blankPos: quiz.blankPos,
			input: ''
		});
	}

	onInput = (n:number|Operator) => {
		if (typeof n === 'number') {
			let input = 0;
			if (this.state.input) {
				input = parseInt(this.state.input);
			}
			this.setState({input: String(input * 10 + n)});
		} else {
			this.setState({input: n});
		}
	}

	onClear = () => {
		this.setState({input: ""});
	}

	onAnswer = () => {
		let quiz: FillQuizFormulaValue = {
			left: this.state.left,
			operator: this.state.operator,
			right: this.state.right,
			answer: this.state.answer,
			blankPos: this.state.blankPos
		}
		let expected;
		switch (this.state.blankPos) {
			case BlankPosition.Left:
				expected = this.state.left;
				break;
			case BlankPosition.Operator:
				expected = this.state.operator;
				break;
			case BlankPosition.Right:
				expected = this.state.right;
				break;
			case BlankPosition.Answer:
				expected = this.state.answer;
				break;
		}
		let actual = this.state.input;
		const correct = (actual.length > 0) && (String(expected) === String(actual));
		this.props.onResult(correct, this.state.input, quiz);
	}

	render() {
		return (
			<div className="nes-container is-rounded">
				<FormulaArea className="nes-field is-inline">
					<FillQuizFormula left={this.state.left} operator={this.state.operator} right={this.state.right} blankPos={this.state.blankPos} answer={this.state.answer} input={this.state.input} />
				</FormulaArea>
				<AnswerInput blankPosition={this.state.blankPos} onInput={this.onInput} onAnswer={this.onAnswer} onClear={this.onClear} />
			</div>
		);
	}
}

