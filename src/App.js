import { useState } from 'react';

const URL = 'https://open.er-api.com/v6/latest/EUR'

function App() {
  const [eur, setEur] = useState(0);
  const [gbp, setGbp] = useState(0);
  const [rate, setRate] = useState(0);

async function convert(e) {
  e.preventDefault();
  try{
    const response = await fetch (URL);

    if(response.ok){
      const JSON = await response.json();
      setRate(JSON.rates.GBP);
      setGbp((eur*JSON.rates.GBP).toFixed(2));

    } else{
      alert('Error retrieving exchange rate.')
      console.log(response);
    }
  } catch(err) {
    alert(err);
  }
}

  return (
    <form className='m-3 w-50'>
      <div className="form-group">
        <label>Euro</label>
        <input type="number" className="form-control" value={eur} onChange={e => setEur(e.target.value)} />
          <small className="form-text text-muted">Euros will be converted using current exchange rate: {rate}</small>
      </div>
      <div className="form-group mt-3">
        <label>British Pounds</label>
        <output type="number" className="form-control">{gbp}</output>
      </div>
      <div className="mt-3">
        <button type="button" className="btn btn-primary" onClick={convert}>Convert</button>
      </div>
      <div className="mt-5">
        <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>
      </div>
    </form>
  );
}

export default App;
