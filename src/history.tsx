import React from 'react';
import { BlankPosition, FillQuizFormulaValue } from './fillQuiz';

export type History = FillQuizFormulaValue & {
	correct: boolean;
	input: string;
}

type HistoryDialogProps = {
	history: History[];
}

const HistoryList: React.FunctionComponent<HistoryDialogProps> = (props: HistoryDialogProps) => {
	let list = props.history.map((h:History) => {
		const blank = <span className="nes-badge"><span className="is-dark">&nbsp;</span></span>;
		let left = <span>{h.left}</span>;
		let operator = <span>{h.operator}</span>;
		let right = <span>{h.right}</span>;
		let answer = <span>{h.answer}</span>;
		switch (h.blankPos) {
			case BlankPosition.Left:
				left = blank;
				break;
			case BlankPosition.Operator:
				operator = blank;
				break;
			case BlankPosition.Right:
				right = blank;
				break;
			case BlankPosition.Answer:
				answer = blank;
				break;
		}
		return (<li>{left}{operator}{right}={answer}&nbsp;こたえ&nbsp;{h.input}</li>);
	});
	return (
		<div className="nes-container with-title is-centered">
			<ul className="nes-list is-disc">
				{list}
			</ul>
		</div>
	);
}

export default HistoryList;
