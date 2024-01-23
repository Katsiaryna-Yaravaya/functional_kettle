import React, {ChangeEvent, Component} from "react";
import {Image} from "../../components/Image/Image";
import {InputRange} from "../../components/InputRange/InputRange";
import {Button} from "../../components/Button/Button";
import Pot from "../../assets/pot2.jpg";

import "./styles.css";

interface ElectricKettleState {
    isOn: boolean;
    hint: string;
    temperature: number;
    boilingInterval: NodeJS.Timeout | null;
    newWaterLevel: number;
}

const KETTLE_ON = "Чайник включен";
const KETTLE_OFF = "Вода вскипела. Чайник выключен";
const KETTLE_STOP = "Чайник остановлен";
const KETTLE_RESET = "Чайник остановлен. Уровень воды и температура сброшены";

const MAX_TEMPERATURE = 100;
const INTERVAL_TEMPERATURE = 10;

class MainPage extends Component <{}, ElectricKettleState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            isOn: false,
            hint: '',
            temperature: 0,
            boilingInterval: null,
            newWaterLevel: 0,
        };
    }

    boilWater = () => {
        this.setState({hint: KETTLE_ON});
        const boilingInterval = setInterval(() => {
            if (this.state.temperature < MAX_TEMPERATURE) {
                this.setState((prevState) => ({
                    temperature: prevState.temperature + INTERVAL_TEMPERATURE,
                }));
            } else {
                this.setState({hint: KETTLE_OFF});
                clearInterval(boilingInterval);
                this.turnOff(true);
            }
        }, 1000);

        this.setState({boilingInterval});
    };

    turnOn = () => {
        if (this.state.isOn) {
            return
        }
        this.setState({isOn: true}, () => {
            if (!this.state.boilingInterval) {
                this.boilWater();
            }
        });
    };

    turnOff = (autoShutdown = false) => {
        if (!this.state.isOn) {
            return
        }

        clearInterval(this.state.boilingInterval as NodeJS.Timeout);
        this.setState({isOn: false, boilingInterval: null, newWaterLevel: 0, temperature: 0, hint: ''});

        // If the water temperature reaches 100, reset the state
        if (this.state.temperature === MAX_TEMPERATURE || autoShutdown) {
            this.setState({newWaterLevel: 0, temperature: 0, hint: KETTLE_RESET});
        } else {
            this.setState({hint: KETTLE_STOP});
        }
    };

    // water level and temperature are not reset after pressing the button to turn the kettle off

    // turnOff = (autoShutdown=false) => {
    //     if (this.state.isOn) {
    //         clearInterval(this.state.boilingInterval as NodeJS.Timeout);
    //         this.setState({ isOn: false, boilingInterval: null });
    //
    //         // If the water temperature reaches 100, reset the state
    //         if (this.state.temperature === MAX_TEMPERATURE || autoShutdown) {
    //             this.setState({ newWaterLevel: 0, temperature: 0 });
    //             console.log('Чайник остановлен. Уровень воды и температура сброшены');
    //         } else {
    //             console.log('Чайник остановлен');
    //         }
    //     }
    // };

    handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({newWaterLevel: Number(e.target.value)});
    };

    componentWillUnmount() {
        // Clearing the interval before unmounting a component
        clearInterval(this.state.boilingInterval as NodeJS.Timeout);
    }

    render() {
        return (
            <>
                <h2>Чайник</h2>

                <div className="container">
                    <div>
                        <InputRange
                            label="Уровень воды (от 0 до 1):"
                            max="1"
                            value={this.state.newWaterLevel}
                            onChange={this.handleInputChange}/>
                        <p>Температура: {this.state.temperature.toFixed(1)}°C</p>
                        <Button onClick={() => this.turnOn()} disabled={this.state.isOn} name="Включить чайник"/>
                        <Button onClick={() => this.turnOff()} disabled={!this.state.isOn} name="Выключить чайник"/>
                    </div>

                    <div className="kettle-container">
                        <div className="water-level" style={{height: `${this.state.newWaterLevel * 20}%`}}/>
                        <Image src={Pot} alt="pot"/>
                    </div>
                </div>
                <span>{this.state.hint}</span>
            </>
        );
    }
}

export default MainPage;
