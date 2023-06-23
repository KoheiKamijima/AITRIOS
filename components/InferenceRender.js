import React from "react";

const InferenceRender = ({ data }) => {
  const formatDate = (dateString) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    const hour = dateString.substring(8, 10);
    const minute = dateString.substring(10, 12);
    const second = dateString.substring(12, 14);
    const millisecond = dateString.substring(14, 17);

    return `${year}/${month}/${day} ${hour}:${minute}:${second}.${millisecond}`;
  };

  if (!data) {
    return null; // dataがない場合は何もレンダリングしない
  }

  return (
    <div style={{ color: "black" }}>
      {formatDate(data.Date_time)} Class: {data.Class} Probability: {data.P}
    </div>
  );
};

export default InferenceRender;
