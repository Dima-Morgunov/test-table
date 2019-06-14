import React, {Component} from 'react';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import data from './tableData.json';
import {Modal} from './ModalComponent'

import comment from './images/comment-button.svg';
import remove from './images/remove-button.svg';
import commentFooter from './images/comment.svg';
import article from './images/writing.svg';

export class App extends Component {
    state = {
        tableData: [],
        showModal: false,
        currentArticle: null
    };

    componentDidMount() {
        if(data.hasOwnProperty('posts')) {
            if(data.posts.length > 0) {
                this.setState({tableData: data})
            } else {
                alert('Sorry')
            }
        } else {
            alert('Sorry')

        }
    }

    toogleModal = (article) => {
      this.setState({showModal: !this.state.showModal, currentArticle: article}, () => console.log(this.state))
    };

    removeArticle = (removeArticle) => {
        console.log(removeArticle)
        const newArray = this.state.tableData.posts.filter((item, index) => removeArticle.postId !== item.postId)
        this.setState({tableData: {posts: newArray}})

    };

    removeComment = (CurrentProps) => {
      console.log(CurrentProps, this.state)
        const {currentArticle, tableData} = this.state;
        currentArticle.comments = currentArticle.comments.filter((item, index) => index != CurrentProps.index);

        this.setState({currentArticle: currentArticle})
    };

    CommentsCount = () => {
      const {tableData} = this.state;
      if(tableData.hasOwnProperty('posts')) {
          let commentCount = 0;
          tableData.posts.forEach(item => {
              if (item.hasOwnProperty('comments')) {
                  commentCount = commentCount + item.comments.length
              }
          });
          console.log(commentCount)
          return <p className='footer-text'>{commentCount} Comments</p>
      }
    };

    render() {
        const {tableData, showModal, currentArticle} = this.state;
        const columns = [
            {
                Header: 'Article Title',
                accessor: 'name',
                sortable: true,
            },
            {
                Header: 'Content',
                accessor: 'about',
                sortable: false,

            },
            {
                Header: 'Comment',
                Cell: props => <span className='number'>{props.original.comments.length}</span>,
                sortable: false,
            },
            {
                Header: 'Actions',
                Cell: props =>
                    <div className='actions-button-wrap'>
                        <img className="actions-button" src={comment} onClick={() => this.toogleModal(props.original)}/>
                        <img className="actions-button" src={remove} onClick={() => this.removeArticle(props.original)}/>
                    </div>,
                sortable: false,
            }
        ];
        const columnsModal = [
            {
                Header: 'Comment',
                accessor: 'text',
                sortable: true,
            },
            {
                Header: 'Remove',
                Cell: props => <img className="actions-button" src={remove} onClick={() => this.removeComment(props)}/>,
                sortable: false,
            }
        ];
        return (
            <div className='wrap'>
                <p>Article</p>
                <Modal
                    currentArticle={currentArticle}
                    showModal={showModal}
                    toogleShowModal={() => this.toogleModal(null)}
                    removeComment={() => this.removeComment()}
                    columnsModal={columnsModal}
                />
                <ReactTable
                    data={tableData.posts}
                    columns={columns}
                    showPagination={false}
                    showPaginationBottom={false}
                    minRows={tableData.hasOwnProperty('posts') ? tableData.posts.length : 1}
                />
                <div className='footer'>
                    <div className='footer-item-wrap'>
                        <p className='footer-text'>
                            {tableData.hasOwnProperty('posts') ? tableData.posts.length : 0} Articles
                        </p>
                        <img className='footer-images' src={article} />
                    </div>
                    <div className='footer-item-wrap'>
                        {this.CommentsCount()}
                        <img className='footer-images' src={commentFooter} />
                    </div>
                </div>
            </div>
        )
    }

}

