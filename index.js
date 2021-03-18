class RaceInput {
    constructor(lapMinutes, lapSeconds, raceMinutes, fuelPerLap) {
        this.lapMinutes = lapMinutes;
        this.lapSeconds = lapSeconds;
        this.raceMinutes = raceMinutes;
        this.fuelPerLap = fuelPerLap;
    }
}

class RaceInputFormatter {
    constructor(raceInput)
    {
        this.raceInput = raceInput;
    }

    GetLapSeconds()
    {
        return (this.raceInput.lapSeconds < 10) ? ('0' + this.raceInput.lapSeconds) : this.raceInput.lapSeconds;
    }
}

class InputConverter {
    constructor(input)
    {
        this.input = (input + '000000000').substring(0,9);
    }

    GetRaceInput()
    {
        return new RaceInput(
            parseInt(this.input[0]),
            parseInt(this.input[1] + this.input[2]),
            parseInt(this.input[3] + this.input[4] + this.input[5]),
            parseInt(this.input[6] + this.input[7] + this.input[8])
        )
    }
}

class FuelCalculator {
    constructor(input)
    {
        this.raceInput = (new InputConverter(input)).GetRaceInput();

        let lapTotalSeconds = this.raceInput.lapMinutes * 60 + this.raceInput.lapSeconds;
        let raceSeconds = this.raceInput.raceMinutes * 60;
        this.totalLaps = raceSeconds / lapTotalSeconds;
        this.totalFuel = this.totalLaps * this.raceInput.fuelPerLap;
        this.raceInputFormatter = new RaceInputFormatter(this.raceInput);
    }

    ShowInput()
    {
        return `Lap time: ${this.raceInput.lapMinutes}:${this.raceInputFormatter.GetLapSeconds()} <br> Race length: ${this.raceInput.raceMinutes} minutes <br> Fuel consumption: ${(this.raceInput.fuelPerLap / 100).toFixed(2)} liters/lap`;
    }

    ShowResult()
    {
        return `${Math.ceil(this.totalFuel / 100) || 0} liters | ${Math.ceil(this.totalLaps) || 0} laps`
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let calc = new FuelCalculator(document.getElementById('input').value);
    document.getElementById('result').innerHTML = calc.ShowResult();
    document.getElementById('inputMonitor').innerHTML = calc.ShowInput();

    document.getElementById('input').addEventListener('input', () => {
        let calc = new FuelCalculator(document.getElementById('input').value);
        document.getElementById('result').innerHTML = calc.ShowResult();
        document.getElementById('inputMonitor').innerHTML = calc.ShowInput();
    });
})



