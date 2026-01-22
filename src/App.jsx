import { useEffect, useState } from "react";

/* ---------------- Header ---------------- */
function Myhead() {
  return (
    <h1 className="flex justify-center text-3xl font-bold mt-4">
      Weather App
    </h1>
  );
}

/* ---------------- Navbar ---------------- */
function MyNav({ searchCity, setSearchCity, handleSearch }) {
  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-black text-white rounded">Home</button>
        <button className="px-4 py-2 bg-black text-white rounded">History</button>
        <button className="px-4 py-2 bg-black text-white rounded">About</button>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search city"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          className="px-4 py-2 border border-gray-500 rounded"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Search
        </button>
      </div>
    </div>
  );
}

/* ---------------- City Cards ---------------- */
function MyCity({ searchCity, setSearchCity }) {
  const imageUrl =
    "https://plus.unsplash.com/premium_photo-1669809948017-518b5d800d73?fm=jpg&q=60&w=3000";

  const defaultCities = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Tokyo"];

  const [cities, setCities] = useState([]);

  async function fetchCityWeather(city) {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&units=metric`
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      return {
        name: city,
        temp: `${Math.round(data.main.temp)}°C`,
        condition: data.weather[0].description,
        icon: data.weather[0].icon,
      };
    } catch {
      alert("City not found ❌");
      return null;
    }
  }

  /* -------- Fetch default cities -------- */
  useEffect(() => {
    async function fetchDefaultCities() {
      const promises = defaultCities.map((city) =>
        fetchCityWeather(city)
      );
      const results = await Promise.all(promises);
      setCities(results.filter(Boolean));
    }
    fetchDefaultCities();
  }, []);

  /* -------- Search Handler -------- */
  const handleSearch = async () => {
    if (!searchCity.trim()) return;

    const result = await fetchCityWeather(searchCity);
    if (!result) return;

    setCities((prev) => {
      const exists = prev.find(
        (c) => c.name.toLowerCase() === result.name.toLowerCase()
      );

      if (exists) {
        return prev.map((c) =>
          c.name.toLowerCase() === result.name.toLowerCase() ? result : c
        );
      }
      return [...prev, result];
    });

    setSearchCity("");
  };

  return (
    <>
      <MyNav
        searchCity={searchCity}
        setSearchCity={setSearchCity}
        handleSearch={handleSearch}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {cities.map((city) => (
          <div
            key={city.name}
            className="relative text-white rounded-lg overflow-hidden h-52"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="bg-black/60 w-full h-full flex flex-col items-center justify-center">
              <h2 className="text-xl font-bold">{city.name}</h2>

              {city.icon && (
                <img
                  src={`https://openweathermap.org/img/wn/${city.icon}@2x.png`}
                  alt={city.condition}
                />
              )}

              <p className="text-2xl">{city.temp}</p>
              <p className="capitalize text-sm">{city.condition}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ---------------- App ---------------- */
export default function MyApp() {
  const [searchCity, setSearchCity] = useState("");

  return (
    <div>
      <Myhead />
      <MyCity searchCity={searchCity} setSearchCity={setSearchCity} />
    </div>
  );
}
