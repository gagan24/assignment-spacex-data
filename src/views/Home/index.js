import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLaunches, launchesSelector } from "../../slices/launches";

const Home = () => {
  const dispatch = useDispatch();

  const { launches, loading, hasErrors } = useSelector(launchesSelector);

  useEffect(() => {
    dispatch(fetchLaunches());
  }, [dispatch]);

  console.log("launches: ", launches);

  return <div>index</div>;
};

export default Home;
