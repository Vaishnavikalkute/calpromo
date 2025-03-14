
import ReactBigCalendar from "./components/reactbigcalender";
// import './index.css'; // Ensure this is included

export default function App() {
  return (
    <>
      <div className="bg-blue-500 text-white p-4">
        <label> Just showing of my buzyness</label>
        <div>
          <ReactBigCalendar />
        </div>
      </div>
    </>
  )
}