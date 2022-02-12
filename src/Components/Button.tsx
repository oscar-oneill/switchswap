import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext'
import Web3 from 'web3';
import ABI from '../utils/iContractABI.json'
import '../Styles/Button.css'
import { protocols, tokens } from '../utils/helpers'

const Button = ({ fromToken, toToken, fromAmount, receiveDecimals, paymentToken, receiveToken }: any) => {
    const { setData, setCombinations } = useContext(AppContext)
    const web3: any = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/f46df9d400e44009acf913bccc817b38"))
    const WETH: string = tokens[7].address
    const wethDecimals: number = tokens[7].decimals

    interface Swap {
        protocol: string,
        amount: number,
        route: string,
        directSwap: boolean,
    }

    interface Combinations {
        outgoing: string,
        incoming: string
    }

    const getProtocolData = () => {
        protocols.map(async (protocol: any) => {
            let contract: any = new web3.eth.Contract(ABI, protocol.address)

            try {
                // Initial call to retrieve the swap data
                let primarySwap: any = await contract.methods.getAmountsOut(web3.utils.toWei(fromAmount), [fromToken, toToken])
                                    .call()
                                    .catch((err: any) => {
                                        JSON.stringify(err, Object.getOwnPropertyNames(err))
                                    })
                
                // If the primary swap is not possible, route the swap through WETH
                if (!primarySwap) {
                    try {
                        const secondarySwap: any = await contract.methods.getAmountsOut(web3.utils.toWei(fromAmount), [fromToken, WETH]).call()
                        const result: number = Number(secondarySwap[1])
                        const conversion: string = (result / (10**wethDecimals)).toString()

                        const finalSwap: any = await contract.methods.getAmountsOut(web3.utils.toWei(conversion), [WETH, toToken]).call()
                        const finalResult: number = Number(finalSwap[1])
                        const finalConversion: number = finalResult / (10**receiveDecimals)

                        let swap: Swap = {
                            protocol: protocol.protocol,
                            amount: Number(finalConversion.toFixed(4)),
                            route: `${paymentToken} > WETH > ${receiveToken}`,
                            directSwap: false,
                        }

                        setData((data: any) => [...data, swap])

                    } catch (error) {
                        console.log(error)
                    }

                } 

                // Otherwise execute the swap normally
                else {
                    const result: number = Number(primarySwap[1])
                    const conversion: number = (((result) / (10**receiveDecimals)))

                    let swap: Swap = { 
                        protocol: protocol.protocol,
                        amount: Number(conversion.toFixed(4)),
                        route: `${paymentToken} > ${receiveToken}`,
                        directSwap: true,
                    }

                    // Upon data return, this action places the swap object in the data state
                    setData((data: any) => [...data, swap])
                }
            } catch (error) {
                console.log(error)
            }
        })
    }

    const triggerSwap = () => {
        // Pressing the swap button will call the following functions and retrieve data from the specific protocols
        getProtocolData()

        // The pairs selected for the swap are now stored in the 'combinations' state
        let swapTokens: Combinations = {
            outgoing: paymentToken,
            incoming: receiveToken,
        }

        setCombinations((combinations: any) => [...combinations, swapTokens])
    }

    return ( 
        <button className="button" disabled={!fromAmount} onClick={triggerSwap}>Swap</button>
    )
}

export default Button;
