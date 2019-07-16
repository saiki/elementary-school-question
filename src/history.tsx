import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { BlankPosition, FillQuizFormulaValue } from './fillQuiz';

export type History = FillQuizFormulaValue & {
	correct: boolean;
	input: string;
}

type HistoryDialogProps = {
	history: History[];
}


const JapaneseFontLabel = styled.span`
	font-family: "misakigothic2nd";
	font-size: large;
`;

const BlankInput = styled.input`
	width: auto;
`;

const HistoryList: React.FunctionComponent<HistoryDialogProps> = (props: HistoryDialogProps) => {
	let list = props.history.map((h:History) => {
		const blank = <BlankInput type="text" className="nes-input" />;
		let left = <span>{h.left}</span>;
		let operator = <span>{h.operator}</span>;
		let right = <span>{h.right}</span>;
		let answer = <span>{h.answer}</span>;
		let actual;
		switch (h.blankPos) {
			case BlankPosition.Left:
				actual = left;
				left = blank;
				break;
			case BlankPosition.Operator:
				actual = operator;
				operator = blank;
				break;
			case BlankPosition.Right:
				actual = right;
				right = blank;
				break;
			case BlankPosition.Answer:
				actual = answer;
				answer = blank;
				break;
		}
		let jadge;
		if (h.correct) {
			jadge = "○";
		} else {
			jadge = "×";
		}
		return (
			<tr>
				<td><JapaneseFontLabel>{jadge}</JapaneseFontLabel></td>
				<td>{left}{operator}{right}={answer}</td>
				<td>{h.input}</td>
				<td>{actual}</td>
			</tr>
		);
	});
	return (
		<div className="nes-container is-rounded">
			<header className="sticky">
				<div className="container">
					<div className="nav-brand"></div>
					<div>
						<Link to="/"><button className="nes-btn"><i className="nes-icon close is-small"></i></button></Link>
					</div>
				</div>
			</header>
			<div className="nes-table-responsive">
				<table className="nes-table is-bordered is-centered">
					<thead>
						<tr>
							<th><JapaneseFontLabel>○×</JapaneseFontLabel></th>
							<th><JapaneseFontLabel>しき</JapaneseFontLabel></th>
							<th><JapaneseFontLabel>こたえ</JapaneseFontLabel></th>
							<th><JapaneseFontLabel>せいかい</JapaneseFontLabel></th>
						</tr>
					</thead>
					<tbody>
						{list}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default HistoryList;
