import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../Context/AppContext'
import { logoMapping, protocolLogos, tokens } from '../utils/helpers'
import '../Styles/Form.css'
import TokenSelect from './TokenSelect';
import SavedCombinations from './SavedCombinations';
import Button from './Button';

const Form = () => {
    const { clicked, setClicked, data, setData, open, setOpen } = useContext(AppContext)
    const assetSelect = () => setClicked(!clicked)
    const openCombinations = () => setOpen(!open)
    const [swap, setSwap] = useState<Array<any | null>>([])

    const [paymentImage, setPaymentImage] = useState<string>(logoMapping.WETH)
    const [paymentToken, setPaymentToken] = useState<string>(tokens[7].displayName)
    const [paymentAddress, setPaymentAddress] = useState<string>(tokens[7].address)
    const [paymentDecimals, setPaymentDecimals] = useState<number>(tokens[7].decimals)

    const [receiveImage, setReceiveImage] = useState<string>(logoMapping.USDC)
    const [receiveToken, setReceiveToken] = useState<string>(tokens[2].displayName)
    const [receiveAddress, setReceiveAddress] = useState<string>(tokens[2].address)
    const [receiveDecimals, setReceiveDecimals] = useState<number>(tokens[2].decimals)

    const [selectionTarget, setSelectionTarget] = useState<string | null>("")
    const [inputValue, setInputValue] = useState<number | any>(undefined)
    // eslint-disable-next-line
    const [payHistory, setPayHistory] = useState<Array<any>>([])
    // eslint-disable-next-line
    const [receiveHistory, setReceiveHistory] = useState<Array<any>>([])

    useEffect(() => {
        data.sort((a: any, b: any) => {
            return (b.amount > a.amount) ? 1 : -1
        })

        const max: number = 2
        const length: number= data.length
        const val: number= max - length

        const slice: any = data.slice(0, val)
        setSwap(slice)

    }, [data])

    const selection = (e: any) => {
        const token: string = e.target.innerText;
        const address: string = e.target.dataset.address;
        const image: string = logoMapping[token];
        const decimals: number = Number(e.target.dataset.decimals);

        if (selectionTarget === "payment") {
            setPaymentAddress(address)
            setPaymentToken(token)
            setPaymentImage(image)
            setPaymentDecimals(decimals) 
            setInputValue(null)
        } 

        if (selectionTarget === "receive") {
            setReceiveAddress(address)
            setReceiveToken(token)
            setReceiveImage(image)
            setReceiveDecimals(decimals)
        }

        assetSelect()
    }

    const element = (e: any) => {
        setSelectionTarget(e.target.id)
        setData([])
    }

    const updateInput = (e: any) => {
        if (e.target.value > 0) {
            setInputValue(e.target.value)
            setData([])
        } else {
            setInputValue(undefined)
        }
    }

    const stack = () => {
        if (selectionTarget === "payment") {
            payHistory.push({
                token: paymentToken,
                address: paymentAddress,
                image: paymentImage,
                decimals: paymentDecimals
            })
        } 
        
        if (selectionTarget === "receive") {
            receiveHistory.push({
                token: receiveToken,
                address: receiveAddress,
                image: receiveImage,
                decimals: receiveDecimals
            })
        }
    }

    // Resets selected token target if it matches the opposite target to prevent a call with the same token
    const sameAssetError = () => {
        if (selectionTarget === "payment") {
            if (paymentToken === receiveToken) {
                setPaymentAddress(payHistory[0].address)
                setPaymentToken(payHistory[0].token)
                setPaymentImage(payHistory[0].image)
                setPaymentDecimals(payHistory[0].decimals)
            }
        } else if (selectionTarget === "receive") {
            if (receiveToken === paymentToken) {
                setReceiveAddress(receiveHistory[0].address)
                setReceiveToken(receiveHistory[0].token)
                setReceiveImage(receiveHistory[0].image)
                setReceiveDecimals(receiveHistory[0].decimals)
            }
        }
    }

    useEffect(() => {
        stack()
        sameAssetError()
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [element])

    return (
        <div className="main_container">
            <div className="tab_container">
                <div className="tab" onClick={openCombinations}>History</div>
            </div>

            <form className="form_container">
                <TokenSelect selection={selection}/>
                <SavedCombinations open={open}/>

                <div className="payment_container">
                    <div className="actionTitle">Pay</div>

                    <div className="assetPayment">
                        <img id="payment" className="asset" src={paymentImage} onClick={(e) => { element(e); assetSelect() }} alt="Payment Asset" data-address={paymentAddress}/>

                        <div className="assetData">
                            <div className="assetInfo">
                                <div className="assetName">{paymentToken}</div>
                            </div>

                            <div className="assetInputContainer">
                                <input className="assetInput" type="number" min={0.01} autoComplete="false" step="0.01" placeholder="0.00" value={inputValue || ''} onChange={updateInput}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="switcher_container">
                    <div className="switcher_button">&#8595;</div>
                </div>

                <div className="receive_container">
                    <div className="actionTitle">Receive</div>

                    <div className="assetReceive">
                        <img id="receive" className="asset" src={receiveImage} onClick={(e) => { element(e); assetSelect() }} alt="Receive Asset" data-address={receiveAddress}/>

                        <div className="assetData">
                            <div className="assetInfo">
                                <div className="assetName">{receiveToken ? receiveToken : ""}</div>
                            </div>
                        </div>
                    </div>

                    <div className="assetOutputContainer">
                        {swap && swap.map((ele, i) => {
                            return (
                                <div key={i} className="assetOutput">
                                    <div className="assetAmount">
                                        {ele.amount}
                                    </div>
                                    <div className="assetProtocol">
                                        <div className="protocolDisplay"> 
                                            <span style={{marginRight: "5px"}}><h6>({ele.route})</h6></span>
                                            via {ele.protocol} 
                                            <img 
                                                className="protocolLogo" 
                                                src={protocolLogos[ele.protocol]} 
                                                alt="protocol logo"
                                            />
                                        </div>
                                    
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </form>
            
            <Button
                fromToken={paymentAddress}
                toToken={receiveAddress}
                fromAmount={inputValue}
                receiveDecimals={receiveDecimals}
                paymentToken={paymentToken}
                receiveToken={receiveToken}
            />
        </div>
    )
}

export default Form;
