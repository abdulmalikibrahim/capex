import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TableMonitoring = ({API_URL,showAlert}) => {
    const currentDate = new Date()
    const currentMonth = (currentDate.getMonth() + 1)
    const currentYear = currentDate.getFullYear()
    const [dataReport,setdataReport] = useState([])
    const [reload,setReload] = useState(true)
    
    const data = async () => {
        try {
            const result = await axios.get(`${API_URL}/getDataReporting`)
            if(result.status === 200){
                setdataReport(result.data.res)
                setReload(false)
            }
        } catch (error) {
            showAlert("Error","Mohon maaf ada kesalah tak terduga","error")
            console.error(error)
        }
    }

    useEffect(() => {
        data()
        // eslint-disable-next-line
    },[])

    let periodeStart = ''
    let periodeEnd = ''
    if(currentMonth === 1 || currentMonth === 2 || currentMonth === 3){
        periodeStart = (currentYear - 1)
        periodeEnd = currentYear
    }else{
        periodeStart = currentYear
        periodeEnd = (currentYear + 1)
    }

    return(
        <Main>
            <Header periodeStart={periodeStart} periodeEnd={periodeEnd} />
            <DataTable periodeStart={periodeStart} periodeEnd={periodeEnd} dataReport={dataReport} reload={reload} />
        </Main>
    )
}

const Main = ({children}) => {
    return(
        <>
            <style>
                {`
                @media print {
                    body {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    table {
                        border-collapse: collapse;
                    }

                    th, td {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                }
                `}
            </style>
            {children}
        </>
    )
}

const Header = ({periodeStart,periodeEnd}) => {
    return(
        <div className="p-1" style={{fontSize:"7pt"}}>
            <table border={0} width={"100%"}>
                <tbody>
                    <tr>
                        <td rowSpan={5} width={90} className='pe-2'><img src="Assets/Logo/logo_report.png" width="100%" /></td>
                        <td>PT. ASTRA DAIHATSU MOTOR</td>
                        <td colSpan={22} rowSpan={5} style={{fontSize:"20pt", textAlign:"center"}}><b>MONITORING CAPEX { `${periodeStart} - ${periodeEnd}` }</b></td>
                    </tr>
                    <tr>
                        <td style={{width:"144px"}}>[KARAWANG ASSEMBLY PLANT]</td>
                    </tr>
                    <tr>
                        <td>[KAP PRODUCTION]</td>
                    </tr>
                    <tr>
                        <td>[KAP QUALITY]</td>
                    </tr>
                    <tr>
                        <td>[KAP PAD]</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

const DataTable = ({periodeStart,periodeEnd,dataReport,reload}) => {
    const monthArray = {"APR":4,"MAY":5,"JUN":6,"JUL":7,"AUG":8,"SEP":9,"OCT":10,"NOV":11,"DEC":12,"JAN":1,"FEB":2,"MAR":3}
    const Invest = ["Improvement","Replacement"]
    return(
        <div className="mt-2">
            {
                Invest.map((invest,_) => (
                    <>        
                    <h4>{invest}</h4>
                    <table className="table table-bordered table-hover border-dark" style={{fontSize:"8pt"}}>
                        <thead style={{backgroundColor:"#A9A9A9", fontWeight:"bold"}}>
                            <tr className="text-center align-middle">
                                <th rowSpan={2} width="100px">DEPT. INCHARGE</th>
                                <th rowSpan={2}>No.</th>
                                <th rowSpan={2}>DESCRIPTION</th>
                                <th>PLAN</th>
                                <th rowSpan={2}>Usage</th>
                                <th rowSpan={2}>Remain Budget</th>
                                <th colSpan={12}>REALIZATION PLAN ({`${periodeStart} - ${periodeEnd}`})</th>
                                <th rowSpan={2}>No. IA</th>
                                <th rowSpan={2} width="150">REMARK</th>
                            </tr>
                            <tr className="text-center align-middle">
                                <th>FIY {periodeStart}</th>
                                {
                                    Object.keys(monthArray).map((month) => (
                                        (month === "JAN" || month === "FEB" || month === "MAR") ? <th>{`${month}-${periodeEnd}`}</th> : <th>{`${month}-${periodeStart}`}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                reload === true
                                ? <td colSpan={20} className='text-center pt-3 pb-3' style={{fontSize:"20pt"}}><i className="fas fa-spinner fa-spin"></i> Getting Data...</td>
                                : Object.entries(dataReport).map(([shop,valueReport]) => (
                                    <>
                                        <tr>
                                            <td rowSpan={valueReport[invest]["rowSpan"]} className='fw-bold align-middle text-center' style={{fontSize:"13pt"}}>{shop}</td>
                                        </tr>
                                        {
                                            Object.entries(valueReport[invest]["data"]).map((value,index) => {
                                                const colorCell = value[1]["type"] === "BTOS" ? "bg-warning" : "bg-light"
                                                return(
                                                    <tr>
                                                        <td className={`${colorCell} text-center align-middle p-1`}>{index+1}</td>
                                                        <td className={`${colorCell} align-middle p-1`}>{value[1]["category"]}</td>
                                                        <td className={`${colorCell} text-center align-middle p-1`}>{value[1]["plan"]}</td>
                                                        <td className={`${colorCell} text-center align-middle p-1`}>{value[1]["usage"]}</td>
                                                        <td className={`${colorCell} text-center align-middle p-1`}>{value[1]["remainBudget"]}</td>
                                                        {
                                                            Object.values(monthArray).map((monthNum,_) => (
                                                                <td className={`${colorCell} text-center align-middle p-1`}>{value[1]["month"] === monthNum ? value[1]["usage"] : ""}</td>
                                                            ))
                                                        }
                                                        <td className={`${colorCell} text-center align-middle p-1`}>{value[1]["ia"]}</td>
                                                        <td className={`${colorCell} align-middle p-1`}>{value[1]["keterangan"]}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        <tr className='fw-bold text-center' style={{fontSize:"11pt",background:"#A9A9A9"}}>
                                            <td colSpan={2}>{shop} SUMMARY</td>
                                            <td>{valueReport[invest]["totalPlan"]}</td>
                                            <td>{valueReport[invest]["totalActual"]}</td>
                                            <td>{valueReport[invest]["totalRemainBudget"]}</td>
                                            {
                                                Object.values(monthArray).map((monthNum,_) => (
                                                    <td>{valueReport[invest]["dataSummaryMonth"][monthNum]}</td>
                                                ))
                                            }
                                            <td colSpan={2}></td>
                                        </tr>
                                    </>
                                ))
                            }
                        </tbody>
                    </table>
                    </>
                ))
            }
        </div>
    )
} 

export default TableMonitoring;