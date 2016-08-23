import React from 'react';
import ReactDOM from 'react-dom';
import { observable, computed, extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import Devtools from 'mobx-react-devtools';

// This does not work
class SmartTemperature {
    @observable unit = "C";
    @observable temperatureCelsius = 25;

    @computed get temperature () {
        return this.temperatureCelsius + " C"
    }
}

const smart = new SmartTemperature();

// This does work
const DumbTemperature = function () {
    extendObservable(this, {
        unit: "C",
        temperatureCelsius: 25,
        temperature: function () {
            return this.temperatureCelsius + " C"
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
