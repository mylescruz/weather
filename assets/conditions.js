let conditions = [
	{
		"condition" : "Sunny",
		"image" : "sunny.png"
	},
	{
		"condition" : "Partly Cloudy ",
		"image" : "partly_cloudy.png"
	},
	{
		"condition" : "Cloudy",
		"image" : "cloudy.png"
	},
	{
		"condition" : "Overcast",
		"image" : "overcast.png"
	},
	{
		"condition" : "Mist",
		"image" : "light_rain.png"
	},
	{
		"condition" : "Patchy rain possible",
		"image" : "light_rain.png"
	},
	{
		"condition" : "Patchy snow possible",
		"image" : "snow.png"
	},
	{
		"condition" : "Patchy sleet possible",
		"image" : "snow.png"
	},
	{
		"condition" : "Patchy freezing drizzle possible",
		"image" : "light_rain.png"
	},
	{
		"condition" : "Thundery outbreaks possible",
		"image" : "lightning.png"
	},
	{
		"condition" : "Blowing snow",
		"image" : "snow.png"
	},
	{
		"condition" : "Blizzard",
		"image" : "snow.png"
	},
	{
		"condition" : "Fog",
		"image" : "cloudy.png"
	},
	{
		"condition" : "Freezing fog",
		"image" : "cloudy.png"
	},
	{
		"condition" : "Patchy light drizzle",
		"image" : "light_rain.png"
	},
	{
		"condition" : "Light drizzle",
		"image" : "light_rain.png"
	},
	{
		"condition" : "Freezing drizzle",
		"image" : "light_rain.png"
	},
	{
		"condition" : "Heavy freezing drizzle",
		"image" : "heavy_rain.png"
	},
	{
		"condition" : "Patchy light rain",
		"image" : "light_rain.png"
	},
	{
		"condition" : "Patchy rain nearby",
		"image" : "light_rain.png"
	},
	{
		"condition" : "Light rain",
		"image" : "light_rain.png"
	},
	{
		"condition" : "Moderate rain at times",
		"image" : "rain.png"
	},
	{
		"condition" : "Moderate rain",
		"image" : "rain.png"
	},
	{
		"condition" : "Heavy rain at times",
		"image" : "heavy_rain.png"
	},
	{
		"condition" : "Heavy rain",
		"image" : "heavy_rain.png"
	},
	{
		"condition" : "Light freezing rain",
		"image" : "light_rain.png"
	},
	{
		"condition" : "Moderate or heavy freezing rain",
		"image" : "heavy_rain.png"
	},
	{
		"condition" : "Light sleet",
		"image" : "snow.png"
	},
	{
		"condition" : "Moderate or heavy sleet",
		"image" : "snow.png"
	},
	{
		"condition" : "Patchy light snow",
		"image" : "snow.png"
	},
	{
		"condition" : "Light snow",
		"image" : "snow.png"
	},
	{
		"condition" : "Patchy moderate snow",
		"image" : "snow.png"
	},
	{
		"condition" : "Moderate snow",
		"image" : "snow.png"
	},
	{
		"condition" : "Patchy heavy snow",
		"image" : "snow.png"
	},
	{
		"condition" : "Heavy snow",
		"image" : "snow.png"
	},
	{
		"condition" : "Ice pellets",
		"image" : "snow.png"
	},
	{
		"condition" : "Light rain shower",
		"image" : "light_rain.png"
	},
	{
		"condition" : "Moderate or heavy rain shower",
		"image" : "heavy_rain.png"
	},
	{
		"condition" : "Torrential rain shower",
		"image" : "heavy_rain.png"
	},
	{
		"condition" : "Light sleet showers",
		"image" : "light_rain.png"
	},
	{
		"condition" : "Moderate or heavy sleet showers",
		"image" : "heavy_rain.png"
	},
	{
		"condition" : "Light snow showers",
		"image" : "snow.png"
	},
	{
		"condition" : "Moderate or heavy snow showers",
		"image" : "heavy_rain.png"
	},
	{
		"condition" : "Light showers of ice pellets",
		"image" : "light_rain.png"
	},
	{
		"condition" : "Moderate or heavy showers of ice pellets",
		"image" : "heavy_rain.png"
	},
	{
		"condition" : "Patchy light rain with thunder",
		"image" : "lightning_storm.png"
	},
	{
		"condition" : "Moderate or heavy rain with thunder",
		"image" : "lightning_storm.png"
	},
	{
		"condition" : "Patchy light snow with thunder",
		"image" : "lightning_storm.png"
	},
	{
		"condition" : "Moderate or heavy snow with thunder",
		"image" : "lightning_storm.png"
	}
];

let conditionsMap = new Map();

for (let i = 0; i < conditions.length; i++) {
	conditionsMap.set(conditions[i].condition, conditions[i].image);
}

export default conditionsMap;