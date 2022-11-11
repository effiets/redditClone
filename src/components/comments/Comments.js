import moment from 'moment'
import './Comments.css'


const Comments = (props) => {
    return <div className='comment-container'>
        <div className='comment-info'>
            <p className='comment-author'>{props.author}</p>
            <p className='comment-date'>{moment.unix(props.date).fromNow()}</p>
        </div>
        <div className='comment-body'>{props.comment}</div>
    </div>

}

export default Comments