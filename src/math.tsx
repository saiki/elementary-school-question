import React from 'react';
//import ReactDOM from 'react-dom';
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

const AnswerInput = (props: AnswerInputProps) => {
	const renderButton = (n: number) => {
		return (
			<button className="nes-btn" onClick={() => {props.onNumberClick(n)}}>{n}</button>
		);
	}
	return (
		<table>
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
		</table>
	);
}

type QuestionProps = {
	answer: number;
}

type QuestionState = {
	num:number;
	input: number | null;
}

const Input = styled.input`
	width: 30px;
`;

export class Addition extends React.Component<QuestionProps, QuestionState> {

	constructor(props:QuestionProps) {
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
		let style={
			width: '40px'
		}
		let pattern:number = getRandomInt(1,2);
		return (
			<div style={style}>
				<table>
					<tbody>
						<tr>
							<td>{this.state.num}</td>
							<td>+</td>
							<td><Input type="number" readOnly value={''+this.state.input}/></td>
							<td>=</td>
							<td>{this.props.answer}</td>
						</tr>
					</tbody>
				</table>
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

