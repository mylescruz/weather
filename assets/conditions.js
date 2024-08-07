let conditions = [
	{
		"condition" : "Sunny",
		"image" : "assets/images/sunny.png"
	},
	{
		"condition" : "Clear ",
		"image" : "assets/images/night.png"
	},
	{
		"condition" : "Partly Cloudy ",
		"image" : "assets/images/partly_cloudy.png"
	},
	{
		"condition" : "Cloudy",
		"image" : "assets/images/cloudy.png"
	},
	{
		"condition" : "Overcast",
		"image" : "assets/images/overcast.png"
	},
	{
		"condition" : "Mist",
		"image" : "assets/images/light_rain.png"
	},
	{
		"condition" : "Patchy rain possible",
		"image" : "assets/images/light_rain.png"
	},
	{
		"condition" : "Patchy snow possible",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "Patchy sleet possible",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "Patchy freezing drizzle possible",
		"image" : "assets/images/light_rain.png"
	},
	{
		"condition" : "Thundery outbreaks possible",
		"image" : "assets/images/lightning.png"
	},
	{
		"condition" : "Blowing snow",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "Blizzard",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "Fog",
		"image" : "assets/images/cloudy.png"
	},
	{
		"condition" : "Freezing fog",
		"image" : "assets/images/cloudy.png"
	},
	{
		"condition" : "Patchy light drizzle",
		"image" : "assets/images/light_rain.png"
	},
	{
		"condition" : "Light drizzle",
		"image" : "assets/images/light_rain.png"
	},
	{
		"condition" : "Freezing drizzle",
		"image" : "assets/images/light_rain.png"
	},
	{
		"condition" : "Heavy freezing drizzle",
		"image" : "assets/images/heavy_rain.png"
	},
	{
		"condition" : "Patchy light rain",
		"image" : "assets/images/light_rain.png"
	},
	{
		"condition" : "Patchy rain nearby",
		"image" : "assets/images/light_rain.png"
	},
	{
		"condition" : "Light rain",
		"image" : "assets/images/light_rain.png"
	},
	{
		"condition" : "Moderate rain at times",
		"image" : "assets/images/rain.png"
	},
	{
		"condition" : "Moderate rain",
		"image" : "assets/images/rain.png"
	},
	{
		"condition" : "Heavy rain at times",
		"image" : "assets/images/heavy_rain.png"
	},
	{
		"condition" : "Heavy rain",
		"image" : "assets/images/heavy_rain.png"
	},
	{
		"condition" : "Light freezing rain",
		"image" : "assets/images/light_rain.png"
	},
	{
		"condition" : "Moderate or heavy freezing rain",
		"image" : "assets/images/heavy_rain.png"
	},
	{
		"condition" : "Light sleet",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "Moderate or heavy sleet",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "Patchy light snow",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "Light snow",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "Patchy moderate snow",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "Moderate snow",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "Patchy heavy snow",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "Heavy snow",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "Ice pellets",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "Light rain shower",
		"image" : "assets/images/light_rain.png"
	},
	{
		"condition" : "Moderate or heavy rain shower",
		"image" : "assets/images/heavy_rain.png"
	},
	{
		"condition" : "Torrential rain shower",
		"image" : "assets/images/heavy_rain.png"
	},
	{
		"condition" : "Light sleet showers",
		"image" : "assets/images/light_rain.png"
	},
	{
		"condition" : "Moderate or heavy sleet showers",
		"image" : "assets/images/heavy_rain.png"
	},
	{
		"condition" : "Light snow showers",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "Moderate or heavy snow showers",
		"image" : "assets/images/heavy_rain.png"
	},
	{
		"condition" : "Light showers of ice pellets",
		"image" : "assets/images/light_rain.png"
	},
	{
		"condition" : "Moderate or heavy showers of ice pellets",
		"image" : "assets/images/heavy_rain.png"
	},
	{
		"condition" : "Patchy light rain with thunder",
		"image" : "assets/images/lightning_storm.png"
	},
	{
		"condition" : "Moderate or heavy rain with thunder",
		"image" : "assets/images/lightning_storm.png"
	},
	{
		"condition" : "Patchy light snow with thunder",
		"image" : "assets/images/lightning_storm.png"
	},
	{
		"condition" : "Moderate or heavy snow with thunder",
		"image" : "assets/images/lightning_storm.png"
	}
];

let conditionsMap = new Map();

for (let i = 0; i < conditions.length; i++) {
	conditionsMap.set(conditions[i].condition, conditions[i].image);
}

export default conditionsMap;