import React, { useState, useContext } from 'react'
import '../Styles/TokenSelect.css'
import { AppContext } from '../Context/AppContext'
import { logoMapping, tokens } from '../utils/helpers'

const TokenSelect = ({ selection }: any) => {
  const { clicked } = useContext(AppContext)
  const [tokenSearch, setTokenSearch] = useState<string>("")

  return (
    <div className={`tokenSelect ${clicked ? "active" : "inactive"}`}>
      <input className="searchInput" type="text" placeholder="Search Tokens" onChange={(e) => setTokenSearch(e.target.value)}/>
      <ul>
        {tokens && tokens.filter((asset: any) => {
            if (tokenSearch === "") {
              return asset
            } else if (asset.displayName.toLowerCase().includes(tokenSearch.toLowerCase())) {
              return asset
            }
        }).map((tokens: any) => {
          return (
            <li key={tokens.address} id="tokenSelect" onClick={(e) => selection(e)} data-address={tokens.address} data-decimals={tokens.decimals}>
              <img src={logoMapping[tokens.displayName]} alt={tokens.displayName}/> 
              {tokens.displayName}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TokenSelect;
