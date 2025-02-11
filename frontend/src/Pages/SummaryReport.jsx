import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useReactToPrint } from "react-to-print";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const SummaryReport = ({API_URL,showAlert}) => {
    const [dataReport,setdataReport] = useState([])
    const [dataReportTotal,setdataReportTotal] = useState([])
    const [loadingExcel,setloadingExcel] = useState(false)

    const getData = async () => {
        try {
            const result = await axios.get(`${API_URL}/getSummaryReport`)
            if(result.status === 200){
                setdataReport(result.data.res)
                setdataReportTotal(result.data.resTotal)
            }
        } catch (error) {
            showAlert('Error','Maaf ada kesalahan tak terduga','error')
            console.error(error)
        }
    }
    useEffect(() => {
        getData()
        // eslint-disable-next-ling
    },[])
    
    const contentRef = useRef();
    
    const handlePrint = useReactToPrint({
        contentRef: contentRef,
        documentTitle: `SUMMARY REPORT`
    });

    const exportToExcel = () => {
        setloadingExcel(true)
        const tables = contentRef.current.querySelectorAll("table"); // Ambil semua tabel dalam div
        const sheetNames = ["KAP1", "KAP2", "SUMMARY TOTAL"]; // Nama sheet yang diinginkan
        const workbook = XLSX.utils.book_new(); // Buat workbook baru
    
        tables.forEach((table, index) => {
            const worksheet = XLSX.utils.table_to_sheet(table); // Konversi tabel ke sheet
    
            // Atur format (menengahkan teks)
            const range = XLSX.utils.decode_range(worksheet["!ref"]);
            for (let R = range.s.r; R <= range.e.r; ++R) {
                for (let C = range.s.c; C <= range.e.c; ++C) {
                    const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
                    if (worksheet[cellAddress]) {
                            worksheet[cellAddress].s = { alignment: { horizontal: "center" } }; // Set teks ke tengah
                    }
                }
            }
    
            const sheetName = sheetNames[index] || `Sheet ${index + 1}`; // Gunakan nama yang sudah ditentukan
            XLSX.utils.book_append_sheet(workbook, worksheet, sheetName); // Tambahkan ke workbook
        });      
    
        // Konversi ke file Excel
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array", cellStyles: true });
        const fileData = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    
        saveAs(fileData, "Summary Report.xlsx"); // Simpan file
        setloadingExcel(false)
    };

    return(
        <>
            <div ref={contentRef} style={{marginBottom:"4rem"}}>
                <TableSummary plant={"1"} dataReport={dataReport} dataReportTotal={dataReportTotal} />   
                <TableSummary plant={"2"} dataReport={dataReport} dataReportTotal={dataReportTotal} />
                <TableSummary plant={'total'} dataReport={dataReport} dataReportTotal={dataReportTotal} />
            </div>
            <ButtonAction handlePrint={handlePrint} exportToExcel={exportToExcel} loadingExcel={loadingExcel} />
        </>
    )
}

const TableSummary = ({plant,dataReport,dataReportTotal}) => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const getFullMonthName = (date) => {
        return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
    }
    const currentMonth = getFullMonthName(currentDate)
    return(
        <>
            <h2>{ plant !== "total" ? `KAP ${plant}` : "SUMMARY TOTAL" }</h2>
            <table border={1} className="table table-bordered table-hover bg-light border-dark" data-sheet-name={plant !== "total" ? `KAP ${plant}` : "SUMMARY TOTAL"}>
                <thead className='thead-light bg-secondary'>
                    <tr className='text-center'>
                        <th className='align-middle' rowSpan={2}>Shop</th>
                        <th colSpan={6}>Improvement ACC Till {`${currentMonth} ${currentYear}`}</th>
                        <th colSpan={6}>Replacement ACC Till {`${currentMonth} ${currentYear}`}</th>
                        <th className='align-middle' rowSpan={2}>Total Remain</th>
                    </tr>
                    <tr className='text-center'>
                        <th>Plan</th>
                        <th>BFOS</th>
                        <th>BTOS</th>
                        <th>Actual</th>
                        <th>Act X Plan</th>
                        <th>Remain</th>
                        <th>Plan</th>
                        <th>BFOS</th>
                        <th>BTOS</th>
                        <th>Actual</th>
                        <th>Act X Plan</th>
                        <th>Remain</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (plant !== "total" && dataReport[plant] !== undefined) 
                        ? Object.entries(dataReport[plant]).map((vreport,index) => (
                            <tr key={index} className='text-center'>
                                <td>{vreport[0]}</td>
                                <td>{vreport[1]["Improvement"]["plan"]}</td>
                                <td>{vreport[1]["Improvement"]["bfos"]}</td>
                                <td>{vreport[1]["Improvement"]["btos"]}</td>
                                <td>{vreport[1]["Improvement"]["actual"]}</td>
                                <td className='bg-info'>{vreport[1]["Improvement"]["actualxplan"]}</td>
                                <td className='bg-warning'>{vreport[1]["Improvement"]["remain"]}</td>
                                <td>{vreport[1]["Replacement"]["plan"]}</td>
                                <td>{vreport[1]["Replacement"]["bfos"]}</td>
                                <td>{vreport[1]["Replacement"]["btos"]}</td>
                                <td>{vreport[1]["Replacement"]["actual"]}</td>
                                <td className='bg-info'>{vreport[1]["Replacement"]["actualxplan"]}</td>
                                <td className='bg-warning'>{vreport[1]["Replacement"]["remain"]}</td>
                                <td className='bg-danger'>{vreport[1]["remain_total"]}</td>
                            </tr>
                        ))
                        : Object.entries(dataReportTotal).map((vreport,index) => (
                            <tr key={index} className='text-center'>
                                <td>{vreport[0]}</td>
                                <td>{vreport[1]["Improvement"]["plan"]}</td>
                                <td>{vreport[1]["Improvement"]["bfos"]}</td>
                                <td>{vreport[1]["Improvement"]["btos"]}</td>
                                <td>{vreport[1]["Improvement"]["actual"]}</td>
                                <td className='bg-info'>{vreport[1]["Improvement"]["actualxplan"]}</td>
                                <td className='bg-warning'>{vreport[1]["Improvement"]["remain"]}</td>
                                <td>{vreport[1]["Replacement"]["plan"]}</td>
                                <td>{vreport[1]["Replacement"]["bfos"]}</td>
                                <td>{vreport[1]["Replacement"]["btos"]}</td>
                                <td>{vreport[1]["Replacement"]["actual"]}</td>
                                <td className='bg-info'>{vreport[1]["Replacement"]["actualxplan"]}</td>
                                <td className='bg-warning'>{vreport[1]["Replacement"]["remain"]}</td>
                                <td className='bg-danger'>{vreport[1]["remain_total"]}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

const ButtonAction = ({handlePrint,loadingPrint,exportToExcel,loadingExcel}) => {
    return(
        <div style={{position:"fixed", bottom:"10px", left:"21rem", fontSize:"15pt"}} >
            <Button variant='primary' className='me-2' onClick={() => handlePrint()}><i className="fas fa-file-pdf me-1"></i>PRINT PDF</Button>
            <Button variant='success' className='me-2' onClick={() => exportToExcel()}>
                {
                    loadingExcel ? <><i className="fas fa-spinner fa-spin"></i> DOWNLOADING...</> : <><i className="fas fa-file-excel me-1"></i>DOWNLOAD EXECL</>
                }
            </Button>
        </div>
    )
}

export default SummaryReport;