import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = ({ setShop }) => {
    return(
        <div>
            <div className="row">
                <div className="col-12" style={{ background:"url(/Assets/Logo/logoDaihatsu.png)", height:"80px", backgroundSize:"110%", backgroundRepeat:"no-repeat", backgroundPosition:"center"}}>
                </div>
                <div className="mt-2 col-12">
                    <button onClick={() => {setShop("PRESS")}} className="btn btn-info border border-dark w-100 fw-bold fs-5">PRESS</button>
                </div>
                <div className="mt-2 col-6 pe-1">
                    <button onClick={() => {setShop("BODY1")}} className="btn btn-info border border-dark w-100 fw-bold fs-5">BODY1</button>
                </div>
                <div className="mt-2 col-6 ps-1">
                    <button onClick={() => {setShop("BODY2")}} className="btn btn-info border border-dark w-100 fw-bold fs-5">BODY2</button>
                </div>
                <div className="mt-2 col-6 pe-1">
                    <button onClick={() => {setShop("TOSO1")}} className="btn btn-info border border-dark w-100 fw-bold fs-5">TOSO1</button>
                </div>
                <div className="mt-2 col-6 ps-1">
                    <button onClick={() => {setShop("TOSO2")}} className="btn btn-info border border-dark w-100 fw-bold fs-5">TOSO2</button>
                </div>
                <div className="mt-2 col-6 pe-1">
                    <button onClick={() => {setShop("ASSY1")}} className="btn btn-info border border-dark w-100 fw-bold fs-5">ASSY1</button>
                </div>
                <div className="mt-2 col-6 ps-1">
                    <button onClick={() => {setShop("ASSY2")}} className="btn btn-info border border-dark w-100 fw-bold fs-5">ASSY2</button>
                </div>
                <div className="mt-2 col-6 pe-1">
                    <button onClick={() => {setShop("QUALITY1")}} className="btn btn-info border border-dark w-100 fw-bold fs-5">QUALITY1</button>
                </div>
                <div className="mt-2 col-6 ps-1">
                    <button onClick={() => {setShop("QUALITY2")}} className="btn btn-info border border-dark w-100 fw-bold fs-5">QUALITY2</button>
                </div>
                <div className="mt-2 col-6 pe-1">
                    <button onClick={() => {setShop("LID1")}} className="btn btn-info border border-dark w-100 fw-bold fs-5">LID1</button>
                </div>
                <div className="mt-2 col-6 ps-1">
                    <button onClick={() => {setShop("LID2")}} className="btn btn-info border border-dark w-100 fw-bold fs-5">LID2</button>
                </div>
                <div className="mt-2 col-6 pe-1">
                    <button onClick={() => {setShop("MTN1")}} className="btn btn-info border border-dark w-100 fw-bold fs-5">MTN1</button>
                </div>
                <div className="mt-2 col-6 ps-1">
                    <button onClick={() => {setShop("MTN2")}} className="btn btn-info border border-dark w-100 fw-bold fs-5">MTN2</button>
                </div>
                <div className="mt-2 col-12">
                    <button onClick={() => {setShop("GAOP3")}} className="btn btn-info border border-dark w-100 fw-bold fs-5">GAOP3</button>
                </div>
                <div className="mt-2 col-12">
                    <button onClick={() => {setShop("PCD")}} className="btn btn-info border border-dark w-100 fw-bold fs-5">PCD</button>
                </div>
                <div className="mt-2 col-12">
                    <button onClick={() => {setShop("QSS")}} className="btn btn-info border border-dark w-100 fw-bold fs-5">GAOP3</button>
                </div>
                <div className="mt-2 col-12">
                    <Link to={"/tablemonitoring"} className="btn btn-warning border border-dark w-100 fw-bold fs-5">Table Monitoring</Link>
                </div>
                <div className="mt-2 col-12">
                    <Link to={"/summaryreport"} className="btn btn-success border border-dark w-100 fw-bold fs-5">Summary Report</Link>
                </div>
            </div>
        </div>
    )
}

export default SideBar;