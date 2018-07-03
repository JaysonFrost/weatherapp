import { observable, computed, action } from 'mobx';
import axios from 'axios';

class Store {
    @observable cities = [];
    @observable currentLocation = {}
    
    @action
    defaultCity(value) {
        this.cities = value
    }
    
    @action
    findCurrentLocation(geo) {
        geo && axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${geo.coords.latitude}&lon=${geo.coords.longitude}&APPID=3e6be4414e6d054bf9f56d723e6f2be7`)
        .then(res => {
            this.currentLocation = res.data
        })
        .catch(e => console.log('locate error' + e))
    }
    
    @action
    removeCity(index) {
        this.cities = this.cities.filter((e, i) => {
            return index !== i
        })
        localStorage.setItem('cities', JSON.stringify(this.cities))
    }

	findCity(city) {
		axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=3e6be4414e6d054bf9f56d723e6f2be7`)
		.then(res => {
            const cityList = JSON.parse(localStorage.getItem('cities'))

            if (!cityList) {
                const cityArr = [];
                cityArr.push(res.data)
                localStorage.setItem('cities', JSON.stringify(cityArr))
            } else {
                cityList.push(res.data)
                localStorage.setItem('cities', JSON.stringify(cityList))
            }
            if (!this.cities) {
                const arr = []
                arr.push(res.data)
                this.cities = arr
            } else {
                this.cities.push(res.data)
            }
        }
            )
		.catch(err => alert('Город не найден ' + `(${err})`))
    }
}

const store = new Store()
export default store
