import { Visibility, Weather } from "../types";

const RadioEntries = ({
  setVisibility,
  setWeather,
}: {
  setVisibility: React.Dispatch<React.SetStateAction<Visibility>>;
  setWeather: React.Dispatch<React.SetStateAction<Weather>>;
}) => {
  const handleVisibilityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.currentTarget.value;
    console.log("handlevis", value);
    const vis = event.currentTarget.value;

    if (vis === "great") {
      setVisibility(Visibility.Great);
    } else if (vis === "good") {
      setVisibility(Visibility.Good);
    } else if (vis === "ok") {
      setVisibility(Visibility.Ok);
    } else if (vis === "poor") {
      setVisibility(Visibility.Poor);
    }
  };

  const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    console.log("handlevis", value);
    const vis = event.currentTarget.value;

    if (vis === "sunny") {
      setWeather(Weather.Sunny);
    } else if (vis === "rainy") {
      setWeather(Weather.Rainy);
    } else if (vis === "cloudy") {
      setWeather(Weather.Cloudy);
    } else if (vis === "stormy") {
      setWeather(Weather.Stormy);
    } else if (vis === "windy") {
      setWeather(Weather.Windy);
    }
  };

  const style = {
    display: "flex",
    verticalAlign: "middle",
    gap: "5px",
  };

  return (
    <div>
      <div style={style}>
        visibility
        {(Object.keys(Visibility) as Array<keyof typeof Visibility>).map(
          (visValue, index) => {
            return (
              <div key={`vis-${index}`}>
                <label htmlFor={visValue}>
                  {visValue}
                  <input
                    id="radio-vis"
                    type="radio"
                    name="visibility"
                    value={visValue}
                    onChange={handleVisibilityChange}
                  />
                </label>
              </div>
            );
          }
        )}
      </div>
      <div style={style}>
        weather
        {(Object.keys(Weather) as Array<keyof typeof Weather>).map(
          (weatherValue, index) => {
            return (
              <div key={`weather-${index}`}>
                <label htmlFor={weatherValue}>
                  {weatherValue}
                  <input
                    id="radio-vis"
                    type="radio"
                    name="weather"
                    value={weatherValue}
                    onChange={handleWeatherChange}
                  />
                </label>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default RadioEntries;
