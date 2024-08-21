const conditions = [
	{
		"condition" : "SUNNY",
		"image" : "assets/images/sunny.png"
	},
	{
		"condition" : "CLEAR",
		"image" : "assets/images/night.png"
	},
	{
		"condition" : "PARTLY CLOUDY",
		"image" : "assets/images/partly_cloudy.png"
	},
	{
		"condition" : "CLOUDY",
		"image" : "assets/images/cloudy.png"
	},
	{
		"condition" : "OVERCAST",
		"image" : "assets/images/overcast.png"
	},
	{
		"condition" : "MIST",
		"image" : "assets/images/light_rain.png"
	},
	{
		"condition" : "PATCHY RAIN POSSIBLE",
		"image" : "assets/images/light_rain.png"
	},
	{
		"condition" : "PATCHY SNOW POSSIBLE",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "PATCHY SLEET POSSIBLE",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "PATCHY FREEZING DRIZZLE POSSIBLE",
		"image" : "assets/images/light_rain.png"
	},
	{
		"condition" : "THUNDERY OUTBREAKS POSSIBLE",
		"image" : "assets/images/lightning.png"
	},
	{
		"condition" : "THUNDERY OUTBREAKS IN NEARBY",
		"image" : "assets/images/lightning.png"
	},
	{
		"condition" : "BLOWING SNOW",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "BLIZZARD",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "FOG",
		"image" : "assets/images/cloudy.png"
	},
	{
		"condition" : "FREEZING FOG",
		"image" : "assets/images/cloudy.png"
	},
	{
		"condition" : "PATCHY LIGHT DRIZZLE",
		"image" : "assets/images/light_rain.png"
	},
	{
		"condition" : "LIGHT DRIZZLE",
		"image" : "assets/images/light_rain.png"
	},
	{
		"condition" : "FREEZING DRIZZLE",
		"image" : "assets/images/light_rain.png"
	},
	{
		"condition" : "HEAVY FREEZING DRIZZLE",
		"image" : "assets/images/heavy_rain.png"
	},
	{
		"condition" : "PATCHY LIGHT RAIN",
		"image" : "assets/images/light_rain.png"
	},
	{
		"condition" : "PATCHY RAIN NEARBY",
		"image" : "assets/images/light_rain.png"
	},
	{
		"condition" : "LIGHT RAIN",
		"image" : "assets/images/light_rain.png"
	},
	{
		"condition" : "MODERATE RAIN AT TIMES",
		"image" : "assets/images/rain.png"
	},
	{
		"condition" : "MODERATE RAIN",
		"image" : "assets/images/rain.png"
	},
	{
		"condition" : "HEAVY RAIN AT TIMES",
		"image" : "assets/images/heavy_rain.png"
	},
	{
		"condition" : "HEAVY RAIN",
		"image" : "assets/images/heavy_rain.png"
	},
	{
		"condition" : "LIGHT FREEZING RAIN",
		"image" : "assets/images/light_rain.png"
	},
	{
		"condition" : "MODERATE OR HEAVY FREEZING RAIN",
		"image" : "assets/images/heavy_rain.png"
	},
	{
		"condition" : "LIGHT SLEET",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "MODERATE OR HEAVY SLEET",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "PATCHY LIGHT SNOW",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "LIGHT SNOW",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "PATCHY MODERATE SNOW",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "MODERATE SNOW",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "PATCHY HEAVY SNOW",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "HEAVY SNOW",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "ICE PELLETS",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "LIGHT RAIN SHOWER",
		"image" : "assets/images/light_rain.png"
	},
	{
		"condition" : "MODERATE OR HEAVY RAIN SHOWER",
		"image" : "assets/images/heavy_rain.png"
	},
	{
		"condition" : "TORRENTIAL RAIN SHOWER",
		"image" : "assets/images/heavy_rain.png"
	},
	{
		"condition" : "LIGHT SLEET SHOWERS",
		"image" : "assets/images/light_rain.png"
	},
	{
		"condition" : "MODERATE OR HEAVY SLEET SHOWERS",
		"image" : "assets/images/heavy_rain.png"
	},
	{
		"condition" : "LIGHT SNOW SHOWERS",
		"image" : "assets/images/snow.png"
	},
	{
		"condition" : "MODERATE OR HEAVY SNOW SHOWERS",
		"image" : "assets/images/heavy_rain.png"
	},
	{
		"condition" : "LIGHT SHOWERS OF ICE PELLETS",
		"image" : "assets/images/light_rain.png"
	},
	{
		"condition" : "MODERATE OR HEAVY SHOWERS OF ICE PELLETS",
		"image" : "assets/images/heavy_rain.png"
	},
	{
		"condition" : "PATCHY LIGHT RAIN WITH THUNDER",
		"image" : "assets/images/lightning_storm.png"
	},
	{
		"condition" : "PATCHY LIGHT RAIN IN AREA WITH THUNDER",
		"image" : "assets/images/lightning_storm.png"
	},
	{
		"condition" : "MODERATE OR HEAVY RAIN WITH THUNDER",
		"image" : "assets/images/lightning_storm.png"
	},
	{
		"condition" : "PATCHY LIGHT SNOW WITH THUNDER",
		"image" : "assets/images/lightning_storm.png"
	},
	{
		"condition" : "MODERATE OR HEAVY SNOW WITH THUNDER",
		"image" : "assets/images/lightning_storm.png"
	}
];

let conditionsMap = new Map();

conditions.forEach(item => {
	conditionsMap.set(item.condition, item.image);
});

export default conditionsMap;