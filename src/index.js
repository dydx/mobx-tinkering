import React from 'react';
import ReactDOM from 'react-dom';
import { observable, computed, extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import Devtools from 'mobx-react-devtools';

// This does not work
class SmartTemperature {
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

const smart = new SmartTemperature();

// This does work
const DumbTemperature = function () {
    extendObservable(this, {
        unit: "C",
        temperatureCelsius: 25,
        temperatureFahrenheit: function () {
            return this.temperatureCelsius * (9/5) + 32;
        },
        temperatureKelvin: function () {
            return this.temperatureCelsius + 273.15;
        },
        temperature: function () {
            switch(this.unit) {
                case "F":
                    return this.temperatureFahrenheit + " F";
                case "K":
                    return this.temperatureKelvin + " K";
                default:
                    return this.temperatureCelsius + " C";
            }
        }
    });
}

const dumb = new DumbTemperature();

const App = observer(({smart, dumb}) => (
    <div>
        {smart.temperature} <br />
        {dumb.temperature}
        <Devtools />
    </div>
));

ReactDOM.render(
  <App smart={smart} dumb={dumb} />,
  document.getElementById('root')
);

// OUTPUT:
//
// undefined C
// 25 C
