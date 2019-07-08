import React from 'react';
import './index.css';
import { getRandomInt,Addition } from './math';

export const App = (props: any) => {
	let answer: number = getRandomInt(0, 10);
	return (
		<React.Fragment>
			<header>
				<div className="container">
					<div className="main-content">
						<div className="nav-brand">
							<i className="nes-icon is-small nes-mario"></i>
						</div>
					</div>
					<div>
						<p>aaa</p>
					</div>
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


