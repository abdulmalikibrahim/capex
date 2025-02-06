import React from 'react';
import { Link } from 'react-router-dom';

const buttonData = [
    { label: 'PRESS', value: 'PRESS', col: 'col-12' },
    { label: 'BODY1', value: 'BODY1', col: 'col-6 pe-1' },
    { label: 'BODY2', value: 'BODY2', col: 'col-6 ps-1' },
    { label: 'TOSO1', value: 'TOSO1', col: 'col-6 pe-1' },
    { label: 'TOSO2', value: 'TOSO2', col: 'col-6 ps-1' },
    { label: 'ASSY1', value: 'ASSY1', col: 'col-6 pe-1' },
    { label: 'ASSY2', value: 'ASSY2', col: 'col-6 ps-1' },
    { label: 'QUALITY1', value: 'QUALITY1', col: 'col-6 pe-1' },
    { label: 'QUALITY2', value: 'QUALITY2', col: 'col-6 ps-1' },
    { label: 'LID1', value: 'LID1', col: 'col-6 pe-1' },
    { label: 'LID2', value: 'LID2', col: 'col-6 ps-1' },
    { label: 'MTN1', value: 'MTN1', col: 'col-6 pe-1' },
    { label: 'MTN2', value: 'MTN2', col: 'col-6 ps-1' },
    { label: 'GAOP3', value: 'GAOP3', col: 'col-12' },
    { label: 'PCD', value: 'PCD', col: 'col-12' },
    { label: 'QSS', value: 'QSS', col: 'col-12' },
];

const SideBar = ({ shop, setShop }) => {
    return(
        <div>
            <div className="row">
                <div className="col-12" style={{ background:"url(/Assets/Logo/logoDaihatsu.png)", height:"80px", backgroundSize:"110%", backgroundRepeat:"no-repeat", backgroundPosition:"center"}}>
                </div>
                {buttonData.map(({ label, value, col }) => (
                    <div className={`mt-2 ${col}`} key={value}>
                        <Link to={"/home"} onClick={() => setShop(value)} className={`btn ${shop === value ? 'btn-primary' : 'btn-info'} border border-dark w-100 fw-bold fs-5`}>
                            {label}
                        </Link>
                    </div>
                ))}
                <div className="mt-2 col-12">
                    <Link to={"/tablemonitoring"} onClick={() => setShop("tablemonitoring")} className={`btn ${shop === "tablemonitoring" ? 'btn-primary' : 'btn-info'} border border-dark w-100 fw-bold fs-5`}>Table Monitoring</Link>
                </div>
                <div className="mt-2 col-12">
                    <Link to={"/summaryreport"} className="btn btn-success border border-dark w-100 fw-bold fs-5">Summary Report</Link>
                </div>
            </div>
        </div>
    )
}

export default SideBar;