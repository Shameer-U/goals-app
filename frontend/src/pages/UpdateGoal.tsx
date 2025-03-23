// @ts-nocheck
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateGoal, reset } from "../features/singleGoal/singleGoalSlice";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function UpdateGoal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { goal, isLoading } = useSelector((state) => state.singleGoal);

  const [text, setText] = useState(goal.text);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(updateGoal({ id: goal._id, text }));
  };

  useEffect(() => {
    // return () => {
    //     dispatch(reset())
    // }
    //navigate('/',alert('hi'))
  }, [navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Update</h1>
        <p>Update goal</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="text">Goal</label>
            <input
              type="text"
              name="text"
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Update
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default UpdateGoal;
