import React from 'react';

export enum SoundSetting {
	Mute,
	CoinExplosion,
	OkNg
}

type SoundToggleProps = {
	setting: SoundSetting;
	onClick: () => any;
}

export const SoundToggle: React.FunctionComponent<SoundToggleProps> = (props:SoundToggleProps) => {
	let icon;
	switch (props.setting) {
		case SoundSetting.Mute:
			icon = <i className="nes-icon close is-midium" onClick={() => {props.onClick()}}></i>;
			break;
		case SoundSetting.CoinExplosion:
			icon = <i className="nes-icon coin is-midium" onClick={() => {props.onClick()}}></i>;
			break;
		case SoundSetting.OkNg:
			icon = <i className="nes-icon is-midium star" onClick={() => {props.onClick()}}></i>;
			break;
		default:
			icon = <i className="nes-icon close is-midium" onClick={() => {props.onClick()}}></i>;
			break;
	}
	return (
		<React.Fragment>
			<i className="fas fa-volume-off fa-3x" onClick={() => {props.onClick()}}></i>
			<span>&nbsp;</span>
			{icon}
		</React.Fragment>
	);
}


type AnswerSoundProps = {
	setting: SoundSetting;
}


export class AnswerSound extends React.Component<AnswerSoundProps> {
	private coin = React.createRef<HTMLAudioElement>();
	private explosion = React.createRef<HTMLAudioElement>();
	private ok = React.createRef<HTMLAudioElement>();
	private ng = React.createRef<HTMLAudioElement>();

	correct() {
		if (this.props.setting === SoundSetting.Mute) {
			return;
		}
		console.log("correct setting="+this.props.setting);
		if (this.props.setting === SoundSetting.CoinExplosion) {
			if (this.coin && this.coin.current) {
				this.coin.current.play();
			}
			return;
		}
		console.log(this.props.setting === SoundSetting.OkNg);
		if (this.props.setting === SoundSetting.OkNg) {
			if (this.ok && this.ok.current) {
				this.ok.current.play();
			}
			return;
		}
	}

	wrong() {
		if (this.props.setting === SoundSetting.Mute) {
			return;
		}
		console.log("wrong setting="+this.props.setting);
		if (this.props.setting === SoundSetting.CoinExplosion) {
			if (this.explosion && this.explosion.current) {
				this.explosion.current.play();
			}
			return;
		}
		console.log(this.props.setting === SoundSetting.OkNg);
		if (this.props.setting === SoundSetting.OkNg) {
			if (this.ng && this.ng.current) {
				this.ng.current.play();
			}
			return;
		}
	}

	render() {
		return (
			<React.Fragment>
				<audio muted={this.props.setting === SoundSetting.Mute} preload="auto" src="/sound/coin.mp3" ref={this.coin}/>
				<audio muted={this.props.setting === SoundSetting.Mute} preload="auto" src="/sound/explosion.mp3" ref={this.explosion}/>
				<audio muted={this.props.setting === SoundSetting.Mute} preload="auto" src="/sound/correct.mp3" ref={this.ok}/>
				<audio muted={this.props.setting === SoundSetting.Mute} preload="auto" src="/sound/wrong.mp3" ref={this.ng}/>
			</React.Fragment>
		);
	}
}
