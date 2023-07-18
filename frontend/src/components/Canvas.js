function Canvas(props) {

    const data = props.data;

    return (
        <div id="canvas">
            {data ? (
                <canvas id="chart" width="600" height="400"></canvas>
            ) : (
                <p>The graph will appear here.</p>
            )}
        </div>
    )
};

export default Canvas;