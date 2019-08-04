import React from 'react';
import './index.css';
import { FillQuiz, FillQuizFormulaValue } from './fillQuiz';
import Header from './header';
import HistoryList, {History} from './history';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { SoundSetting, AnswerSound } from './sound';

type AppState = {
	history: History[];
	soundSetting: SoundSetting;
}

export class App extends React.Component<any, AppState> {

	private soundRef = React.createRef<AnswerSound>();

	constructor(props: any) {
		super(props);
		this.state = {
			history: [],
			soundSetting: SoundSetting.Mute
		};
		this.onResult = this.onResult.bind(this);
		this.onSoundSettingChange = this.onSoundSettingChange.bind(this);
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
		if (this.soundRef && this.soundRef.current) {
			if (correct) {
				this.soundRef.current.correct();
			} else {
				this.soundRef.current.wrong();
			}
		}
	}

	onSoundSettingChange() {
		let setting = this.state.soundSetting;
		setting = setting + 1;
		setting = setting % 3;
		this.setState({soundSetting: setting});
	}

	render() {
		let correctCount = this.state.history.filter((h:History) => {return h.correct}).length;
		return (
			<Router>
				<Header correctCount={correctCount} totalCount={this.state.history.length} soundSetting={this.state.soundSetting} onSoundSettingClick={this.onSoundSettingChange} />
				<div className="container">
					<main className="main-content">
						<Route exact path="/" render={() => <FillQuiz onResult={this.onResult} key={this.state.history.length} />} />
						<Route path="/history" render={(props) => { return (<HistoryList history={this.state.history} />) }} />
					</main>
				</div>
				<AnswerSound setting={this.state.soundSetting} ref={this.soundRef} />
			</Router>
		);
	}
}

