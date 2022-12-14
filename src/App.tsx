import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';
import './Coin.css';
import Cryptos from './Interfaces/Cryptos';

function App() {
  const [coins, setCoins] = useState<Cryptos[]>([])
  const [search, setSearch] = useState<string>('')


  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data)
      }).catch(error => console.log(error))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )


  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input type="text" placeholder='Search'
            className="coin-input" onChange={handleChange} />
        </form>
      </div>
      <div className='coin-row-title'>
        <div className='coin-title'>
          <h1>Name</h1>
          <p>Symbol</p>
        </div>
        <div className="coin-data-title">
          <p className="coin-price-title">Price</p>
          <p className="coin-volume-title">Volume</p>
          <p className="coin-percent-title">Change</p>
          <p className="coin-marketcap-title">
            Market Cap
          </p>
        </div>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
          />
        )
      })}
    </div>
  );
}

export default App;
