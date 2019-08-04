import React from 'react';
import { Link } from "react-router-dom";
import { SoundToggle, SoundSetting } from './sound';

type HeaderProps = {
	correctCount: number;
	totalCount: number;
	soundSetting: SoundSetting;
	onSoundSettingClick: () => any;
}

const Header: React.FunctionComponent<HeaderProps> = (props:HeaderProps) => {

	return (
		<header className="sticky">
			<div className="container">
				<div className="nav-brand">
					<i className="snes-jp-logo brand-logo"></i>
					<SoundToggle setting={props.soundSetting} onClick={props.onSoundSettingClick} />
				</div>
				<div>
					<Link to="/history">
						<button className="nes-btn"><i className="nes-icon trophy is-small"></i>{props.correctCount}/{props.totalCount}</button>
					</Link>
				</div>
			</div>
		</header>
	);
}

export default Header;
