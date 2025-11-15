import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const ChartHolder = ({ heading, data }) => {
  return (
    <div className="card shadow-lg chart-card rounded-3 p-2 col">
        <h5 className="card-title me-auto">{heading}</h5>
      {Array.isArray(data) && data.length > 0 ? (
        <div >
          <AreaChart
            style={{
              width: "100%",
              maxWidth: "700px",
              height: "100%",
              maxHeight: "70vh",
              aspectRatio: 1.618,
            }}
            responsive
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Name" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Debt"
              stroke="#d5a7a7ff"
              fill="#f3e4e4ff"
              activeDot={{ r: 8 }}
            />
          </AreaChart>
        </div>
      ) : (
        <div className="card-body">No Debt Added</div>
      )}
    </div>
  );
};

export default ChartHolder;
