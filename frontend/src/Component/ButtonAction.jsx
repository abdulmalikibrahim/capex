import React from 'react';
import { Button } from 'react-bootstrap'

const ButtonAction = ({handleShowDetail,handleShowAdd}) => {
    return(
        <div className="row">
            <div className="col-12 text-end">
                <Button variant='primary' className='me-2'><i className="fas fa-print me-1"></i>PRINT</Button>
                <Button variant='primary' className='me-2' onClick={() => handleShowDetail()}><i className="fas fa-bars me-1"></i>DETAIL</Button>
                <Button variant='primary' className='me-2' onClick={() => handleShowAdd()}><i className="fas fa-plus me-1"></i>TAMBAH</Button>
            </div>
        </div>
    )
}

export default ButtonAction;