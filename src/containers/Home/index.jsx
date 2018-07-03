import React, { Component } from 'react';
import styles from './styles.sss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-free-solid'
import classnames from 'classnames/bind';
import {observer} from 'mobx-react';
const cx = classnames.bind(styles)

@observer
class Home extends Component {

	componentDidMount() {
		const cityList = JSON.parse(localStorage.getItem('cities'))
		this.props.store.defaultCity(cityList)
		navigator.geolocation.getCurrentPosition(
			(e) => this.props.store.findCurrentLocation(e),
			(error) => console.log(error)
		)
	}

	checkKey = (e) => {
		if(e.keyCode === 13) {
			this.props.store.findCity(e.target.value)
		}
	}


	render() {
		console.log(this.props.store)
		return (
			<div className={styles.home}>
				<div className={styles.weather}>
					<div className={cx(styles.currentWeather, {[styles.currentWeather_show]: this.props.store.currentLocation.name })}>
							<span className={styles.weather_list_name}>{this.props.store.currentLocation.name}</span>
							<span>
								{this.props.store.currentLocation.weather && this.props.store.currentLocation.weather[0].description}
							</span>
							<img
								src={`http://openweathermap.org/img/w/${this.props.store.currentLocation.weather &&
									this.props.store.currentLocation.weather[0].icon}.png`}
								alt=""
							/>
						</div>
					<input type="text" onKeyDown={(e) => this.checkKey(e)}/>
					<div className={styles.weather_list}>
						<ul className={styles.weather_list_ul}>
							{this.props.store.cities && this.props.store.cities.map((e, i) => 
								<li key={i} className={styles.weather_list_li}>
									<span className={styles.weather_list_name}>{e && e.name}</span>
									<span className={styles.weather_list_status}>{e && e.weather[0].description}</span>
									<img src={`http://openweathermap.org/img/w/${e && e.weather[0].icon}.png`} alt=""/>
									<div onClick={() => this.props.store.removeCity(i)} className={styles.weather_removeItem}>
										<FontAwesomeIcon icon={faTimes} />
									</div>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

export default Home
