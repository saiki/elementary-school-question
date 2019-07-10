import React from 'react';
import './index.css';
import { getRandomInt,Addition } from './math';

export const App = (props: any) => {
	let answer: number = getRandomInt(0, 10);
	return (
		<React.Fragment>
			<header className="sticky">
				<div className="container">
					<div className="nav-brand">
						<i className="snes-jp-logo brand-logo"></i>
					</div>
					<div>aaa</div>
				</div>
			</header>
			<div className="container">
				<main className="main-content">
					<Addition answer={answer}/>
				</main>
			</div>
		</React.Fragment>
	);
}


