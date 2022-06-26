import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {updateGoal, reset} from '../features/singleGoal/singleGoalSlice'
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Spinner from '../components/Spinner'

function UpdateGoal1() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { state } = useLocation();
    console.log(state.goal);

    const goal = state.goal
    const [text, setText] = useState(goal.text)

    const onSubmit = e => {
        e.preventDefault()

        dispatch(updateGoal({id:goal._id, text}))
    }

    useEffect(() => {
        // return () => {
        //     dispatch(reset())
        // }

        //navigate('/',alert('hi'))

     }, [navigate])


    return <>
        <section className="heading">
            <h1>
                Update 1
            </h1>
            <p>Update goal 1</p>
        </section>

        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Goal</label>
                    <input type="text" name='text' id='text' value={text} 
                    onChange={(e) => setText(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <button className='btn btn-block' type='submit'>
                         Update
                    </button>
                </div>
            </form>
        </section>
    </>
}

export default UpdateGoal1