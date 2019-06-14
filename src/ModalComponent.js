import React from 'react'
import './App.css'
import close from './images/remove-button.svg'
import ReactTable from 'react-table';

export const Modal = (props) => (
    props.showModal && props.currentArticle?
        <div className='modal-wrap'>
            <div className='modal-header'>
                <div className='modal-title'>{props.currentArticle.name}</div>
                <img className='actions-button' src={close} onClick={() => props.toogleShowModal()} />
            </div>
            <div>
                <ReactTable
                    showPagination={false}
                    showPaginationBottom={false}
                    defaultPageSize={props.currentArticle.comments.length}
                    data={props.currentArticle.comments}
                    columns={props.columnsModal}
                />
            </div>
            <div>

            </div>
        </div>
        : null
);