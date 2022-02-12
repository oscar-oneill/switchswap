import React, { useContext } from 'react';
import { AppContext } from '../Context/AppContext'
import { logoMapping } from '../utils/helpers'
import '../Styles/SavedCombinations.css'

const SavedCombinations = ({ open }: any) => {
  const { combinations } = useContext(AppContext)

  return (
    <div className={`combination ${open ? "active" : "inactive"}`}>
      <h3>Previous Combinations</h3>
      <ul>
        {combinations && combinations.map((ele: any, i: any) => {
          return (
            <li key={i}>
              <div>{ele.outgoing} <img src={logoMapping[ele.outgoing]} alt="outgoing"/> {ele.incoming} <img src={logoMapping[ele.incoming]} alt="incoming"/></div>
            </li>
          )
        })}
      </ul>
    </div>
  )
};

export default SavedCombinations;