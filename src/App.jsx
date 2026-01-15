console.log("hi");
console.log("API KEY:", import.meta.env.VITE_WEATHER_API_KEY);

function Myhead() {
  return (
    <h1 className="flex justify-center text-3xl font-bold mt-4">
      Weather App
    </h1>
  );
}

function MyNav() {
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
          className="px-4 py-2 border border-gray-500 rounded"
        />
        <button className="px-4 py-2 bg-black text-white rounded" >Search</button>
      </div>
    </div>
  );
}
function MyCity() {
  const imageUrl =
    "https://plus.unsplash.com/premium_photo-1669809948017-518b5d800d73?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D";

  return (
    <div className="grid grid-cols-5 gap-4 p-4 h-[80vh]">
      {[1, 2, 3, 4, 5].map((city) => (
        <div
          key={city}
          className="relative flex items-center justify-center text-white text-xl font-bold rounded-lg overflow-hidden"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-black/50 px-4 py-2 rounded">
            City {city}
          </div>
        </div>
      ))}
    </div>
  );
}


export default function MyApp() {
  return (
    <div>
      <Myhead />
      <MyNav />
      <MyCity/>
    </div>
  );
}
