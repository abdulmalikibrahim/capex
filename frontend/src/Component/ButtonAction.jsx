import React from 'react';
import { Button } from 'react-bootstrap'

const ButtonAction = ({handleShowDetail,handleShowAdd,generatePDF,loadingPrint}) => {
    return(
        <div className="row">
            <div className="col-12 text-end">
                <Button variant='primary' className='me-2' onClick={() => generatePDF()}>
                    {
                        loadingPrint ? <><i className="fas fa-spinner fa-spin"></i> DOWNLOADING...</> : <><i className="fas fa-download me-1"></i>DOWNLOAD</>
                    }
                </Button>
                <Button variant='primary' className='me-2' onClick={() => handleShowDetail()}><i className="fas fa-bars me-1"></i>DETAIL</Button>
                <Button variant='primary' className='me-2' onClick={() => handleShowAdd()}><i className="fas fa-plus me-1"></i>TAMBAH</Button>
            </div>
        </div>
    )
}

export default ButtonAction;