import React from 'react';
import styled from 'styled-components';
import './index.css';

type AnswerInputProps = {
	onInput: (value: string) => any;
	onAnswer: () => any;
}

const InputTable = styled.table`
	margin: auto;
`;

const AnswerInput = (props: AnswerInputProps) => {
	const renderButton = (n: string) => {
		return (
			<button className="nes-btn" onClick={() => {props.onInput(n)}}>{n}</button>
		);
	}
	return (
		<InputTable>
			<tbody>
				<tr>
					<td>{renderButton("1")}</td>
					<td>{renderButton("2")}</td>
					<td>{renderButton("3")}</td>
				</tr>
				<tr>
					<td>{renderButton("4")}</td>
					<td>{renderButton("5")}</td>
					<td>{renderButton("6")}</td>
				</tr>
				<tr>
					<td>{renderButton("7")}</td>
					<td>{renderButton("8")}</td>
					<td>{renderButton("9")}</td>
				</tr>
				<tr>
					<td>&nbsp;</td>
					<td>{renderButton("0")}</td>
					<td><i className="nes-icon coin is-medium" onClick={() => {props.onAnswer()}}/></td>
				</tr>
			</tbody>
		</InputTable>
	);
}

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

type FillQuizFormulaProps = {
	left: number;
	operator: Operator;
	right: number;
	answer: number;
	blankPos: BlankPosition
	input: string;
}

export class FillQuizFormula extends React.Component<FillQuizFormulaProps> {
	render() {
		let left;
		if (BlankPosition.Left === this.props.blankPos) {
			left = <Input className="nes-input" readOnly value={this.props.input}/>;
		} else {
			left = this.props.left;
		}
		let right;
		if (BlankPosition.Right === this.props.blankPos) {
			right = <Input className="nes-input" readOnly value={this.props.input}/>;
		} else {
			right = this.props.right;
		}
		let operator;
		if (BlankPosition.Operator === this.props.blankPos) {
			operator = <Input className="nes-input" readOnly value={this.props.input}/>;
		} else {
			operator = this.props.operator;
		}
		let answer;
		if (BlankPosition.Answer === this.props.blankPos) {
			answer = <Input className="nes-input" readOnly value={this.props.input}/>;
		} else {
			answer = this.props.answer;
		}

		return (
			<React.Fragment>
				{left}{operator}{right}={answer}
			</React.Fragment>
		);
	}
}

const Input = styled.input`
	width: 100px;
`;

const FormulaArea = styled.p`
	text-align: center;
	font-size: large;
`

type FillQuizProps = {
	left: number;
	operator: Operator;
	right: number;
	answer: number;
	blankPos: BlankPosition

	onResult: (result: boolean, userInput: string, left: number, operator: Operator, right: number, answer: number, blankPos: BlankPosition) => any;
}


type FillQuizState = {
	input: string;
}

export class FillQuiz extends React.Component<FillQuizProps, FillQuizState> {
	constructor(props:FillQuizProps) {
		super(props);
		this.state = {
			input: ''
		};
	}

	onInput = (n:string) => {
		this.setState({input: this.state.input + n});
	}

	onAnswer = () => {
	}

	render() {
		return (
			<div className="nes-container with-title">
				<FormulaArea className="nes-field is-inline">
					<FillQuizFormula left={this.props.left} operator={this.props.operator} right={this.props.right} blankPos={this.props.blankPos} answer={this.props.answer} input={this.state.input} />
				</FormulaArea>
				<AnswerInput onInput={this.onInput} onAnswer={this.onAnswer}/>
			</div>
		);
	}
}

export const Subtraction = (props: AnswerInputProps) => {
	return (
		<p>Subtraction</p>
	);
}

export const Multiplication = (props: AnswerInputProps) => {
	return (
		<p>Subtraction</p>
	);
}

export const Division = (props: AnswerInputProps) => {
	return (
		<p>Subtraction</p>
	);
}

