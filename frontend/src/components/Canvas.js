function Canvas(props) {

    const data = props.data;

    return (
        <div id="canvas">
            <canvas id="chart" width="400" height="300"></canvas>
        </div>
    )
};

export default Canvas;