import React from 'react';
import ReactDOM from 'react-dom';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import Devtools from 'mobx-react-devtools';

class Temperature {
    @observable unit = "C";
    @observable temperatureCelsius = 25;

    @computed get temperatureFahrenheit () {
        return this.temperatureCelsius * (9/5) + 32;
    }

    @computed get temperatureKelvin () {
        return this.temperatureCelsius + 273.15;
    }

    @computed get temperature () {
        switch(this.unit) {
            case "F":
                return this.temperatureFahrenheit + " F";
            case "K":
                return this.temperatureKelvin + " K";
            default:
                return this.temperatureCelsius + " C";
        }
    }
}

const temp = new Temperature();

const App = observer(({temperature}) => (
    <div>
        {temperature.temperature}
        <Devtools />
    </div>
));

ReactDOM.render(
  <App temperature={temp} />,
  document.getElementById('root')
);
