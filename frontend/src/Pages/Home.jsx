import React, { useEffect, useRef, useState } from 'react';
import Graph from '../Component/Graph';
import { Button, Modal } from 'react-bootstrap';
import ButtonAction from '../Component/ButtonAction';
import axios from 'axios';
import Swal from 'sweetalert2';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import FormUpload from '../Component/FormUpload';

const Home = ({shop,API_URL,showAlert}) => {
    // Custom plugin untuk menampilkan label di atas batang
    const formatNumber = (value) => {
        return new Intl.NumberFormat('id-ID', {
          style: 'decimal',
          maximumFractionDigits: 2, // Menentukan jumlah desimal
        }).format(value);
    };

    const [reloadData,setReloadData] = useState(false)
    const [showDetail, setShowDetail] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = () => setShowDetail(true);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    // Membuat data chart
    const [dataPlan, setDataPlan] = useState([]);
    const [dataActual, setDataActual] = useState([]);
    const [dataBFOS, setDataBFOS] = useState([]);
    const [dataBTOS, setDataBTOS] = useState([]);
    // Mengambil data dari API
    const getData = async () => {
        try {
            const formData = new FormData();
            formData.append('shop', shop);
            const result = await axios.post(`${API_URL}/dataCapex`,formData);
            const data = result.data.res;
            const plan = data.plan;
            const actual = data.actual;
            const bfos = data.bfos;
            const btos = data.btos;
            setDataPlan(plan);
            setDataActual(actual);
            setDataBFOS(bfos);
            setDataBTOS(btos);
        } catch (error) {
            showAlert('Error',"Mohon maaf ada kesalahan tak terduga","error")
            console.error(error.response)
        }
    };
    useEffect(() => {
        getData();
        getDataTable('plan');
        getDataTable('actual');
        getDataTable('bfos');
        getDataTable('btos');
    }, [shop,reloadData]);

    const [dataPlanTable, setDataPlanTable] = useState([]);
    const [dataActualTable, setDataActualTable] = useState([]);
    const [dataBFOSTable, setDataBFOSTable] = useState([]);
    const [dataBTOSTable, setDataBTOSTable] = useState([]);
    const getDataTable = async (tipe) => {
        try {
            const formData = new FormData();
            formData.append('shop', shop);
            formData.append('tipe',tipe);
            const result = await axios.post(`${API_URL}/getDataTable`,formData);
            const data = result.data.res;
            if(tipe === "plan"){
                setDataPlanTable(data);
            }else if(tipe === "actual"){
                setDataActualTable(data);
            }else if(tipe === "bfos"){
                setDataBFOSTable(data);
            }else if(tipe === "btos"){
                setDataBTOSTable(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const tableDetails = [
        { key: "table-detail-plan", title: "PLAN", tipe: "plan", data: dataPlanTable },
        { key: "table-detail-actual", title: "ACTUAL", tipe: "actual", data: dataActualTable },
        { key: "table-detail-bfos", title: "BUDGET FROM OTHER SHOP", tipe: "bfos", data: dataBFOSTable },
        { key: "table-detail-btos", title: "BUDGET TO OTHER SHOP", tipe: "btos", data: dataBTOSTable }
    ];

    const [loadingPrint,setloadingPrint] = useState(false)
    const pdfRef = useRef();
    const generatePDF = () => {
        setloadingPrint(true)
        const input = pdfRef.current;
        const fileName = `${shop}-Graph.pdf`;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("l", "mm", "a4");
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = 297; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            // Hitung posisi tengah
            const x = (pageWidth - imgWidth) / 2;
            const y = (pageHeight - imgHeight) / 2;
            pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
            pdf.save(fileName);
            setloadingPrint(false)
        });
    };
    return (
        <div>
            <div style={{position:"absolute", right:"10px", top:"10px"}}>
                <FormUpload API_URL={API_URL} setReloadData={setReloadData} reloadData={reloadData} showAlert={showAlert} shop={shop} />
            </div>
            <Graph pdfRef={pdfRef} formatNumber={formatNumber} dataPlan={dataPlan} dataActual={dataActual} dataBFOS={dataBFOS} dataBTOS={dataBTOS} shop={shop} />
            <ButtonAction handleShowDetail={handleShowDetail} handleShowAdd={handleShowAdd} generatePDF={generatePDF} loadingPrint={loadingPrint} />
            <ModalDetail handleCloseDetail={handleCloseDetail} show={showDetail}>
                {
                    tableDetails.map(({key,title,tipe,data}) => (
                        <TableDetail
                            key={key}
                            title={title}
                            tipe={tipe}
                            dataDetail={data}
                            formatNumber={formatNumber}
                            API_URL={API_URL}
                            showAlert={showAlert}
                            reloadData={reloadData}
                            setReloadData={setReloadData}
                            shop={shop} />
                    ))
                }
            </ModalDetail>
            <ModalAdd handleCloseAdd={handleCloseAdd} show={showAdd}>
                <FormAdd
                    API_URL={API_URL}
                    shop={shop}
                    showAlert={showAlert}
                    handleCloseAdd={handleCloseAdd}
                    reloadData={reloadData}
                    setReloadData={setReloadData} />
            </ModalAdd>
        </div>
    )
}

const ModalDetail = ({children,handleCloseDetail,show}) => {
    return(
        <>
        <Modal show={show} onHide={() => handleCloseDetail()} dialogClassName="modal-80w" aria-labelledby="example-custom-modal-styling-title">
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Detail Data
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
        </>
    )
}

const arrayMonth = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
const arrayDept = ["PRESS","BODY1","BODY2","TOSO1","TOSO2","ASSY1","ASSY2","QUALITY1","QUALITY2","LID1","LID2","MTN1","MTN2","GAOP3","PCD","QSS"]
const TableDetail = ({dataDetail,title,tipe,formatNumber,API_URL,showAlert,reloadData,setReloadData,shop}) => {
    const [input,setInput] = useState(0)
    const [Category,setCategory] = useState("")
    const [Invest,setInvest] = useState("Improvement")
    const [Month,setMonth] = useState("")
    const [OtherShop,setOtherShop] = useState("")
    const [Budget,setBudget] = useState("")
    const [AddData,setAddData] = useState(false)
    const totalBudget = () => {
        let total = 0;
        dataDetail.map((value,_) => {
            const budget = parseFloat(value.Budget)
            total += budget
        })
        return total;
    }
    const revisiClick = (id,category,invest,month,otherShop,budget) => {
        setInput(id)
        setCategory(category)
        setInvest(invest)
        setMonth(month)
        setOtherShop(otherShop)
        setBudget(budget)
    }
    
    const saveInput = async (id,method) => {
        const formData = new FormData()
        formData.append("id",id)
        formData.append("category",Category)
        formData.append("invest",Invest)
        formData.append("month",Month)
        formData.append("otherShop",OtherShop)
        formData.append("budget",Budget)
        formData.append("tipe",tipe)
        formData.append("shop",shop)

        const url = method === "add" ? `${API_URL}/addCapex` : `${API_URL}/updateCapex`
        try {
            const proses = await axios.post(url,formData)
            if(proses.status === 200){
                showAlert("Success","Data berhasil diupdate","success");
                setInput(0)
                setAddData(false)
                setReloadData(!reloadData)
            }
        } catch (error) {
            showAlert("Error","Maaf ada kesalahan tak terduga","error");
            console.error(error.response)
        }
    }

    const confirmDelete = (idDelete) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Data yang dihapus tidak bisa dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteData(idDelete);
            }
        });
    }

    const deleteData = async (idDelete) => {
        try {
            const formData = new FormData()
            formData.append("id",idDelete)
            const proses = await axios.post(`${API_URL}/deleteCapex`,formData)
            if(proses.status === 200){
                showAlert("Success","Data berhasil dihapus","success");
                setReloadData(!reloadData)
            }
        } catch (error) {
            showAlert("Error","Maaf ada kesalahan tak terduga","error");
            console.error(error.response)
        }
    }

    return (
        <>
        <div className="row mb-2">
            <div className="col-8">
                <h4 className='mb-2'>{title}</h4>
            </div>
        </div>
        <table className="table table-bordered table-hover">
            <thead className="thead-light">
                <tr className='text-center'>
                    <th>No.</th>
                    <th>Description</th>
                    <th>Investment</th>
                    {tipe !== "plan" && tipe !== "actual" && <th>Shop</th>}
                    <th>Month</th>
                    <th>Budget</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    dataDetail.length > 0
                    ? dataDetail.map((value,index) => (
                        <tr className='text-center' key={index}>
                            <td className='p-2 align-middle'>{index+1}</td>
                            <td className='text-start p-2 align-middle'>
                                <div style={{minWidth:"50rem"}}>
                                    {
                                        input === value.Id
                                        ? 
                                        <input type="text" className="form-control" 
                                            value={Category} 
                                            onChange={(e) => setCategory(e.target.value)} />
                                        : value.Category
                                    }
                                </div>
                            </td>
                            <td className='p-2 align-middle'>
                                {
                                    input === value.Id
                                    ? 
                                    <select className="form-control text-center" 
                                        defaultValue={Invest}
                                        onChange={(e) => setInvest(e.target.value)}>
                                        <option value="Improvement">Improvement</option>
                                        <option value="Replacement">Replacement</option>
                                    </select>
                                    : value.Invest
                                }
                            </td>
                            { 
                                tipe !== "plan" && tipe !== "actual" && <td className='p-2 align-middle'>
                                    {
                                        input === value.Id
                                        ? 
                                        <select className="form-control text-center" 
                                            defaultValue={OtherShop}
                                            onChange={(e) => setOtherShop(e.target.value)}>
                                            {
                                                arrayDept.map((value,index) => (
                                                    <option key={index} value={value}>{value}</option>
                                                ))
                                            }
                                        </select>
                                        : value.OtherShop
                                    }
                                </td> 
                            }
                            <td className='p-2 align-middle'>
                                {
                                    input === value.Id
                                    ? 
                                    <select className="form-control text-center" 
                                        defaultValue={Month}
                                        onChange={(e) => setMonth(e.target.value)}>
                                        {
                                            arrayMonth.map((value,index) => (
                                                <option value={index+1}>{value}</option>
                                            ))
                                        }
                                    </select>
                                    : arrayMonth[(value.Month-1)]
                                }
                            </td>
                            <td className='p-2 align-middle'>
                                {
                                    input === value.Id
                                    ? 
                                    <input type="text" className="form-control text-center" 
                                        value={Budget} 
                                        onChange={(e) => setBudget(e.target.value)} />
                                    : formatNumber(value.Budget)
                                }
                            </td>
                            <td className='p-2 align-middle'>
                                <Button variant='primary' className='btn btn-sm' onClick={() => (input !== value.Id ? revisiClick(value.Id,value.Category,value.Invest,value.Month,value.OtherShop,value.Budget) : saveInput(value.Id,"update"))}>
                                    {
                                        input !== value.Id
                                        ? <><i className="fas fa-pencil-alt me-1"></i>Revisi</>
                                        : <><i className="fas fa-save me-1"></i>Simpan</>
                                    }
                                </Button>
                                <Button variant='danger' className='btn btn-sm ms-1' onClick={() => confirmDelete(value.Id)}><i className="fas fa-trash-alt me-1"></i>Delete</Button>
                            </td>
                        </tr>
                    ))
                    : 
                    <tr className='text-center'>
                        <td className='p-2 align-middle' colSpan={5}>Tidak ada data</td>
                    </tr>
                }
                {
                    AddData &&
                    <FormAddData
                        setCategory={setCategory}
                        setInvest={setInvest}
                        setOtherShop={setOtherShop}
                        setMonth={setMonth}
                        setBudget={setBudget}
                        saveInput={saveInput}
                        setAddData={setAddData}
                        tipe={tipe} />
                }
                {
                    tipe === "plan" && AddData === false &&
                    <tr className="text-end" style={{fontSize:"14pt"}}>
                        <td colSpan={6} className='p-2 align-middle'>
                            <Button variant='primary' onClick={() => setAddData(true)}><i className="fas fa-plus me-1"></i>Tambah Plan</Button>
                        </td>
                    </tr>
                }
                <tr className="text-center bg-secondary text-light fw-bold" style={{fontSize:"14pt"}}>
                    <td colSpan={4}>TOTAL</td>
                    <td colSpan={2}>{formatNumber(totalBudget())}</td>
                </tr>
            </tbody>
        </table>
        </>
    )
}

const FormAddData = ({setCategory,setInvest,setOtherShop,setMonth,setBudget,saveInput,setAddData,tipe}) => {
    return(
        <tr className='text-center'>
            <td className='p-2 align-middle'></td>
            <td className='text-start p-2 align-middle'>
                <div style={{minWidth:"50rem"}}>
                    <input type="text" className="form-control" onChange={(e) => setCategory(e.target.value)} />
                </div>
            </td>
            <td className='p-2 align-middle'>
                <select className="form-control text-center" onChange={(e) => setInvest(e.target.value)}>
                    <option value="Improvement">Improvement</option>
                    <option value="Replacement">Replacement</option>
                </select>
            </td>
            { 
                tipe !== "plan" && tipe !== "actual" && 
                <td className='p-2 align-middle'>
                    <select className="form-control text-center" onChange={(e) => setOtherShop(e.target.value)}>
                        {
                            arrayDept.map((value,index) => (
                                <option key={index} value={value}>{value}</option>
                            ))
                        }
                    </select>
                </td> 
            }
            <td className='p-2 align-middle'>
                <select className="form-control text-center" onChange={(e) => setMonth(e.target.value)}>
                    {
                        arrayMonth.map((value,index) => (
                            <option value={index+1}>{value}</option>
                        ))
                    }
                </select>
            </td>
            <td className='p-2 align-middle'>
                <input type="text" className="form-control text-center" onChange={(e) => setBudget(e.target.value)} />
            </td>
            <td className='p-2 align-middle'>
                <Button variant='primary' className='btn btn-sm' onClick={() => saveInput(0,"add")}><i className="fas fa-save me-1"></i>Simpan</Button>
                <Button variant='danger' className='btn-sm ms-1' onClick={() => setAddData(false)}><i className="fas fa-times-circle me-1"></i>Close</Button>
            </td>
        </tr>
    )
}

const ModalAdd = ({children,handleCloseAdd,show}) => {
    return(
        <>
        <Modal show={show} onHide={() => handleCloseAdd()} dialogClassName="modal-80w" aria-labelledby="example-custom-modal-styling-title">
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Add Data
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
        </>
    )
}

const FormAdd = ({API_URL,shop,showAlert,handleCloseAdd,reloadData,setReloadData}) => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1)
    const Month = `${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getFullYear()}`
    const [IA,setIA] = useState("")
    const [Investment,setInvestment] = useState("")
    const [Description,setDescription] = useState("")
    const [ShowDescription,setShowDescription] = useState(false)
    const [otherShop1,setotherShop1] = useState("")
    const [otherShop2,setotherShop2] = useState("")
    const [dataCapexImprove, setdataCapexImprove] = useState([])
    const [dataCapexReplace, setdataCapexReplace] = useState([])
    const [dataCapexImproveOS1, setdataCapexImproveOS1] = useState([])
    const [dataCapexReplaceOS1, setdataCapexReplaceOS1] = useState([])
    const [dataCapexImproveOS2, setdataCapexImproveOS2] = useState([])
    const [dataCapexReplaceOS2, setdataCapexReplaceOS2] = useState([])
    const [activityPick,setactivityPick] = useState("")
    const [useBudget,setuseBudget] = useState({})
    const [useBudgetOther,setuseBudgetOther] = useState({})
    const Invest = ["Improvement","Replacement"]

    const setupActivity = (value) => {
        if(value === activityPick){
            setactivityPick("")
            setDescription("")
        }else{
            setactivityPick(value)
            setDescription(value)
        }
    }

    const getDataCapexAdd = async (shop,tipe) => {
        try {
            const month = tipe === "self" ? 12 : currentDate.getMonth()
            const formData = new FormData()
            formData.append("shop",shop)
            formData.append("month_3",month)

            const result = await axios.post(`${API_URL}/getDataCapexAdd`,formData)
            if(result.status === 200){
                const data = result.data.res;
                if(tipe === "self"){
                    data.Improvement && setdataCapexImprove(data.Improvement)
                    data.Replacement && setdataCapexReplace(data.Replacement)
                }else if(tipe === "OS1"){
                    data.Improvement && setdataCapexImproveOS1(data.Improvement)
                    data.Replacement && setdataCapexReplaceOS1(data.Replacement)
                }else if(tipe === "OS2"){
                    data.Improvement && setdataCapexImproveOS2(data.Improvement)
                    data.Replacement && setdataCapexReplaceOS2(data.Replacement)
                }
            }
        } catch (error) {
            showAlert("Error","Mohon maaf ada kesalahan tak terduga","error");
            console.error(error.response)
        }
    }

    const updateUseBudget = (idActivity,nominal,remainBudget,activity,self = false) => {
        if(nominal > remainBudget){
            showAlert("Error","Maaf budget yang anda masukkan melebihi sisa budget","error")
        }else{
            if(self){
                setuseBudget(prevBudget => ({
                    ...prevBudget,
                    [idActivity]:nominal
                }))
            }else{
                setuseBudgetOther(prevBudgetOther => ({
                    ...prevBudgetOther,
                    [idActivity]:nominal
                }))
            }
        }
    }

    const saveDataActivity = async () => {
        try {
            const formData = new FormData()
            formData.append("ia",IA)
            formData.append("investment",Investment)
            formData.append("shop",shop)
            formData.append("description",Description)
            formData.append("useBudget",JSON.stringify(useBudget))
            formData.append("useBudgetOther",JSON.stringify(useBudgetOther))

            const action = await axios.post(`${API_URL}/saveDataActivity`,formData,
                {
                    headers: {"Content-Type": "application/json"}
                }
            )
            console.log(action)
            if(action.status === 200){
                handleCloseAdd()
                setReloadData(!reloadData)
                showAlert("Sukses","Data berhasil disimpan","success")
            }
        } catch (error) {
            showAlert("Error","Maaf ada kesalahan tak terduga","error")
            console.error(error.response)
        }
    } 

    useEffect(() => {
        Investment !== "" && getDataCapexAdd(shop,"self")
        otherShop1 !== "" && getDataCapexAdd(otherShop1,"OS1")
        otherShop2 !== "" && getDataCapexAdd(otherShop2,"OS2")
    },[Investment,otherShop1,otherShop2])

    return(
        <>
        <div className="row">
            <div className="col-lg-6">
                <div className="row">
                    <div className="col-lg-12">
                        <h5>Month : {Month}</h5>
                    </div>
                    <div className="col-lg-12 mb-2">
                        <p className='mb-1'>No. IA</p>
                        <input type="text" className="form-control" value={IA} onChange={(e) => setIA(e.target.value)} placeholder='Masukkan Nomor IA' />
                    </div>
                    <div className="col-lg-12 mb-2">
                        <p className='mb-1'>Investment</p>
                        <select className="form-control" defaultValue={Investment} onChange={(e) => setInvestment(e.target.value)}>
                            <option value="">Pilih Investment</option>
                            <option>Improvement</option>
                            <option>Replacement</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                {
                    Investment && 
                    <div className="col-lg-12 mb-2">
                        <p className='mb-1'>Description</p>
                        <select className="form-control" onChange={(e) => setShowDescription(e.target.value === "Other" ? true : false)}>
                            <option value="" { ...Description === "" && "selected" }>Pilih Description</option>
                            <option value="Other" { ...Description !== "" && "selected" }>Other</option>
                        </select>
                        {
                            ShowDescription &&
                            <textarea className="form-control mt-2" placeholder='Masukkan Activity' rows={4} onChange={(e) => setDescription(e.target.value)} value={Description === "Other" ? "" : Description}></textarea>
                        }
                    </div>
                }
            </div>
            <div className="col-12 text-center mt-3"><h4>USE BUDGET FROM</h4></div>
            <div className="col-12">
                {
                    Invest.map((value,_) => {
                        const data = value === "Improvement" ? dataCapexImprove : dataCapexReplace
                        return(
                            <TableActivity title={value} data={data} updateUseBudget={updateUseBudget} self={true} setupActivity={setupActivity} activityPick={activityPick} />
                        )
                    })
                }
            </div>
            <div className="col-lg-12">
                <h4 className='mb-1'>Other Shop :</h4>
            </div>
            <div className="col-lg-6 mb-2">
                <p className='mb-1'>Other Shop 1</p>
                <select className="form-control" onChange={(e) => setotherShop1(e.target.value)}>
                    <option value="">Pilih Shop</option>
                    {
                        arrayDept.map((value,index) => (
                            <option key={index} value={value}>{value}</option>
                        ))
                    }
                </select>
                {
                    otherShop1 && Invest.map((value,_) => {
                        const data = value === "Improvement" ? dataCapexImproveOS1 : dataCapexReplaceOS1
                        return(
                            <TableActivity title={value} data={data} updateUseBudget={updateUseBudget} self={false} />
                        )
                    })
                }
            </div>
            <div className="col-lg-6 mb-2">
                <p className='mb-1'>Other Shop 2</p>
                <select className="form-control" onChange={(e) => setotherShop2(e.target.value)}>
                    <option value="">Pilih Shop</option>
                    {
                        arrayDept.map((value,index) => (
                            <option key={index} value={value}>{value}</option>
                        ))
                    }
                </select>
                {
                    otherShop2 && Invest.map((value,_) => {
                        const data = value === "Improvement" ? dataCapexImproveOS2 : dataCapexReplaceOS2
                        return(
                            <TableActivity title={value} data={data} updateUseBudget={updateUseBudget} self={false} />
                        )
                    })
                }
            </div>
            <div className="col-12 mt-3 text-end">
                <Button variant='primary' onClick={() => saveDataActivity()}><i className="fas fa-save me-1"></i>Simpan</Button>
            </div>
        </div>
        </>
    )
}

const TableActivity = ({title,data,updateUseBudget,self,setupActivity,activityPick}) => {
    return(
        <>
            <center><h5 className='mt-3 mb-2'>{title}</h5></center>
            <table className="table table-sm table-bordered table-hover" style={{fontSize:"10pt"}}>
                <thead className="thead-light">
                    <tr className='text-center align-middle'>
                        {
                            self && <th>Pick</th>
                        }
                        <th>Activity</th>
                        <th>Plan</th>
                        <th>Total Usage</th>
                        <th>Remain Budget</th>
                        <th>Month Plan</th>
                        <th>Use Budget</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0 
                        ? Array.isArray(data) && data.map((value,index) => (
                            <tr key={index} className={`${value.class} text-center`}>
                                {
                                    self && 
                                    <td className='ps-2 align-middle'>
                                        <Button variant={activityPick === value.category ? "success" : "warning"} className='btn-sm' onClick={() => setupActivity(value.category)}>
                                            {
                                                activityPick === value.category ? "Picked" : "Pick"
                                            }
                                        </Button>
                                    </td>
                                }
                                <td className='ps-2 align-middle text-start'>{value.category}</td>
                                <td className='ps-2 align-middle'>{value.planBudget}</td>
                                <td className='ps-2 align-middle'>{value.prevUsage}</td>
                                <td className='ps-2 align-middle'>{value.budget}</td>
                                <td className='ps-2 align-middle'>{value.monthPlan}</td>
                                <td className='ps-2 align-middle d-flex justify-content-center'>
                                    {
                                        value.full === "" ? <input type="text" className={`${value.class} form-control text-center`} defaultValue={0} style={{maxWidth:"100px"}} onChange={(e) => updateUseBudget(value.id,e.target.value,value.budget,value.category,self)} /> : "0"
                                    }
                                </td>
                            </tr>
                        ))
                        : 
                        <tr>
                            <td colSpan={6} className='text-center'>Tidak ada data</td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    )
}

export default Home;