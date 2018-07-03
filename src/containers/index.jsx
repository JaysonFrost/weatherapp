import React, { Component } from 'react'
import Home from 'containers/Home'
import store from './store';

class App extends Component {
	render() {
		return (
			<section>
				<Home store={store} />
			</section>
		)
	}
}

export default App
