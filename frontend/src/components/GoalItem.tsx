// @ts-nocheck
import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";
import { Link, useNavigate } from "react-router-dom";
import { setGoal } from "../features/singleGoal/singleGoalSlice";

function GoalItem({ goal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toUpdate = (goal) => {
    dispatch(setGoal(goal));

    navigate(`/goal/${goal._id}`);
  };

  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      <h2>{goal.text}</h2>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
        X
      </button>
      {/* <Link to={`/goal/${goal._id}`} state={{goal: goal}}>
                    <button>Edit</button>
            </Link> */}{" "}
      {/*This also works*/}
      <button onClick={() => toUpdate(goal)}>Edit</button>
    </div>
  );
}

export default GoalItem;
