import React from 'react';
import './index.css';
import { getRandomInt } from './util';
import { FillQuiz, Operator, Operators, BlankPosition, BlankPositions } from './fillQuiz';

type History = {
	correct: boolean;
	input: string;
	left: number;
	operator: Operator;
	right: number;
	answer: number;
}

type AppState = {
	correctCount: number;
	left: number;
	operator: Operator;
	right: number;
	answer: number;
	blankPos: BlankPosition;
	history: History[];
}

export class App extends React.Component<any, AppState> {
	constructor(props: any) {
		super(props);
		this.state = this.newState();
	}

	newState(): AppState {
		let answer = getRandomInt(0, 10);
		let left = getRandomInt(0, answer);
		let operator = Operators[getRandomInt(0, Operators.length-1)];
		let otherSide;
		if (operator === Operator.Plus) {
			otherSide = answer - left;
		} else {
			otherSide = left - answer;
		}
		let blankPos = BlankPositions[getRandomInt(0, BlankPositions.length-1)];
		return {
			correctCount: 0,
			left: left,
			operator: operator,
			right: otherSide,
			answer: answer,
			blankPos: blankPos,
			history: []
		};
	}

	onResult(result: boolean, userInput: string, left: number, operator: Operator, right: number, answer: number, blankPos: BlankPosition) {
	}

	render() {
		return (
			<React.Fragment>
				<header className="sticky">
					<div className="container">
						<div className="nav-brand">
							<i className="snes-jp-logo brand-logo"></i>
						</div>
						<div>{this.state.correctCount}</div>
					</div>
				</header>
				<div className="container">
					<main className="main-content">
						<FillQuiz left={this.state.left} operator={this.state.operator} right={this.state.right} answer={this.state.answer} blankPos={this.state.blankPos} onResult={this.onResult} />
					</main>
				</div>
			</React.Fragment>
		);
	}
}


