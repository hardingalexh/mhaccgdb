<template>
    <div>
        consistency
        {{getChartData(chart.key)}}
        <highcharts :options="gaugeOptions" />
    </div>
</template>
<script>
export default {
    name: "consistency",
    props: ['chart'],
    computed: {
        gaugeOptions() {
            return {
                chart: {
                    type: 'solidgauge'
                },
                title: "Consistency",
                // pane: {
                //     center: ['50%', '85%'],
                //     size: '140%',
                //     startAngle: -90,
                //     endAngle: 90,
                //     background: {
                //         backgroundColor:
                //             Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
                //         innerRadius: '60%',
                //         outerRadius: '100%',
                //         shape: 'arc'
                //     }
                // },
                // the value axis
                yAxis: {
                    stops: [
                        [0.3333, '#55BF3B'], // green
                        [0.5, '#DDDF0D'], // yellow
                        [0.9, '#DF5353'] // red
                    ],
                    lineWidth: 0,
                    tickWidth: 0,
                    minorTickInterval: null,
                    tickAmount: 2,
                    title: {
                        y: -70
                    },
                    labels: {
                        y: 16
                    }
                },
                plotOptions: {
                    solidgauge: {
                        dataLabels: {
                            y: 5,
                            borderWidth: 0,
                            useHTML: true
                        }
                    }
                },
                series: [
                    {
                        name: 'Consistency',
                        data: [1.56]
                    }
                ]
            }
        }
    }
}
</script>