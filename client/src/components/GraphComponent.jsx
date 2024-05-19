// src/Graph.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const GraphComponent = ({ graphData, type, options }) => {
  const graphRef = useRef(null);

  useEffect(() => {
    if (!graphData) return;

    // Creating graph
    const graphCtx = graphRef.current.getContext('2d');
    new Chart(graphCtx, {
      type: type,
      data: graphData,
      options: options,
    });

  }, [graphData, type, options]);

  return (
    <canvas ref={graphRef} width="400" height="250"></canvas>
  );
};

export default GraphComponent;
