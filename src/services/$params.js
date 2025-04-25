import moment from 'moment';
import {initState} from '../config/defaults';

const defaultState = {

  base: initState.base,
  vector: initState.vector,
  layer: initState.layer,
  time: initState.time,
  depth: initState.depth,
	opacity: initState.opacity,
	zoom: initState.zoom,
	center: initState.center,
}

class $params {

	format(search, layers) {
		try {
			this.layers = layers;

			this.layerNames = layers.map(l => l.title);

			if(search !== '') {
				let arr = search.split('?')[1].split('&');

				let parsed = this._parse(arr);
				console.log(parsed)

				let validated = this._validate(parsed);

				this._updateURL(validated);
				
				return validated;

			} else {
				this._updateURL(defaultState);

				return defaultState;
			}
		} catch(err) {
			console.log(err);
			this._updateURL(defaultState);


			return defaultState;
		}
		
	}

	_updateURL(params) {
		let url = '?' + Object.keys(params).map(param => `${param}=${params[param]}`).join('&');
		window.history.replaceState('', 'EcoDataCube', url);
	} 

	_default() {

	}

	_parse(arr) {
		let output = {};

		arr.map(el => {
			let name = el.split('=')[0];
			let value = el.split('=')[1];

			if(name === 'opacity') {
				value = parseInt(value); 
			}

			if(name === 'zoom') {
				value = parseFloat(value);
			}

			if(name === 'center') {
				value = value.split(',').map(v => parseFloat(v));
			}

			if(name && value) {
				output[name] = value;
			}
		})

		return output;
	}

	change(state) {
		let validated = this._validate(state);
		this._updateURL(validated);
	}

	_validate(params) {
		let output = {
			base: this._validateBase(params.base),
			layer: this._validateLayer(params.layer),
			zoom: this._validateZoom(params.zoom),
			center: this._validateCenter(params.center),
			opacity: this._validateOpacity(params.opacity)
		};

		let time = this._validateTime(params.time, params.layer);
		if(time) {
			output.time = time;
		}



		return output
	}

	_validateBase(val) {
		if(!val) {
			return defaultState.base
		}

		if(['osm', 'osm_gray', 'bing', 'otm'].indexOf(decodeURIComponent(val)) === -1) {
			return defaultState.base
		}

		return decodeURIComponent(val)
	}

	_validateLayer(val) {
		if(!val) {
			return defaultState.layer
		}

		if(this.layerNames.indexOf(decodeURIComponent(val)) === -1) {
			return defaultState.layer
		}

		return decodeURIComponent(val)
	}

	_validateTime(val, layer) {
		let validatedLayer = this._validateLayer(layer);
		let layerObj = this.layers.filter(l => l.title === validatedLayer)[0];
	

		if(!layerObj) {
			return defaultState.time
		}

		if(layerObj.range.length === 0) {
			return null
		}

		let range = layerObj.range;
		if(!val) {
			return range[range.length - 1];
		}


		// if(layerObj.timeScale === 'day') {
		// 	if(new RegExp(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/).exec(val)) {
		// 		return val;
		// 	} else {
		// 		return timeRange[1];
		// 	}
		// }

		if(range.indexOf(val) === -1) {
			return range[range.length - 1];
		}


		return val
	}

	_validateZoom(val) {
		if(!val) {
			return defaultState.zoom
		}

		return parseFloat(val.toFixed(1));
	}

	_validateCenter(val) {
		
		if(!val) {
			return defaultState.center
		}

		return val.map(v => parseFloat(v.toFixed(4)))
	}

	_validateOpacity(val) {
		if(!val) {
			return defaultState.opacity
		}

		if(isNaN(parseInt(val))) {
			return defaultState.opacity
		}

		if(parseInt(val) < -1 || parseInt(val) > 100) {
			return defaultState.opacity
		}

		return parseInt(val)
	}

}

export default new $params();