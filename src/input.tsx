import React from 'react';
import styled from 'styled-components';
import { Operator, BlankPosition } from './fillQuiz';

type AnswerInputInnerProps = {
	onInput: (value: number|Operator) => any;
	onClear: () => any;
	onAnswer: () => any;
}

export type AnswerInputProps = AnswerInputInnerProps & {
	blankPosition: BlankPosition;
}

const InputTable = styled.table`
	margin: auto;
`;

const NumberInput: React.FunctionComponent<AnswerInputInnerProps> = (props: AnswerInputInnerProps) => {
	const renderButton = (v: number) => {
		return (
			<button className="nes-btn" onClick={() => {props.onInput(v)}}>{v}</button>
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
					<td><button className="nes-btn" onClick={() => {props.onClear()}}>C</button></td>
					<td>{renderButton(0)}</td>
					<td><i className="nes-icon coin is-medium" onClick={props.onAnswer}/></td>
				</tr>
			</tbody>
		</InputTable>
	);
}

const OperatorButton = styled.button`
	font-family: "misakigothic2nd";
	font-size: large;
`;

const OperatorInput: React.FunctionComponent<AnswerInputInnerProps> = (props: AnswerInputInnerProps) => {
	return (
		<InputTable>
			<tbody>
				<tr>
					<td><OperatorButton className="nes-btn" onClick={() => {props.onInput(Operator.Plus)}}>たす</OperatorButton></td>
					<td><OperatorButton className="nes-btn" onClick={() => {props.onInput(Operator.Minus)}}>ひく</OperatorButton></td>
				</tr>
				<tr>
					<td><button className="nes-btn" onClick={() => {props.onClear()}}>C</button></td>
					<td><i className="nes-icon coin is-medium" onClick={props.onAnswer} /></td>
				</tr>
			</tbody>
		</InputTable>
	);
}

const AnswerInput: React.FunctionComponent<AnswerInputProps> = (props: AnswerInputProps) => {
	if (props.blankPosition === BlankPosition.Operator) {
		return (<OperatorInput onAnswer={props.onAnswer} onClear={props.onClear} onInput={props.onInput} />);
	} else {
		return (<NumberInput onAnswer={props.onAnswer} onClear={props.onClear} onInput={props.onInput} />);
	}
}

export { AnswerInput };
