import React from 'react';
import styled from 'styled-components';
import './index.css';

export function getRandomInt(min:number ,max:number) {
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

type AnswerInputProps = {
	onNumberClick: (n: number) => any;
	onAnswerClick: () => any;
}

const InputTable = styled.table`
	margin: auto;
`;

const AnswerInput = (props: AnswerInputProps) => {
	const renderButton = (n: number) => {
		return (
			<button className="nes-btn" onClick={() => {props.onNumberClick(n)}}>{n}</button>
		);
	}
	return (
		<InputTable>
			<tbody>
				<tr>
					<td>{renderButton(1)}</td>
					<td>{renderButton(2)}</td>
					<td>{renderButton(3)}</td>
				</tr>
				<tr>
					<td>{renderButton(4)}</td>
					<td>{renderButton(5)}</td>
					<td>{renderButton(6)}</td>
				</tr>
				<tr>
					<td>{renderButton(7)}</td>
					<td>{renderButton(8)}</td>
					<td>{renderButton(9)}</td>
				</tr>
				<tr>
					<td>&nbsp;</td>
					<td>{renderButton(0)}</td>
					<td><i className="nes-icon coin is-medium" onClick={() => {props.onAnswerClick()}}/></td>
				</tr>
			</tbody>
		</InputTable>
	);
}

type QuizProps = {
	answer: number;
}

type QuizState = {
	num:number;
	input: number | null;
}

const Input = styled.input`
	width: 100px;
`;

const QuizArea = styled.p`
	text-align: center;
	font-size: large;
`

export class Addition extends React.Component<QuizProps, QuizState> {

	constructor(props:QuizProps) {
		super(props);
		this.state = {
			num: getRandomInt(0, this.props.answer),
			input: null
		};
	}

	componentDidMount() {
		this.setState({
			num: getRandomInt(0, this.props.answer)
		});
	}

	onInput = (n:number) => {
		if (this.state.input == null) {
			this.setState({input: n});
			return;
		}
		this.setState({
			input: this.state.input * 10 + n
		});
	}

	onAnswer = () => {
	}

	render() {
		return (
			<div className="nes-container with-title">
				<QuizArea className="nes-field is-inline">
					{this.state.num}+<Input className="nes-input" type="number" readOnly value={''+this.state.input}/>={this.props.answer}
				</QuizArea>
				<AnswerInput onNumberClick={this.onInput} onAnswerClick={this.onAnswer}/>
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

