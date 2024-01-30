import axios from "axios";
import React, { useEffect, useState } from "react";

function hoc(Wrappedcomponent, url) {
  return (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(true);
      const fetchData = async () => {
        console.log("fetching..");
        const res = await axios.get(url);
        setData(res.data);

        if (res.status === 200) {
          console.log("fetch done!");
          setLoading(false);
        }
      };

      fetchData();
    }, []);

    return (
      <>
        <Wrappedcomponent data={data} loading={loading} {...props} />
      </>
    );
  };
}

export default hoc;
