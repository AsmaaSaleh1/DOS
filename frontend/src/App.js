import './App.css';
import CardUI from "./components/CardUI"
import {useAxios} from "use-axios-client";

function App() {
    let { data } = useAxios({url:'http://localhost:8081/api/query/item',method:'GET'})
    console.log(data)
    return (
    <div>
      <div className="navbar justify-content-center">
        <input
            type="text"
            id="header-search"
            placeholder="   SEARCH BOOKS"
            name="s"
            className="input"
        />
        <button type="submit" className="btn btn1 btn-outline-success" >Search</button>
      </div>
      <div className="container-fluid d-flex justify-content-between">
          <div className="row">
              {!data?null:data.map(data => {
                  return(
                      <div className="col-md-3">
                          <CardUI key={data.ID} data={data}/>
                      </div>
                  )
              })}

          </div>
      </div>
    </div>
  );
}

export default App;
