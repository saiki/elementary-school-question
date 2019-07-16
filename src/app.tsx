import React from 'react';
import './index.css';
import { FillQuiz, FillQuizFormulaValue } from './fillQuiz';
import Header from './header';
import HistoryList, {History} from './history';
import { BrowserRouter as Router, Route } from "react-router-dom";

type AppState = {
	history: History[];
}

export class App extends React.Component<any, AppState> {
	constructor(props: any) {
		super(props);
		this.state = { history: [] };
		this.onResult = this.onResult.bind(this);
	}

	onResult(correct: boolean, userInput: string, quiz: FillQuizFormulaValue) {
		this.setState({
			history: this.state.history.concat({
				correct: correct,
				input: userInput,
				left: quiz.left,
				operator: quiz.operator,
				right: quiz.right,
				answer: quiz.answer,
				blankPos: quiz.blankPos
			})
		});
	}

	render() {
		let correctCount = this.state.history.filter((h:History) => {return h.correct}).length;
		return (
			<Router>
				<Header correctCount={correctCount} totalCount={this.state.history.length}/>
				<div className="container">
					<main className="main-content">
						<Route exact path="/" render={() => <FillQuiz onResult={this.onResult} key={this.state.history.length} />} />
						<Route path="/history" render={(props) => { return (<HistoryList history={this.state.history} />) }} />
					</main>
				</div>
			</Router>
		);
	}
}

