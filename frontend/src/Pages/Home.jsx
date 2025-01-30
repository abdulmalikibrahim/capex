import React, { useEffect, useState } from 'react';
import Graph from '../Component/Graph';
import { Button, Modal } from 'react-bootstrap';
import ButtonAction from '../Component/ButtonAction';
import axios from 'axios';
import Swal from 'sweetalert2';

const Home = ({shop,API_URL,showAlert}) => {
    // Custom plugin untuk menampilkan label di atas batang
    const formatNumber = (value) => {
        return new Intl.NumberFormat('id-ID', {
          style: 'decimal',
          maximumFractionDigits: 2, // Menentukan jumlah desimal
        }).format(value);
    };

    const [reloadData,setReloadData] = useState(false)
    const [show, setShow] = useState(false);
    const handleCloseDetail = () => setShow(false);
    const handleShowDetail = () => setShow(true);
    const handleCloseAdd = () => setShow(false);
    const handleShowAdd = () => setShow(true);

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
            showAlert('Error',(error.response.data ? error.response.data.res : "Mohon maaf ada kesalahan tak terduga"),"error")
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
    return (
        <div>
            <Graph formatNumber={formatNumber} dataPlan={dataPlan} dataActual={dataActual} dataBFOS={dataBFOS} dataBTOS={dataBTOS} />
            <ButtonAction handleShowDetail={handleShowDetail} handleShowAdd={handleShowAdd} />
            <ModalDetail handleCloseDetail={handleCloseDetail} show={show}>
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
        </div>
    )
}

const ModalDetail = ({children,handleCloseDetail,show}) => {
    return(
        <>
        <Modal show={show} onHide={() => handleCloseDetail()} dialogClassName="modal-80w" aria-labelledby="example-custom-modal-styling-title">
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Custom Modal Styling
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
            showAlert("Error",(error.response.data ? error.response.data.res : "Maaf ada kesalahan tak terduga"),"error");
            console.error(error)
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
            showAlert("Error",(error.response.data ? error.response.data.res : "Maaf ada kesalahan tak terduga"),"error");
            console.error(error)
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

const ModalAdd = ({children,handleCloseDetail,show}) => {
    return(
        <>
        <Modal show={show} onHide={() => handleCloseDetail()} dialogClassName="modal-80w" aria-labelledby="example-custom-modal-styling-title">
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Custom Modal Styling
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
        </>
    )
}

export default Home;